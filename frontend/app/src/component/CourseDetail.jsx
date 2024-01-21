import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './style.css'

const CourseDetail = () => {
    const [courseDetails, setCourseDetails] = useState();
    const { id } = useParams();
  
    useEffect(() => {
        
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/v1/course/${id}`);
          
          setCourseDetails(response.data.course);
        } catch (error) {
          console.error('Error fetching course details:', error.message);
        }
      };
  
      fetchData();
    }, [id]);
  

    const buttonStyle = {
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px',
      cursor: 'pointer',
      borderRadius: '5px',
      marginRight: '10px', // Add margin between buttons if needed
    };


    return (
      <div className='courseDetailbody'>
        {courseDetails ? (
           <div className="course-container">
           <header>
             <h1>{courseDetails.name}</h1>
           </header>
     
           <section className="course-section">
             
     
             <div className="course-info">
               <h2>Course Information</h2>
               <img src={courseDetails.thumbnail} alt="Course Thumbnail" className="course-thumbnail" />
               <p><strong>Instructor:</strong>{courseDetails.instructor}</p>
               <p><strong>Enrollment Status:</strong>{courseDetails.enrollmentStatus}</p>
               <p><strong>Duration:</strong>{ courseDetails.duration}</p>
               <p><strong>Schedule:</strong>{courseDetails.schedule}</p>
               <p><strong>Location:</strong> {courseDetails.location}</p>
               <p><strong>Description:</strong> {courseDetails.description}</p>
             </div>
     
             <div className="course-prerequisites">
               <h2>Prerequisites</h2>
               <ul>
                {courseDetails.prerequisites.map(i=>(
                  <li key={i}>
                    <button style={buttonStyle}>{i}</button></li>
                ))}
                 
               </ul>
             </div>
     
             <div className="course-syllabus">
               <h2>Course Syllabus</h2>
               <ul>
                {courseDetails.syllabus.map(i=>(
                   <li>
                   <strong>Week {i.week}:</strong> {i.topic}
                   <p>{i.content}</p>
                 </li>
                ))}
                
                 
               </ul>
             </div>
     
             <div className="students-enrolled">
               <h2>Students Enrolled : {courseDetails.students.length}</h2>
              
             <div className="likes-section">
    <span className="likes-icon">❤️</span>
    <span className="likes-count">{courseDetails.likes}</span>
  </div>
             </div>
     
           </section>
         </div>




        ) : (
          <p>Loading course details...</p>
        )}
      </div>
    );
}

export default CourseDetail