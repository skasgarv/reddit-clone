import React, { useEffect } from "react";

import history from "../../../history";

export default function MediaCard(props) {
    let cardData = props.trendingPost.results.data.children[0].data;
    useEffect(() => {}, []);
    return (
        <div className="mx-auto cursor-pointer" onClick={() => {history.push(`/search?q=${props.trendingPost.display_string.toLowerCase()}&source=trending`)}}>
            <div className="flex m-1">
                <div className="relative h-48 border-2 rounded-lg w-60 bg-gradient-to-b to-black" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${cardData.thumbnail})`, backgroundSize: "cover" }}>
                    <div className="pl-2 mt-20 font-semibold text-left text-white">{props.trendingPost.display_string}</div>
                    <div className="pl-2 text-xs text-left text-white">{cardData.title.length > 100 ? <div>{cardData.title.substring(0, 100) + "..."}</div> : <div>{cardData.title}</div>}</div>
                    <div className="absolute bottom-0 pb-2 pl-2 text-xs text-white">r/{cardData.subreddit} & more</div>
                </div>
            </div>
        </div>
    );
}
