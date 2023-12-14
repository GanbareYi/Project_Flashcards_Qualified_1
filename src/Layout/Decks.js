import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";

function Decks( { decks=[] }) {
    const history = useHistory();

    const handleDelete = async (deckId)=> {
        if (window.confirm(
                "Delete this deck?\n\nYou will not be able to recover it."))
        {
            try{
                const response = await deleteDeck(deckId);
            }catch(error) {
                console.log("Deleting deck failed!!", error);
            }
        }
    }

    const decksLst = decks.map(deck => 
        <div key={deck.id} className="card mt-3">
            <div className="card-body">
                <div className="d-flex">
                    <h5 className="card-title mr-auto">{deck.name}</h5>
                    <h6 className="text-muted">{deck.cards.length} cards</h6>
                </div>
                <p className="card-text">{deck.description}</p>
                <button 
                    className="btn btn-secondary mx-2"
                    onClick={()=> history.push(`/decks/${deck.id}`)}
                    >View</button>
                <button 
                    className="btn btn-primary mx-2"
                    onClick={()=> history.push(`/decks/${deck.id}/study`)}>Study</button>
                <button 
                    className="btn btn-danger float-right"
                    onClick={() => handleDelete(deck.id)}
                    >Delete</button>              
            </div>
        </div>
    );

    return (
        <div className="decksList">
            {decksLst}
        </div>
    );
}

export default Decks;