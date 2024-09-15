import "./Banner.css";
import { Link, useParams } from "react-router-dom";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from "react";

function Banner({ original_title, title, year, genre, description, img, idm, mediaType }) {
  const [status, setStatus] = useState(false);
  const [wishId, setWishId] = useState("");
  const [wishData, setWishData] = useState([]);
  const { id, category } = useParams();
  
  const token = localStorage.getItem('token'); // Retrieve the JWT token directly

  async function getWishlist() {
    if (!token) return;

    try {
      const response = await fetch('http://localhost:5000/watchlist', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token // Use JWT token directly
        }
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const result = await response.json();
      setWishData(result);
    } catch (error) {
      console.error("Failed to fetch watchlist:", error);
    }
  }

  useEffect(() => {
    getWishlist();
  }, [token]);

  useEffect(() => {
    const item = wishData.find(item => item.title === original_title);
    if (item) {
      setStatus(true);
      setWishId(item._id);
    } else {
      setStatus(false);
      setWishId("");
    }
  }, [wishData, original_title]);

  useEffect(() => {
    setStatus(false);
  }, [id]);

  async function addWatchList() {
    if (!token) {
      alert('Please SignIn to add this movie to your watchlist');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/watchlist', {
        method: "POST",
        body: JSON.stringify({
          id,
          imageUrl: img,
          title,
          overview: description
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": token // Use JWT token directly
        }
      });

      if (!response.ok) throw new Error('Failed to add to watchlist');

      const result = await response.json();
      setWishId(result._id);
      setStatus(true);
    } catch (error) {
      console.error("Failed to add to watchlist:", error);
    }
  }

  async function deleteWatchList() {
    if (!wishId) return;

    try {
      const response = await fetch(`http://localhost:5000/watchlist/${wishId}`, {
        method: "DELETE",
        headers: {
          "Authorization": token // Use JWT token directly
        }
      });

      if (!response.ok) throw new Error('Failed to remove from watchlist');

      setStatus(false);
      setWishId("");
    } catch (error) {
      console.error("Failed to delete from watchlist:", error);
    }
  }

  return (
    <Link to={mediaType === "tv" ? `/tv/${idm}` : `/movie/${idm || id}`}>
      <div className="banner-container">
        <div className="banner-left">
          <div className="banner-details">
            <h1>{title}</h1>
            <div id="genre">
              <span>{genre}</span>
            </div>
            <p className="banner-descr">{description}</p>
          </div>
          {id && (
            <div className="btns">
              <Link to={`/${category}/${id}/video`}>
                <div>
                  <PlayArrowRoundedIcon fontSize="large" className="play-icon" />
                  <h2>Watch Movie</h2>
                </div>
              </Link>
              <div>
                <div className="playlist-btn" onClick={status ? deleteWatchList : addWatchList}>
                  {status ? <CheckIcon className="checkIcon" fontSize="large" /> : <AddIcon fontSize="large" />}
                  watchlist
                </div>
                <div>
                  <ShareRoundedIcon />
                  share
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className="banner-right"
          style={{ backgroundImage: `url(${img})` }}
        >
          <div></div>
        </div>
      </div>
    </Link>
  );
}

export default Banner;
