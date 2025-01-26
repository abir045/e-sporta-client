import React from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
// import Swiper from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import ReactStars from "react-rating-stars-component";

const Testimonials = () => {
  const axiosPublic = useAxiosPublic();

  const { data: testimonials = [], refetch } = useQuery({
    queryKey: ["testimonials-data"],
    queryFn: async () => {
      const res = await axiosPublic.get("/testimonials");
      return res.data;
    },
  });

  console.log(testimonials);

  return (
    <div>
      <h2 className="text-center font-bold text-2xl mt-20 mb-10">
        Testimonials
      </h2>
      <div className="max-w-7xl mx-auto ">
        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper mb-24"
          //   onSlideChange={() => console.log("slide change")}
          //   onSwiper={(swiper) => console.log(swiper)}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="flex flex-col items-center gap-6">
                <p className="font-bold">{item.email}</p>
                <p className="text-center">{item.review}</p>
                {/* <p>{item.Rating}</p> */}
                <ReactStars
                  count={item.Rating}
                  size={24}
                  value={item.Rating}
                  activeColor="#ffd700"
                  edit={false}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
