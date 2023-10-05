import React, { useState, useRef, useEffect } from 'react';
import Cards from './Cards';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../assets/css/Content.css';
import Typography from '@mui/material/Typography';
import { FaCircleArrowRight } from "react-icons/fa6";
import SearchHeader from '../components/SearchHeader.js';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Tooltip } from '@mui/material';

const Content = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchTagLocation, setSearchTagLocation] = useState('90vh');
    const [bookmarkColor, setBookmarkColor] = useState('');

    // search box shadow
    const [selected, setSelected] = useState(false);
    const divRef = useRef(null);

    const handleSelected = () => {
        if (!selected) {
            setSelected(!selected);
        }
    };

    const handleClickOutside = (event) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
            setSelected(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            if (query.trim() !== '') {
                const url = `/search?q=${encodeURIComponent(query)}`;
                window.history.pushState(null, '', url);
            }
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
                    if (!data.data) {
                        if (query.trim() === '' && searchTagLocation !== 'auto') {
                            setSearchTagLocation('auto');
                        }
                        toast.info("No results found, try changing search keywords!", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 3000,
                        })
                    } else {
                        if (searchTagLocation !== 'auto') {
                            setSearchTagLocation('auto');
                        }
                    }
                    return data.data;
                } catch (error) {
                    setError(error);
                    console.log("Error while api hit", error);
                    throw error;
                }
            };
            const results = await searchPublication(query);
            setLoading(false);
            setResults(results);
        } catch (error) {
            setLoading(false);
            setQuery('');
            setError('Error fetching results');
            toast.warning('Input is required!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    const [showBookmarks, setShowBookmarks] = useState(false);

    const toggleBookmarkSection = () => {
        if (!showBookmarks){
            setBookmarkColor('rgb(115, 49, 186)');
        }else{
            setBookmarkColor('');
        }
        setShowBookmarks(!showBookmarks);
    };


    return (
        <>
            <div className='search-btn-container'>
                {searchTagLocation === 'auto' ? (
                    <div className='back-btn-container'>
                        <Button
                            className='card-btn'
                            onClick={() => {
                                setQuery('');
                                window.location.href = '/';
                            }}
                        >
                            <ArrowBackIosIcon sx={{ fontSize: "large" }} />
                            <p>Back</p>
                        </Button>
                    </div>
                ) : (
                    null
                )}
                <div className='search-container' style={{ height: `${searchTagLocation}` }}>
                    {searchTagLocation === '90vh' ? (
                        <div>
                            <SearchHeader />
                        </div>
                    ) : (
                        null
                    )}

                    <div className='search'>
                        <div
                            ref={divRef}
                            className={`search-tag ${selected ? 'selected' : ''}`}
                            onClick={handleSelected}
                        >
                            <input className="form-control search-board"
                                type="search"
                                value={query}
                                onKeyDown={handleSearch}
                                onChange={handleInputChange}
                                placeholder="Search for paper.."
                                aria-label="Search" />
                            <Button className='search-btn' onClick={performSearch} variant="outline-success">
                                <FaCircleArrowRight className='search-icon' />
                            </Button>
                        </div>
                    </div>

                    {searchTagLocation === '90vh' ? (
                        <div>
                            <Button className='card-btn' onClick={performSearch}>
                                Search the web
                            </Button>
                        </div>
                    ) : (
                        null
                    )}
                    {
                        loading ? (
                            <p style={{ zIndex: 2 }}>
                                Loading...
                            </p>
                        ):(
                            null
                        )
                    }
                </div>
            </div>

            <div className='search-result-container'>
                <div>
                    <div className='search-cards'>
                        {
                            loading ? (
                                null
                            ) : error ? null : (
                                <Cards papers={results} />
                            )
                        }
                    </div>
                </div>
            </div>

            <div>
                <div className={`bookmark-section ${showBookmarks ? ' show' : ''}`}>
                    <div className={`bookmarks ${showBookmarks ? ' show' : ''}`}>
                        <div onClick={toggleBookmarkSection} className='bookmarks-icon' style={{ color: `${bookmarkColor}` }}>
                            <Tooltip title={`${showBookmarks ? '' : 'Open Bookmark'}`}>
                                <div className='bookmarks-icon-1'>
                                    <BookmarkBorderIcon sx={{ fontSize: 30 }} />
                                    <Typography sx={{ fontSize: 20 }}>Bookmarks</Typography>
                                </div>
                            </Tooltip>

                            <div className='bookmarks-icon-2'>
                                {showBookmarks ? (
                                    <KeyboardArrowDownIcon sx={{ fontSize: 30 }} />
                                ) : (
                                    <KeyboardArrowUpIcon sx={{ fontSize: 30 }} />
                                )}
                            </div>
                        </div>
                        {showBookmarks ? (
                            <div className={`bookmarks-content ${showBookmarks ? ' show' : ''}`}>
                                <div className='bookmarks-content-list'>
                                    <Typography>No saved bookmarks were found. Bookmarks can be created from search results.</Typography>
                                </div>
                            </div>
                        ) : (
                            null
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Content;