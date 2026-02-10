import React, { useContext, useEffect, useState } from "react";
import Footer from "../../components/student/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Searchbar from "../../components/student/Searchbar";
import { AppContext } from "../../context/AppContext";
import CourseCard from "../../components/student/CourseCard";
import { assets } from "../../assets/assets";

const CoursesList = () => {
  const navigate = useNavigate();
  const { allCourses } = useContext(AppContext);
  const { input } = useParams();
  const [filteredCourse , setFilteredCourse] = useState([])

  useEffect(() =>{
    const tempCourses = allCourses.slice()

    input ? 
      setFilteredCourse(
        tempCourses.filter(
          item => item.courseTitle.toLowerCase().includes(input.toLowerCase())
        )
      )
      : setFilteredCourse(tempCourses)
  },[allCourses,input])

  return (
    <>
      {/* Page container */}
      <div className="pt-20 px-6 md:px-0">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
            <div>
              <h1 className="text-4xl font-semibold text-gray-800">
                Course List
              </h1>
              <p className="text-gray-500">
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  Home
                </span>{" "}
                / <span>Course List</span>
              </p>
            </div>

            <Searchbar data={input} />
          </div>
          {input && (
            <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600">
              <p>{input}</p>
              <img
                onClick={() => navigate("/course-list")}
                src={assets.cross_icon}
                alt=""
                className="cursor-pointer"
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-16">
            {filteredCourse.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CoursesList;
