import React, { Fragment, useEffect, useState } from "react";
import { useParams, Switch, Route, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api";
import Study from "./Study";
import CardList from "./CardList";
import Card from "./Card";
import EditDeck from "./EditDeck";

function Deck({ onUpdate }){
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const [status, setStatus] = useState("");
    const abortController = new AbortController();
    const { deckId } = useParams();
    const { path } = useRouteMatch();

    useEffect(()=>{
        async function loadDeck(){
            const { signal } = abortController.signal;

            onUpdate("");
            
            try{
                const response = await readDeck(deckId, signal);
                setDeck(response);
                setCards(response.cards);
                onUpdate("updated");
            }catch(error) {
                console.log("Loading deck failed!", error);
            }
        }

        loadDeck();

        return () => {
            console.log("Request aborted!")
        }
    }, [deckId, status]);

    return (
        <Fragment>
            <Switch>
                <Route exact path={path}>
                    <CardList deckId={deckId} deck={deck} cards={cards} onUpdate={setStatus}/>
                </Route>
                <Route path={`${path}/study`}>
                    <Study />
                </Route>
                <Route path={`${path}/cards/new`}>
                    <Card deck={deck} onUpdate={setStatus}/>
                </Route>
                <Route path={`${path}/cards/:cardId/edit`}>
                    <Card deck={deck} onUpdate={setStatus}/>
                </Route>
                <Route path={`${path}/edit`}>
                    <EditDeck deck={deck} onEdit={setStatus} />
                </Route>
            </Switch>
        </Fragment>
    );
}

export default Deck;