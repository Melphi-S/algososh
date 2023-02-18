import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { FibonacciPage } from "../fibonacci-page/FibonacciPage";
import { ListPage } from "../list-page/ListPage";
import { MainPage } from "../main-page/main-page";
import { QueuePage } from "../queue-page/QueuePage";
import { StringComponent } from "../string/StringComponent";
import { SortingPage } from "../sorting-page/SortingPage";
import { StackPage } from "../stack-page/StackPage";

import styles from './app.module.css'

function App() {
  return (
    <div className={styles.app}>
      <HashRouter>
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/recursion">
            <StringComponent />
          </Route>
          <Route path="/fibonacci">
            <FibonacciPage />
          </Route>
          <Route path="/sorting">
            <SortingPage />
          </Route>
          <Route path="/stack">
            <StackPage />
          </Route>
          <Route path="/queue">
            <QueuePage />
          </Route>
          <Route path="/list">
            <ListPage />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
