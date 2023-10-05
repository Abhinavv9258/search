import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import ListGroup from 'react-bootstrap/ListGroup';
import '../assets/css/Cards.css'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Tooltip from '@mui/material/Tooltip';


const Cards = ({ papers }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [expandedCitations, setExpandedCitations] = useState([]);
    const [expandedAbstracts, setExpandedAbstracts] = useState([]);

    const toggleVisibility = (paperId, type) => {
        if (type === 'citation') {
            if (expandedCitations.includes(paperId)) {
                setExpandedCitations(expandedCitations.filter((id) => id !== paperId));
            } else {
                setExpandedCitations([...expandedCitations, paperId]);
            }
        } else if (type === 'abstract') {
            if (expandedAbstracts.includes(paperId)) {
                setExpandedAbstracts(expandedAbstracts.filter((id) => id !== paperId));
            } else {
                setExpandedAbstracts([...expandedAbstracts, paperId]);
            }
        }
    };

    const isCitationExpanded = (paperId) => expandedCitations.includes(paperId);
    const isAbstractExpanded = (paperId) => expandedAbstracts.includes(paperId);

    // bookmark functionality
    const [bookmarkedPapers, setBookmarkedPapers] = useState([]);

    const toggleBookmark = (paperId) => {
        if (bookmarkedPapers.includes(paperId)) {
            setBookmarkedPapers(bookmarkedPapers.filter((id) => id !== paperId));
        } else {
            setBookmarkedPapers([...bookmarkedPapers, paperId]);
        }
    };

    let paperElements = papers && papers.map((paper) => {
        const paperId = paper.paperId;
        const title = paper.title;
        const abstract = paper.abstract;
        const url = paper.url;
        const citations = paper.citationStyles.bibtex;
        const visibleCitations =
            isCitationExpanded(paperId) || !citations
                ? citations
                : citations.length > 150
                    ? `${citations.substring(0, 150)}...`
                    : citations;
        const visibleAbstract =
            isAbstractExpanded(paperId) || !abstract
                ? abstract
                : abstract.length > 150
                    ? `${abstract.substring(0, 150)}...`
                    : abstract;
        return (
            <div className='cards' key={paper.paperId}>
                <Card className='card' sx={{ maxWidth: 1150 }}>
                    <CardHeader
                        title={<Typography sx={{ fontSize: 20 }}>{title}</Typography>}
                        subheader={<Typography color="text.secondary" sx={{ fontSize: 15 }}>{paperId}</Typography>}
                        action={
                            <>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {bookmarkedPapers.includes(paper.paperId) ? (
                                        <>
                                            <Tooltip title='Remove Bookmark'>
                                                <div onClick={() => toggleBookmark(paper.paperId)} style={{ color: 'rgb(115, 49, 186)', padding: '8px' }} >
                                                    <BookmarkIcon /> Remove
                                                </div>
                                            </Tooltip>
                                        </>
                                    ) : (
                                        <>
                                            <Tooltip title='Add Bookmark'>
                                                <div onClick={() => toggleBookmark(paper.paperId)} style={{ color: 'rgb(115, 49, 186)', padding: '8px' }} >
                                                    <BookmarkBorderIcon /> Bookmark
                                                </div>
                                            </Tooltip>
                                        </>
                                    )}

                                    <Tooltip title='More'>
                                        <IconButton aria-label="settings" className='icon-button'>
                                            <Button
                                                style={{ padding: 0, margin: 0 }}
                                                id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                            >
                                                <MoreVertIcon sx={{ color: 'rgb(115, 49, 186)' }} />
                                            </Button>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <MenuItem > <a href={url} target="_blank" rel="noopener noreferrer">Open Link</a></MenuItem>
                                                <MenuItem >Report</MenuItem>
                                            </Menu>
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </>
                        }
                    />
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>
                            {citations && (
                                <>
                                    {<Typography>{visibleCitations}</Typography>}
                                    {citations.length > 150 && (
                                        <div className='card-btn-div'>
                                            <Button className='card-btn' onClick={() => toggleVisibility(paperId, 'citation')}>
                                                {isCitationExpanded(paperId)
                                                    ? 'Show Less'
                                                    : 'Show More'}
                                            </Button>
                                        </div>
                                    )}
                                </>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {abstract && (
                                <>
                                    {<Typography>{visibleAbstract}</Typography>}
                                    {abstract.length > 150 && (
                                        <div className='card-btn-div'>
                                            <Button className='card-btn' onClick={() => toggleVisibility(paperId, 'abstract')}>
                                                {isAbstractExpanded(paperId)
                                                    ? 'Show Less'
                                                    : 'Show More'}
                                            </Button>
                                        </div>
                                    )}
                                </>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        );
    });

    return (
        <>
            <div style={{ marginTop: "150px", padding: 0 }}>
                {paperElements &&
                    (paperElements.length > 0 &&
                        <Typography sx={{ fontSize: 22, marginLeft: 6.5, fontWeight: 'bold' }}>
                            Web Results
                        </Typography>
                    )
                }
                {papers && (paperElements)}
            </div>
        </>

    );
};

export default Cards;