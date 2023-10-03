import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import '../assets/css/Cards.css'

const Cards = ({ papers }) => {
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

    let paperElements = null;
    let errorElements = null;

    try {
        paperElements = papers.map((paper) => {
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
                <div>
                    <div className='cards' key={paper.paperId}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{title}</Card.Title>
                                <Card.Text>{paperId}</Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>
                                    {citations && (
                                        <>
                                            {visibleCitations}
                                            {citations.length > 150 && (
                                                <div>
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
                                            {visibleAbstract}
                                            {abstract.length > 150 && (
                                                <div>
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
                            <Card.Body>
                                <Card.Link  href={url}>Paper Link</Card.Link>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            );
        });
    } catch (err) {
        errorElements = (
            <p>
                {console.error(err)}
                No results found, try changing search keywords!
            </p>
        );
    }

    return (
        <div>
            {paperElements.length > 0 && <Card.Title style={{marginLeft:"5%"}}> Web Search </Card.Title>}
            {paperElements}
            {errorElements}
        </div>
    );
};

export default Cards;