import React, { Fragment, useEffect, useState } from "react";
import { useParams, Switch, Route, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api";
import Study from "./Study";
import CardList from "./CardList";
import Card from "./Card";
import EditDeck from "./EditDeck";
import EditCard from "./EditCard";

function Deck(){
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const abortController = new AbortController();
    const { deckId } = useParams();
    const { path } = useRouteMatch();

    useEffect(()=>{
        async function loadDeck(){
            const { signal } = abortController.signal;
            
            try{
                const response = await readDeck(deckId, signal);
                setDeck(response);
                setCards(response.cards);
            }catch(error) {
                console.log("Loading deck failed!", error);
            }
        }

        loadDeck();

        return () => {
            console.log("Request aborted!")
        }
    }, [deckId, cards]);

    return (
        <Fragment>
            <Switch>
                <Route exact path={path}>
                    <CardList deckId={deckId} deck={deck} cards={cards} />
                </Route>
                <Route path={`${path}/study`}>
                    <Study />
                </Route>
                <Route path={`${path}/cards/new`}>
                    <Card deck={deck} />
                </Route>
                <Route path={`${path}/edit`}>
                    <EditDeck deck={deck}/>
                </Route>
                <Route path={`${path}/cards/:cardId/edit`}>
                    <EditCard deck={deck}/>
                </Route>
            </Switch>
        </Fragment>
    );
}

export default Deck;