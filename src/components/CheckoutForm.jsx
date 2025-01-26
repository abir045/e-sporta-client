import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import moment from "moment";
import Swal from "sweetalert2";
import { Button } from "flowbite-react";

const CheckoutForm = ({
  price,
  ChosenPackage,
  selectedClass,
  trainerClass,
  selectedSlot,
  trainer,
}) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const totalPrice = price;
  const SelectedPackage = ChosenPackage;
  const ClassName = selectedClass;
  const ClassOfTrainer = trainerClass;
  const slotSelected = selectedSlot;

  console.log(price);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    //confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        //now save the payment in the database
        // const date = new Date();

        const payment = {
          trainerName: trainer.trainerName,
          trainerEmail: trainer.email,
          email: user.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: moment().format("DD/MM/YYYY"),
          packageId: SelectedPackage.id,
          packageName: SelectedPackage.name,
          className: ClassName || ClassOfTrainer,
          selectedSlot: slotSelected,
        };

        const res = await axiosSecure.post("/payments", payment);
        console.log("payment saved", res.data);

        if (res.data.paymentResult?.insertedId) {
          const classUpdateRes = await axiosSecure.patch(
            `/classes/${payment.className}`,
            { $inc: { bookingCount: 1 } }
          );

          if (classUpdateRes.data.modifiedCount) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your payment has been successful",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          }
        }
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mt-10 max-w-4xl mx-auto">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <Button
            className="mt-10"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </Button>
          <p className="text-red-600">{error}</p>
          {transactionId && (
            <p className="text-green-500">
              Your transaction id: {transactionId}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
