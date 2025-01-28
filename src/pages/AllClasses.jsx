import React, { useState } from "react";
import useClasses from "../hooks/useClasses";
import ClassCard from "../components/ClassCard";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const AllClasses = () => {
  // const [classesData] = useClasses();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const axiosPublic = useAxiosPublic();

  const classesPerPage = 6;
  // console.log(classesData);

  const { data: classesData = [], isLoading } = useQuery({
    queryKey: ["classes", searchTerm],
    queryFn: async () => {
      const response = await axiosPublic.get(`/classes?search=${searchTerm}`);
      return response.data;
    },
    //staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });

  // Calculate pagination values
  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = classesData.slice(indexOfFirstClass, indexOfLastClass);
  const totalPages = Math.ceil(classesData.length / classesPerPage);

  // Generate page numbers array
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  return (
    <div>
      <Helmet>
        <title>E-Sporta | All Classes</title>
      </Helmet>
      <h2 className="text-3xl mt-10 mb-10 text-center font-bold">
        ALL CLASSES
      </h2>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8 px-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search classes by name..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isLoading ? (
              <div className="w-5 h-5 border-t-2 border-green-500 border-solid rounded-full animate-spin"></div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto gap-6">
        {currentClasses.map((item) => (
          <ClassCard key={item._id} item={item} />
        ))}
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto gap-6">
        {classesData.map((item) => (
          <ClassCard key={item._id} item={item} />
        ))}
      </div> */}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            Previous
          </button>

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`w-10 h-10 rounded-lg ${
                currentPage === number
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            Next
          </button>
        </div>
      )}

      <div className="text-center mt-4 text-gray-600">
        Showing {indexOfFirstClass + 1}-
        {Math.min(indexOfLastClass, classesData.length)} of {classesData.length}{" "}
        classes
      </div>
    </div>
  );
};

export default AllClasses;
