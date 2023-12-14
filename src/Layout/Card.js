import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createCard } from "../utils/api/index";

function Card({ deck={} }) {
    const initialForm = {
        front: "",
        back: "",
    };
    const [formData, setFormData] = useState(initialForm);
    const history = useHistory();

    const handleChange = (event) => {
        const { target } = event;
        const { name, value } = target;

        setFormData({...formData,
                    [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const card = await createCard(deck.id, formData);
            setFormData(initialForm);
        }catch(error){
            console.log("Adding card failed!!", error);
        }
    }

    return (
        <Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
            <h1>{deck.name}: Add Card</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Front</label>
                    <textarea 
                        name="front"
                        className="form-control"
                        placeholder="Front side of card"
                        value={formData.front}
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
                        onChange={handleChange}
                        required />
                </div>
                <button className="btn btn-secondary mr-2"
                        onClick={()=>history.push(`/decks/${deck.id}`)}>Done</button>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </Fragment>
    );

}

export default Card;