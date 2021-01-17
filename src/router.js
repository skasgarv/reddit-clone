import React from "react";
import { Route, Router, Switch } from "react-router-dom";

import history from "./history";
import HomeComponent from "./pages/home/homeComponent";
import PostDetailComponent from "./pages/postDetail/postDetailComponent";
import SearchResults from "./pages/searchResults/searchResultsComponent";
import SubRedditPageComponent from "./pages/subReddit/subRedditComponent";
import UserDetailComponent from "./pages/userDetail/userDetailComponent";

function Routes() {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={HomeComponent}></Route>
                <Route path="/search" component={SearchResults}></Route>
                <Route path="/r/" component={SubRedditPageComponent}></Route>
                <Route path="/subRedditDetails/" component={PostDetailComponent}></Route>
                <Route path="/user/" component={UserDetailComponent}></Route>
            </Switch>
        </Router>
    );
}

export default Routes;
