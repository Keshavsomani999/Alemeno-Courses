import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Card = () => {
  const [courseData, setCourseData] = useState();

  const { keyword } = useParams();

  const getData = async () => {
    try {
      let response;
      if (keyword) {
        console.log("fsadfsjhfn");
        response = await axios.get(
          `http://localhost:4000/api/v1/course?keyword=${keyword}`
        );
      } else {
        console.log(keyword);
        response = await axios.get("http://localhost:4000/api/v1/course");
      }

      // Log the entire response for better understanding
      // console.log(response.data);

      // Assuming the data is nested under a 'course' property
      setCourseData(response.data.course);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [keyword]);

  return (
    <div className="cardContainer">
    {
      courseData ? 
      (
        courseData.map((courseData) => (
          
          <div class="course-card">
            <img src={courseData.thumbnail} alt="Course Thumbnail" />
            <div class="card-content">
            <Link key={courseData._id} to={`/course/${courseData._id}`} className="course-card-link">
          
              <h4>{courseData.name}</h4></Link>
              <p>{courseData.instructor}</p>
              <ul>
                <li>Duration:{courseData.duration}</li>
                <li>Location: {courseData.location}</li>
              </ul>
              <div class="likes">
                <span class="icon">❤️</span>
                <span class="count">{courseData.likes}</span>
              </div>
            </div>
          </div>
        ))
      ):
      (
        <div>sda</div>
      )
    }
  
  </div>
  
  // <div className='course-list-container'>
  //   {courseData ? (
  //     courseData.map(courseData=>(
  //       <Link key={courseData._id} to={`/course/${courseData._id}`} className="course-card-link">
  //       <div className="course-card">
  //       <div className="course-details">
  //         <h2 className="course-title">{courseData.name}</h2>
  //         <p className="instructor">Instructor: {courseData.instructor}</p>
  //         <p className="duration">Duration: {courseData.duration}</p>
  //         <p className="location">Location: {courseData.location}</p>
  //       </div>
  //       <div className="likes">
  //         <span className="likes-icon">👍</span>
  //         <span className="likes-count">{courseData.likes}</span>
  //       </div>
  //       </div>
  //     </Link>
  //     ))
  //   ) : (
  //     <p>Loading course data...</p>
  //   )}
  // </div>
)};

export default Card;
