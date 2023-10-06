import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../assets/css/Content.css';
import Typography from '@mui/material/Typography';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Tooltip } from '@mui/material';

const Bookmarks = () => {

    const [bookmarkColor, setBookmarkColor] = useState('');
    const [showBookmarks, setShowBookmarks] = useState(false);

    const toggleBookmarkSection = () => {
        if (!showBookmarks) {
            setBookmarkColor('rgb(115, 49, 186)');
        } else {
            setBookmarkColor('');
        }
        setShowBookmarks(!showBookmarks);
    };
    return (
        <>
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
        </>
    );
};

export default Bookmarks;