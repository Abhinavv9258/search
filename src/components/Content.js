import React, { useState } from 'react';
import Cards from './Cards';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Content = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const searchPublication = async (query) => {
                try {
                    const response = await fetch('https://api.gyanibooks.com/search_publication/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            keyword: query,
                            limit: 10,
                        }),
                    });

                    if (!response.ok) {
                        throw new Error('Error fetching results');
                    }
                    const data = await response.json();
                    return data.data;
                } catch (error) {
                    console.error(error);
                    throw error;
                }
            };
            const results = await searchPublication(query);
            if(!results){
                toast.error("No results found, try changing search keywords!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                })
            }
            setResults(results);
        } catch (error) {
            setError('Error fetching results');
            toast.error('Input is required!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter your research topic"
                value={query}
                onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Search</button>
            {loading ? (
                <p>Loading...</p>
            ) : error ? null : (
                <Cards papers={results} />
            )}
        </div>
    );
};

export default Content;