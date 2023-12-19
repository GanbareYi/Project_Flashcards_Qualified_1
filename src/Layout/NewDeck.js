import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function NewDeck({ onCreate }) {
    const history = useHistory();
    const [formData, setFormData] = useState({});

    const handleChange = (event) => {
        const { target } = event;
        const { name, value } = target;

        setFormData({
            ...formData, 
            [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        onCreate("");
        try {
            const deck = await createDeck(formData)
            onCreate("created");
            history.push(`/decks/${deck.id}`);
        }catch(error){
            console.log("Creating deck failed!!", error);
        }
    }

    return (
        <Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>
            <h1>Create Deck</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input 
                        name="name" 
                        className="form-control" 
                        type="text" 
                        placeholder="Deck Name"
                        onChange={handleChange}
                        required />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea 
                        name="description" 
                        className="form-control" 
                        placeholder="Brief description of the deck"
                        onChange={handleChange}
                        required />
                </div>
                <button 
                    type="button" 
                    className="btn btn-secondary mr-2" 
                    onClick={()=> history.push("/")}
                >Cancel</button>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                >Submit</button>
            </form>
        </Fragment>
    );
}

export default NewDeck;