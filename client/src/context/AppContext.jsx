import { createContext, useState,useEffect } from "react";
import { dummyCourses } from "../assets/assets";
import humanizeDuration from "humanize-duration";
import {useAuth , useUser} from "@clerk/clerk-react"
import axios from "axios";
import {toast} from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props)=>{
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const currency = import.meta.env.VITE_CURRENCY

    const {getToken} = useAuth()
    const {user} = useUser()


    const [allCourses , setAllCourses] = useState([])
    const [isEducator , setIsEducator] = useState(true)
    const [enrolledCourses , setEnrolledCourses] = useState([])
    //fetch all courses
    const fetchAllCourses = async ()=>{
        try {
          const {data} =  await axios.get(backendUrl + '/api/course/all')

          if(data.success){
            setAllCourses(data.courses)
          }else{
            toast.error(data.message)
          }
        } catch (error) {
          toast.error(error.message);
        }
    }
    const fetchUserEnrolledCourses = async ()=>{
        setEnrolledCourses(dummyCourses)
    }
    useEffect(()=>{
        fetchAllCourses(),
        fetchUserEnrolledCourses()
    },[])

    const logToken = async () =>{
        console.log(await getToken())
    }

    useEffect(()=>{
        if(user){
            logToken()
        }
    },[user])

    // function to calculate averafge rating of course

    const calculateRating = (course) => {
      if (course.courseRatings.length === 0) {
        return 0;
      }

      let totalRating = 0;

      course.courseRatings.forEach((rating) => {
        totalRating += rating.rating;
      });

      return totalRating / course.courseRatings.length;
    };
    const calculateChapterTime = (chapter) =>{
      let time = 0;
      chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
      return humanizeDuration(time *60*1000,{units:['h','m']})
       
    };
    //function to calculate course duration

    const calculateCourseDuration = (course) => {
      let time = 0;

      course.courseContent.map((chapter) =>
        chapter.chapterContent.map(
          (lecture) => (time += lecture.lectureDuration)
        )
      );

      return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
    };

    const calculateNoOfLectures = (course) => {
      let totalLectures = 0;
      course.courseContent.forEach((chapter) => {
        if (Array.isArray(chapter.chapterContent)) {
          totalLectures += chapter.chapterContent.length;
        }
      });
      return totalLectures;
    };
    
    


    const value = {
      currency,
      allCourses,
      calculateRating,
      isEducator,
      setIsEducator,
      calculateChapterTime,
      calculateCourseDuration,
      calculateNoOfLectures,
      enrolledCourses,
      fetchUserEnrolledCourses,
    };
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}