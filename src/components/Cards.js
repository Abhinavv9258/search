import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Button } from 'react-bootstrap';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import ListGroup from 'react-bootstrap/ListGroup';
import '../assets/css/Cards.css'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const Cards = ({ papers }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [expandedCitations, setExpandedCitations] = React.useState([]);
    const [expandedAbstracts, setExpandedAbstracts] = React.useState([]);

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
                <Card className='card' sx={{ maxWidth: 1000 }}>
                    <CardHeader
                        action={
                            <IconButton aria-label="settings" className='icon-button'>
                                <Button 
                                    style={{padding:0, margin:0}}
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <MoreVertIcon />
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
                        }
                        title={<Typography sx={{fontSize:20}}>{title}</Typography>}
                        subheader={<Typography color="text.secondary" sx={{fontSize:15}}>{paperId}</Typography>}

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
        <div>
            {paperElements && (paperElements.length > 0 && <Typography sx={{ fontSize: 22, marginLeft: 6.5, fontWeight: 'bold' }}> Web Results </Typography>)}
            {papers && (paperElements)}
        </div>
    );
};

export default Cards;