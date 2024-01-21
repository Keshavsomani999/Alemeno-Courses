
import Signup from "./component/Auth/Signup";
import Card from "./component/Card";
import CourseDetail from "./component/CourseDetail"
import Navbar from "./component/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div>
      
      <Router>
      <Navbar />
        <Routes>
        <Route exact path='/' element={<Card />}/>
        <Route exact path='/:keyword' element={<Card />}/>
        <Route exact path='/course/:id' element={<CourseDetail />}/>
        
        <Route exact path='/Signup' element={<Signup />}/>
       
        </Routes>
        
      </Router>
      
    </div>
  );
}

export default App;
