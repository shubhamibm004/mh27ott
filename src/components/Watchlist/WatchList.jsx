import { useEffect, useState } from "react";
import { Card } from "../WatchlistCard/Card";
import './watchlist.css';

export function WatchList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function getWishlist() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
            setError('User not authenticated');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/watchlist', {
                method: "POST",  // Changed to POST as per backend requirement
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify({ user_id: user.id })  // Include user_id in the request body
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
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
                {data.map(el => <Card key={el.id} id={el.id} title={el.title} description={el.description} imageUrl={el.imageUrl} />)}
            </div>
        </div>
    );
}
