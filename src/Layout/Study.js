import React, { Fragment, useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const [cardToShow, setCardToShow] = useState({});
    const [cardIndex, setCardIndex] = useState(0);
    const [content, setContent] = useState("");
    const [hasShownAns, setHasShownAns] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();

        async function loadDeck() {
            const {signal} = abortController.signal;

            try{
                const deck = await readDeck(deckId, signal);
                setDeck(deck);
                setCards(deck.cards);
                setCardToShow(deck.cards[0]);
                setContent(deck.cards[0].front);
            }catch(error){
                console.log("Loading deck for Study failed!", error);
            }
        }

        loadDeck();

        return () => {
            abortController.abort();
        }
    }, []);

    const handleFlip = () => {
        // Show either front side or back side of a card
        // whenever 'Flip' button clicked.
        if (hasShownAns){
            setContent(cardToShow.front);
            setHasShownAns(false);
        }else{
            setContent(cardToShow.back);
            setHasShownAns(true);
        }
    }

    const handleNext = () => {
        // When hitting the last card, show modal dialogue
        // to check whether to restart or not.  
        if (cardIndex === cards.length - 1) {
            // If restarting the deck, update states with first card's data.
            if (window.confirm("Restart cards?\n\nClick 'cancel' to return to the home page.")) {
                setCardIndex(0);
                setCardToShow(cards[0]);
                setContent(cards[0].front);
                setHasShownAns(false);
            }else{
                // Otherwise, return to home screen. 
                history.push("/");
            }
        }else {
            //Update states with next card's data.
            setCardIndex(cardIndex + 1);
            setCardToShow(cards[cardIndex + 1]);
            setContent(cards[cardIndex + 1].front);
            setHasShownAns(false);
        }
    }

    const handleAddCard = () => {
        history.push(`/decks/${deckId}/cards/new`);
    }
    
    return (
        <Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Study
                    </li>
                </ol>
            </nav> 
            <h1>Study: {deck.name}</h1>
            {cards.length <= 2 ? 
                <div>
                    <p>Not enough cards</p>
                    <p>You need at least 3 cards to study. There are {cards.length} in this deck.</p>
                    <button className="btn btn-primary"
                            onClick={handleAddCard}>Add Cards</button>
                </div> 
                :
                <div className="card">
                    <div className="card-body">
                        <h5>Card {cardIndex + 1} of {cards.length}</h5>
                        <p>{content}</p>
                        <button 
                            className="btn btn-secondary"
                            onClick={handleFlip}
                        >Flip</button>
                        {/* After flipping the card, show NEXT button. */}
                        {hasShownAns ? <button 
                                            className="btn btn-primary ml-2"
                                            onClick={handleNext}
                                        >Next</button> : null}
                    </div>
                </div>}
        </Fragment>
    );
}

export default Study;