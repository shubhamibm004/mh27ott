import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminDashboard.css'; // Add your CSS file

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', roles: 'User' });
  const [newMovie, setNewMovie] = useState({ title: '', poster_path: '', overview: '', release_date: '', language: '', popularity: '', vote_average: '' });
  const [activeTab, setActiveTab] = useState('addUser');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchMovies();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/users', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      setUsers(result);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/movies', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      setMovies(result);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/add-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        fetchUsers(); // Refresh user list
      } else {
        console.error('Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleRemoveUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/remove-user/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      if (response.ok) {
        fetchUsers(); // Refresh user list
      } else {
        console.error('Failed to remove user');
      }
    } catch (error) {
      console.error('Error removing user:', error);
    }
  };

  const handleAddMovie = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/add-movie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(newMovie),
      });
      if (response.ok) {
        fetchMovies(); // Refresh movie list
      } else {
        console.error('Failed to add movie');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const handleRemoveMovie = async (movieId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/remove-movie/${movieId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      if (response.ok) {
        fetchMovies(); // Refresh movie list
      } else {
        console.error('Failed to remove movie');
      }
    } catch (error) {
      console.error('Error removing movie:', error);
    }
  };

  return (
    <div className="adminDashboard">
      <div className="container">
        <h1>Admin Dashboard</h1>
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'addUser' ? 'active' : ''}`}
            onClick={() => setActiveTab('addUser')}
          >
            Add User
          </button>
          <button
            className={`tab ${activeTab === 'usersList' ? 'active' : ''}`}
            onClick={() => setActiveTab('usersList')}
          >
            Users List
          </button>
          <button
            className={`tab ${activeTab === 'addMovie' ? 'active' : ''}`}
            onClick={() => setActiveTab('addMovie')}
          >
            Add Movie
          </button>
          <button
            className={`tab ${activeTab === 'moviesList' ? 'active' : ''}`}
            onClick={() => setActiveTab('moviesList')}
          >
            Movies List
          </button>
        </div>

        {activeTab === 'addUser' && (
          <div className="section">
            <h2>Add User</h2>
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <select
              value={newUser.roles}
              onChange={(e) => setNewUser({ ...newUser, roles: e.target.value })}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            <button onClick={handleAddUser}>Add User</button>
          </div>
        )}

        {activeTab === 'usersList' && (
          <div className="section">
            <h2>Users</h2>
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  {user.username} ({user.email})
                  <button onClick={() => handleRemoveUser(user.id)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'addMovie' && (
          <div className="section">
            <h2>Add Movie</h2>
            <input
              type="text"
              placeholder="Title"
              value={newMovie.title}
              onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Poster Path"
              value={newMovie.poster_path}
              onChange={(e) => setNewMovie({ ...newMovie, poster_path: e.target.value })}
            />
            <textarea
              placeholder="Overview"
              value={newMovie.overview}
              onChange={(e) => setNewMovie({ ...newMovie, overview: e.target.value })}
            />
            <input
              type="date"
              placeholder="Release Date"
              value={newMovie.release_date}
              onChange={(e) => setNewMovie({ ...newMovie, release_date: e.target.value })}
            />
            <input
              type="text"
              placeholder="Language"
              value={newMovie.language}
              onChange={(e) => setNewMovie({ ...newMovie, language: e.target.value })}
            />
            <input
              type="number"
              step="0.1"
              placeholder="Popularity"
              value={newMovie.popularity}
              onChange={(e) => setNewMovie({ ...newMovie, popularity: e.target.value })}
            />
            <input
              type="number"
              step="0.1"
              placeholder="Vote Average"
              value={newMovie.vote_average}
              onChange={(e) => setNewMovie({ ...newMovie, vote_average: e.target.value })}
            />
            <button onClick={handleAddMovie}>Add Movie</button>
          </div>
        )}

        {activeTab === 'moviesList' && (
          <div className="section">
            <h2>Movies</h2>
            <ul>
              {movies.map((movie) => (
                <li key={movie.id}>
                  {movie.title} ({movie.release_date}) - {movie.language} - Popularity: {movie.popularity} - Vote Average: {movie.vote_average}
                  <button onClick={() => handleRemoveMovie(movie.id)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
