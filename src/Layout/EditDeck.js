import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { updateDeck } from "../utils/api";

function EditDeck( { deck ={} }) {
    const initialForm = {
        name: deck.name,
        description: deck.description,
        id: deck.id
    }
    const history = useHistory();
    const [formData, setFormData] = useState(initialForm);

    const handleChange = (event) => {
        const {target} = event;
        const {name, value} = target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleCancel = () => {
        history.push(`/decks/${deck.id}`);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await updateDeck(formData);
        }catch(error){
            console.log("Editing deck failed!!", error);
        }

        history.push(`/decks/${deck.id}`);
    }

    return (
        <Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
                </ol>
            </nav>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input name="name" 
                        type="text" 
                        className="form-control" 
                        defaultValue={initialForm.name} 
                        onChange={handleChange}
                        required /> 
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" 
                        className="form-control" 
                        defaultValue={initialForm.description} 
                        onChange={handleChange}
                        required />
                </div>
                <button className="btn btn-secondary mr-2"
                        onClick={handleCancel}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </Fragment>
    );

}

export default EditDeck;