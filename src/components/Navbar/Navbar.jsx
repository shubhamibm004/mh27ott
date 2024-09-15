import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search } from "../Search/Search";
import logo from '../../assets/images/logo.svg'; 

function Navbar() {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status on component mount
    const token = localStorage.getItem('token');
    setAuth(!!token); // Set auth state based on presence of token in local storage
  }, []);

  const logOutUser = () => {
    localStorage.removeItem('token'); // Clear token
    setAuth(false); // Update auth state
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="nav">
      <div className="nav-left">
        <div>
          <Link to="/">
            <img className="PRO-img" src={logo} alt="logo" />
          </Link>
        </div>

        <div className="dropdown">
          <Link className="link" to="/tv">TV</Link>
          <ul>
            <li><Link to="/tv/en/individual">Other Shows</Link></li>
            <li><Link to="/tv/hi/individual">mh27ott Specials</Link></li>
            <li><Link to="/tv/te/individual">Star Plus</Link></li>
            <li><Link to="/tv/ml/individual">Star Vijay</Link></li>
            <li><Link to="/tv/ta/individual">Asianet</Link></li>
          </ul>
        </div>

        <div className="dropdown">
          <Link className="link" to="/movie">Movies</Link>
          <ul>
            <li><Link to="/movies/hi">Hindi</Link></li>
            <li><Link to="/movies/bn">Bengali</Link></li>
            <li><Link to="/movies/te">Telugu</Link></li>
            <li><Link to="/movies/ml">Malayalam</Link></li>
            <li><Link to="/movies/ta">Tamil</Link></li>
            <li><Link to="/movies/kn">Kannada</Link></li>
          </ul>
        </div>

        <div className="dropdown">
          <Link className="link" to="/sports">Sports</Link>
          <ul>
            <li><Link to="#">Cricket</Link></li>
            <li><Link to="#">Football</Link></li>
            <li><Link to="#">Hockey</Link></li>
            <li><Link to="#">Formula One</Link></li>
            <li><Link to="#">Tennis</Link></li>
            <li><Link to="#">Golf</Link></li>
            <li><Link to="#">Kabaddi</Link></li>
          </ul>
        </div>

        <div className="small">
          <Link to="/PRO+">PRO+</Link>
        </div>
      </div>

      <div className="nav-right">
        <Search />
        {auth ? (
          <div className="dropdown">
            <div className="link">PROFILE</div>
            <ul>
              <li><Link to="/watchlist">WatchList</Link></li>
              <li><Link to="/profile">My Account</Link></li>
              <li onClick={logOutUser}>Log Out</li>
            </ul>
          </div>
        ) : (
          <div onClick={() => navigate('/login')}>LOGIN</div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
