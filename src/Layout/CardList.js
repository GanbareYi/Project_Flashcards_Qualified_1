import React, { Fragment } from "react"
import { Link, useHistory } from "react-router-dom";
import { deleteDeck, deleteCard } from "../utils/api/index";

function CardList( { deckId, deck={}, cards=[] }){
    const history = useHistory();
    const handleDeleteDeck = async (deckId)=> {
        if (window.confirm(
                "Delete this deck?\n\nYou will not be able to recover it."))
        {
            try{
                const response = await deleteDeck(deckId);
                history.push("/")
            }catch(error) {
                console.log("Deleting deck failed!!", error);
            }
        }
    }

    const handleDeleteCard = async (cardId) => {
        if (window.confirm("Delete this card?\n\nYou will not be able to recover it.")){
            try {
                const response = await deleteCard(cardId);
            }catch(error) {
                console.log("Deleting card failed!!", error);
            }
        }
    }

    const handleAddCard = () => {
        history.push(`/decks/${deckId}/cards/new`);
    }

    const handleStudy = () => {
        history.push(`/decks/${deckId}/study`);
    }

    const handleEdit = () => {
        history.push(`/decks/${deckId}/edit`);
    }

    const handleEditCard = (cardId) => {
        history.push(`/decks/${deckId}/cards/${cardId}/edit`);
    }

    return (
        <Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {deck.name}
                    </li>
                </ol>
            </nav>
            <div className="deckInfo">
                <h2>{deck.name}</h2>
                <p>{deck.description}</p>
                {/* Edit button */}
                <button className="btn btn-secondary mr-2"
                        onClick={handleEdit}>Edit</button>
                {/* Study button */}
                <button  
                    className="btn btn-primary mr-2"
                    onClick={handleStudy}
                    >Study</button>
                {/* Add Cards button */}
                <button className="btn btn-primary"
                        onClick={handleAddCard}>Add Cards</button>
                {/* Delete button */}
                <button 
                    className="btn btn-danger float-right"
                    onClick={() => handleDeleteDeck(deckId)}
                    >Delete</button>
            </div>
            {cards.length !== 0 ? 
            <div className="cardsInfo mt-3">
                <h1>Cards</h1>
                {cards.map((card, index) => 
                    <div key={index} className="card">
                        <div className="card-body">
                            <div className="d-flex">
                                <p className="question mr-auto">
                                    {card.front}
                                </p>
                                <p className="answer">
                                    {card.back}
                                </p>
                            </div>
                            <div className="actions float-right">
                                <button className="btn btn-secondary"
                                        onClick={() => handleEditCard(card.id)}>
                                    Edit
                                </button>
                                <button className="btn btn-danger mx-2"
                                        onClick={() => handleDeleteCard(card.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            :
            null}
        </Fragment>
    );
}

export default CardList;