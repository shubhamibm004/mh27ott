import { useEffect, useState } from "react";
import { Card } from "../WatchlistCard/Card";
import './watchlist.css';

export function WatchList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function getWishlist() {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        const user = localStorage.getItem('user'); // Retrieve the user data from local storage

        if (!token || !user) {
            setError('User not authenticated or user data is missing');
            setLoading(false);
            return;
        }

        let userId;
        try {
            const parsedUser = JSON.parse(user);
            userId = parsedUser.id;
            if (!userId) {
                throw new Error('User ID is missing');
            }
        } catch (error) {
            setError('Invalid user data');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/watchlist', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Use the token retrieved from local storage
                },
                body: JSON.stringify({ user_id: userId }) // Include user_id in the request body
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || 'Network response was not ok');
            }

            const result = await response.json();
            setData(result);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getWishlist();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h3>Watchlist</h3>
            <div className="watchListRes">
                {data.length > 0 ? (
                    data.map(el => (
                        <Card
                            key={el.id}
                            id={el.id}
                            title={el.title}
                            description={el.description}
                            imageUrl={el.imageUrl}
                        />
                    ))
                ) : (
                    <p>No items in your watchlist</p>
                )}
            </div>
        </div>
    );
}
