import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, updateCard, readCard } from "../utils/api/index";

function Card({ deck={}, onUpdate }) {
    const history = useHistory();

    const initialForm = {
        front: "",
        back: "",
    };
    const [formData, setFormData] = useState(initialForm);
    const { cardId } = useParams();
    const abortController = new AbortController();

    //-----------Fetch card info with given card ID-----
    useEffect(()=> {
        async function loadCard() {
            const { signal } = abortController.signal;
            try{
                const card = await readCard(cardId, signal);
                setFormData(card);
            }catch(error){
                console.log("Reading card failed!!", error);
            }
        }
        if (cardId) loadCard();

        return () => {
            console.log("Abort Request in Card Component");
            abortController.abort();
        }
    }, []);
    //-------------------------------------------------


    // ---------Event Handlers For Input Fields---------
    const handleChange = (event) => {
        const { target } = event;
        const { name, value } = target;
        
        setFormData({...formData,
            [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        onUpdate("");

        try{
            if (!cardId) {
                const card = await createCard(deck.id, formData);
                setFormData(initialForm);
                onUpdate("created");
            }else{
                const response = await updateCard(formData);
                onUpdate("cardEdited");
                history.push(`/decks/${deck.id}`);
            }
        }catch(error){
            console.log(error);
        }
    }

    const handleCancel = () => {
        history.push(`/decks/${deck.id}`);
    }

    return ( 
        <Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {cardId ? `Edit Card ${cardId}`: "Add Card"}
                    </li> 
                </ol>
            </nav>
            <h1>{cardId ? `Edit Card : ${deck.name}`: "Add Card"}</h1> 
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Front</label>
                    <textarea 
                        name="front"
                        className="form-control"
                        placeholder="Front side of card"
                        value={formData.front}
                        defaultValue={formData.front} 
                        onChange={handleChange}
                        required/>
                </div>
                <div className="form-group">
                    <label>Back</label>
                    <textarea 
                        name="back"
                        className="form-control"
                        placeholder="Back side of card"
                        value={formData.back}
                        defaultValue={formData.back} 
                        onChange={handleChange}
                        required />
                </div>
                {/* Cancle or Done Button */}
                <button className="btn btn-secondary mr-2"
                        onClick={handleCancel}> 
                            {cardId ? "Cancel" : "Done"}
                </button>
                {/* Submit or Save Button */}
                <button type="submit" className="btn btn-primary">
                   { cardId ? "Submit" : "Save" }
                </button>
            </form>
        </Fragment>
    );

}

export default Card;