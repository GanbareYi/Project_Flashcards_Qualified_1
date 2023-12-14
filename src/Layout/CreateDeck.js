import React from "react";
import { useHistory } from "react-router-dom";

function CreateDeck(props) {
    const history = useHistory();

    return (
        <button className="btn btn-secondary" onClick={()=> history.push("/decks/new")} >
            Create Deck
        </button>
    );
}

export default CreateDeck;