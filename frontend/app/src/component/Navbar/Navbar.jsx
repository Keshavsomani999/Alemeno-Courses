import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const { isAuth, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      console.log(keyword);
      navigate(`/${keyword}`);
    } else {
      navigate("/");
    }
  };

  const logout = async () => {
    dispatch({
      type: "logout",
    });
    await axios.get("http://localhost:4000/api/v1/logout");
    navigate("/signup");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img src="https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJvb2t8ZW58MHx8MHx8fDA%3D" />
        </div>
        <ul className="nav-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          {isAuth ? (
            <li onClick={logout}>Logout</li>
          ) : (
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
          )}
          <li>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
