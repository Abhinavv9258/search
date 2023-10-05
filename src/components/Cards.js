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
import { bibtexParse } from 'bibtex-parse';


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
        const urlParts = url.split('/');
        const partialUrl = urlParts.slice(0, 3).join('/');

        const bibtexData = paper.citationStyles.bibtex;
        // Extract the year from the BibTeX data
        const yearMatch = bibtexData.match(/year\s*=\s*{(\d+)}/);
        let year = null;
        if (yearMatch) {
            year = yearMatch[1];
        }
        // Extract the author from the BibTeX data
        const authorMatch = bibtexData.match(/author\s*=\s*{([^{}]+)}/);
        let author = null;
        if (authorMatch) {
            author = authorMatch[1];
        }
        const visibleAuthor = !author
            ? author
            : author.length > 100
                ? `${author.substring(0, 100)}...`
                : author;

        // Extract the booktitle from the BibTeX data (assuming it's a conference or book title)
        const booktitleMatch = bibtexData.match(/booktitle\s*=\s*{([^{}]+)}/);
        let booktitle = null;
        if (booktitleMatch) {
            booktitle = booktitleMatch[1];
        }
        const citations = paper.citationStyles.bibtex;
        const content = (
            abstract ? (
                abstract
            ) : citations ? (
                citations
            ) : !citations ? (
                abstract
            ) : !abstract ? (
                citations
            ) : (
                null
            ));

        const visibleContent = !content
            ? content
            : content.length > 300
                ? `${content.substring(0, 300)}...`
                : content;

        return (
            <div className='cards' key={paper.paperId}>
                <Card className='card' sx={{ maxWidth: 1150 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, paddingBottom: 0 }}>
                        <div>
                            <Tooltip title='Open Website'>
                                <Typography> <a href={partialUrl} target="_blank" rel="noopener noreferrer">{partialUrl} </a> ● WEB</Typography>
                            </Tooltip>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center'}}>
                            {bookmarkedPapers.includes(paper.paperId) ? (
                                <>
                                    <Tooltip title='Remove Bookmark'>
                                        <div onClick={() => toggleBookmark(paper.paperId)} style={{ color: 'rgb(115, 49, 186)', padding: '8px', cursor: 'pointer' }} >
                                            <BookmarkIcon /> Remove
                                        </div>
                                    </Tooltip>
                                </>
                            ) : (
                                <>
                                    <Tooltip title='Add Bookmark'>
                                        <div onClick={() => toggleBookmark(paper.paperId)} style={{ color: 'rgb(115, 49, 186)', padding: '8px', cursor: 'pointer' }} >
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

                    </div>

                    <CardHeader
                        title={<Typography sx={{ fontSize: 20, fontWeight: 'bold' }}><a className='card-header-title' href={url} target="_blank" rel="noopener noreferrer">{title}</a></Typography>}
                        subheader={<>
                            <Typography color="text.secondary" sx={{ fontSize: 15 }}>Year : {year}</Typography>
                            <Typography color="text.secondary" sx={{ fontSize: 15 }}>Author : {visibleAuthor}</Typography>
                            <Typography color="text.secondary" sx={{ fontSize: 15 }}>Book Title : {booktitle} </Typography>
                        </>}
                        style={{paddingTop: 5}}
                    />
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>
                            {content && (
                                <>
                                    {<Typography>{visibleContent}</Typography>}
                                    <div className='card-btn-div'>
                                        <Button className='card-btn' onClick={() => toggleVisibility(paperId, 'content')}>
                                            Get Content
                                        </Button>
                                    </div>
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