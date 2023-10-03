import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import '../assets/css/Cards.css'

const Cards = ({ papers }) => {
    const [expandedIds, setExpandedIds] = React.useState([]);

    let paperElements = null;
    let errorElements = null;

    const toggleVisibility = (paperId) => {
        // setExpandedPaperId(paperId);
        if (expandedIds.includes(paperId)) {
            // If already expanded, remove from the list
            setExpandedIds(expandedIds.filter((id) => id !== paperId));
        } else {
            // If collapsed, add to the list
            setExpandedIds([...expandedIds, paperId]);
        }
    };

    // const isExpanded = (paperId) => {
    //     return expandedPaperId === paperId;
    // };

    const isExpanded = (paperId) => expandedIds.includes(paperId);


    const [expandedPaperId, setExpandedPaperId] = React.useState(null);


    try {
        paperElements = papers.map((paper) => {
            const title = paper.title;
            const abstract = paper.abstract;
            const url = paper.url;
            const citations = paper.citationStyles.bibtex;
            const paperId = paper.paperId;
            const visibleAbstract =
                isExpanded(paperId) || !abstract
                    ? abstract // Display the full abstract if it's expanded or if it's null
                    : abstract.length > 150
                        ? `${abstract.substring(0, 150)}...` // Display the first 150 characters followed by "..."
                        : abstract; // Display the entire abstract if it's shorter than 150 characters
            console.log(visibleAbstract);

            return (
                <div>
                    <div className='cards' key={paper.paperId}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{title}</Card.Title>
                                <Card.Text>{paperId}</Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>{citations}</ListGroup.Item>
                                {/* <ListGroup.Item>{abstract}</ListGroup.Item> */}
                                <ListGroup.Item>
                                    {abstract && (
                                        <>
                                            {visibleAbstract}
                                            {abstract.length > 150 && !isExpanded(paperId) && (
                                                <button onClick={() => toggleVisibility(paperId)}>
                                                    {isExpanded(paperId) ? 'Show Less' : 'Show More'}
                                                </button>
                                            )}
                                        </>
                                    )}

                                </ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                                <Card.Link href={url}>Paper Link</Card.Link>
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
            {paperElements}
            {errorElements}
        </div>
    );
};

export default Cards;