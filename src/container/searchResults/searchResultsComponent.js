import React from "react";

import SearchTabComponent from "./searchTabComponent";

const SearchResults = () => {
    console.log("In SearchResults");
    return (
        <div>
            <div className="pull-left">Suhas - This should name of query</div>
            <div style={{color: "grey"}}>Search Results</div>
            <SearchTabComponent></SearchTabComponent>
        </div>

    )
}

export default SearchResults;