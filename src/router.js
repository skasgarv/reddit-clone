import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import HomeComponent from "./container/home/homeComponent";
import SearchResults from "./container/searchResults/searchResultsComponent";
import SubRedditPageComponent from './container/subReddit/subRedditComponent';
import history from "./history";

function Routes (){
     return (
        <Router history= {history}>
            <Switch>
                <Route path='/' exact component={HomeComponent}></Route>
                <Route path='/search' component={ SearchResults }></Route>
                <Route path='/r/' component={ SubRedditPageComponent }></Route>
                <Route path='/subRedditDetails/' component={ SearchResults }></Route>
            </Switch>
        </Router>
     );
 }

 export default Routes;