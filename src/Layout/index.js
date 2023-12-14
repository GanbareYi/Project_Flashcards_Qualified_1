import React, { Fragment, useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeck from "./CreateDeck";
import Decks from "./Decks";
import NewDeck from "./NewDeck";
import Deck from "./Deck";
import Card from "./Card";
import { listDecks } from "../utils/api/index";

function Layout() {
  const [decks, setDecks] = useState([]);
  const abortController = new AbortController();

  useEffect(() => {
    async function loadDecks() {
      try {
        const deckFromApi = await listDecks(abortController.signal);

        setDecks(deckFromApi);
      }catch(error){
        if(error.name === "AbortError"){
          console.log("Aborted!!", error);
        }else{
          console.log(error);
          throw error;
        }
      }

    }

    loadDecks();

    return () => {
      abortController.abort();
    }
  }, [decks]);

  return (
    <Fragment>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <CreateDeck />
            <Decks decks={decks}/>
          </Route>
          <Route path="/decks/new">
            <NewDeck />
          </Route>
          <Route path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default Layout;
