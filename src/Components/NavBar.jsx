import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./assets/navBar.css";
import "./assets/profilePage.css"



function NavBar() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar navbar-with-background navbar-expand-lg navbar-light">
      <div className="container navbar-container">
        <Link className="navbar-brand" to="">
          Inventory Management System
        </Link>

        {userData && (
          <>
          {/* <div>
            <Link to="/group" className="btn btn-primary">
              group users
            </Link>
          </div> */}
          <div className="h4 ml-auto btn-group" style={{ position: 'relative' }}>
            <span onClick={toggleDropdown} className='user-detail dropdown-toggle'>
              {userData.userFirstName + userData.userLastName}
            </span>
            <img
              src={userData.photo}
              alt="User"
              className="user-avatar"
              style={{ width: '40px', cursor: 'pointer' }}
              onClick={toggleDropdown}
            />

            {isDropdownOpen && (
              <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                <li className='dropdown-item'>
                  <Link to={`/addProfileInfo/${userData?._id}`} className='dropdown-item btn-additional-Info'>Additional Info</Link>
                </li>
                <li className='dropdown-item text-center'>
                  <button className="btn btn-logOut dropdown-item" type="button" onClick={handleLogOut}>
                    LogOut
                  </button>
                </li>
              </ul>
            )}
          </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;






