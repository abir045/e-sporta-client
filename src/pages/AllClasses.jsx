import React from "react";
import useClasses from "../hooks/useClasses";
import ClassCard from "../components/ClassCard";

const AllClasses = () => {
  const [classesData] = useClasses();
  console.log(classesData);

  return (
    <div>
      <h2 className="text-3xl mt-10 mb-10 text-center font-bold">
        ALL CLASSES
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto gap-6">
        {classesData.map((item) => (
          <ClassCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
