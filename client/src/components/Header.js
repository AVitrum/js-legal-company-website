import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [signInHover, setSignInHover] = useState(false);
  const [signUpHover, setSignUpHover] = useState(false);
  const navigate = useNavigate();
  const signUpStyle = {
    backgroundColor: signUpHover ? "#7DCEA0" : "",
    borderColor: signUpHover ? "#7DCEA0" : "",
    color: signUpHover ? "black" : "#fff",
  };
  const signInStyle = {
    backgroundColor: signInHover ? "#7DCEA0" : "",
    borderColor: signInHover ? "#7DCEA0" : "",
    color: signInHover ? "black" : "#fff",
  };

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    }).then(() => {
      setUserInfo(null);
      navigate('/');
    });
  }

  const username = userInfo?.username;
  const isAdmin = userInfo?.isAdmin;

  return (
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#CDB891', height: "80px", width: "100%" }}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src="/logo.png" alt="Logo" className="navbar-logo navbar-logo-small" />
            Camel Legal Company
          </Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {username && !isAdmin && (
                  <li className="nav-item">
                    <Link to="/create" className="nav-link">Create Request</Link>
                  </li>
              )}
              {isAdmin && (
                  <li className="nav-item">
                    <Link to="/show" className="nav-link">All user requests</Link>
                  </li>
              )}
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {username ? (
                  <li className="nav-item dropdown">
                    <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                      {username}
                    </a>
                    <ul className="dropdown-menu dropdown-menu-right dropdown-menu-end" aria-labelledby="navbarDropdown">
                      {!isAdmin && (
                          <>
                            <li>
                              <Link to="/show" className="dropdown-item">
                                My requests
                              </Link>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                          </>
                      )}
                      <li><button onClick={logout} className="dropdown-item">Sign Out</button></li>
                    </ul>
                  </li>
              ) : (
                  <>
                    <li className="nav-item">
                      <Link
                          to="/login"
                          onMouseOver={() => setSignInHover(true)}
                          onMouseOut={() => setSignInHover(false)}
                          className={`btn btn-primary`}
                          style={signInStyle}
                      >
                        Sign In
                      </Link>
                    </li>
                    <li className="nav-item mx-2"></li>
                    <li className="nav-item">
                      <Link
                          to="/register"
                          onMouseOver={() => setSignUpHover(true)}
                          onMouseOut={() => setSignUpHover(false)}
                          className={`btn btn-primary`}
                          style={signUpStyle}
                      >
                        Sign Up
                      </Link>
                    </li>
                  </>
              )}
            </ul>
          </div>
        </div>
      </nav>
  );
}