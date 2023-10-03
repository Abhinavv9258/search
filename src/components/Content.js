import React, { useState } from 'react';
import Cards from './Cards';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../assets/css/Content.css'
import { FaCircleArrowRight } from "react-icons/fa6";

const Content = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchTagLocation, setSearchTagLocation] = useState('100vh');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = (event) => {
        // Check if the "Enter" key (key code 13) was pressed
        if (event.key === 'Enter') {
            performSearch(query);
        }
    };

    const performSearch = async () => {
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
            if (!results) {
                setSearchTagLocation('auto');
                toast.info("No results found, try changing search keywords!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                })
            }
            setResults(results);
        } catch (error) {
            setSearchTagLocation('100vh');
            setError('Error fetching results');
            toast.warning('Input is required!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        } finally {
            setSearchTagLocation('auto');
            setLoading(false);
        }
    };

    return (
        <div className='search-container' style={{ height: `${searchTagLocation}`}}>
            
            {/* <input
                type="text"
                placeholder="Enter"
                value={query}
                onChange={handleInputChange}
                prefix={<FaSearch />}

            />
            <button onClick={handleSearch}>Search</button> */
            }

            <div className='search'>
                <div className='search-tag'>
                    <input className="form-control search-board"
                        type="search"
                        value={query}
                        onKeyDown={handleSearch}
                        onChange={handleInputChange}
                        placeholder="Search.."
                        aria-label="Search" />
                    <Button className='search-btn' onClick={performSearch} variant="outline-success">
                        {/* <i className="bi bi-search"></i> */}
                        {/* <p>Search</p> */}
                        <FaCircleArrowRight className='search-icon' style={{ fontSize: '28px' }} />
                    </Button>
                </div>
            </div>

            <div className='search-result-container'>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? null : (
                    <Cards papers={results} />
                )}
            </div>
        </div>
    );
};

export default Content;