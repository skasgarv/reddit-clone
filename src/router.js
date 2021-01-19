import React from "react";
import { Route, Router, Switch } from "react-router-dom";

import history from "./history";
import HomeComponent from "./pages/home/homeComponent";
import PendingComponent from "./pages/pending/pendingComponent";
import PostDetailComponent from "./pages/postDetail/postDetailComponent";
import SubRedditPageComponent from "./pages/subReddit/subRedditComponent";
import UserDetailComponent from "./pages/userDetail/userDetailComponent";

function Routes() {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={HomeComponent}></Route>
                <Route path="/search" component={PendingComponent}></Route>
                <Route path="/r/" component={SubRedditPageComponent}></Route>
                <Route path="/subRedditDetails/" component={PostDetailComponent}></Route>
                <Route path="/user/" component={UserDetailComponent}></Route>
            </Switch>
        </Router>
    );
}

export default Routes;
