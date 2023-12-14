import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { readCard, updateCard } from "../utils/api";

function EditCard({ deck={} }) {
    const { cardId } = useParams();
    const [card, setCard] = useState({});
    const abortController = new AbortController();
    const history = useHistory();

    useEffect(()=> {
        async function loadCard() {
            const { signal } = abortController.signal;
            try{
                const card = await readCard(cardId, signal);
                setCard(card);
            }catch(error){
                console.log("Reading card failed!!", error);
            }
        }

        loadCard();

        return () => {
            abortController.abort();
        }
    }, []);

    const handleChange = (event) => {
        const { target } = event;
        const {name, value} = target;

        setCard({
            ...card,
            [name]: value,
        })
    }

    const handleCancel = () => {
        history.push(`/decks/${deck.id}`);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const response = await updateCard(card);
            history.push(`/decks/${deck.id}`);
        }catch(error) {
            console.log("Updating card failed!!", error);
        }
    }

    return (
        <Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
                </ol>
            </nav>
            <h1>Edit Card</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Front</label>
                    <textarea name="front" 
                        className="form-control"
                        defaultValue={card.front} 
                        onChange={handleChange}
                        required />
                </div>
                <div className="form-group">
                    <label>Back</label>
                    <textarea name="back" 
                        className="form-control"
                        defaultValue={card.back} 
                        onChange={handleChange}
                        required />
                </div>
                <button className="btn btn-secondary mr-2" onClick={handleCancel} >
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>

        </Fragment>
    );
}

export default EditCard;