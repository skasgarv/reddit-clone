import Axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

import history from "../../history";
import DetailsComponent from "../shared/detailsComponent/detailsComponent";
import FilterComponent from "../shared/filter/filterComponent";
import TrendingTodayComponent from "./trendingToday/trendingTodayComponent";

const HomeComponent = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [trendingSubReddits, setTrendingSubReddits] = useState([]);
    const [trendingSubRedditsLoading, setTrendingSubRedditsLoading] = useState([true]);
    const [url, setUrl] = useState("https://www.reddit.com/r/popular.json");
    useEffect(() => {
        Axios.get(url).then((res) => {
            let consumablePosts = [];
            res.data.data.children.forEach((post) => {
                consumablePosts.push({
                    id: post.data.id,
                    subreddit_name_prefixed: post.data.subreddit_name_prefixed,
                    author: post.data.author,
                    permalink: post.data.permalink,
                    created_utc: post.data.created_utc,
                    thumbnail: post.data.thumbnail,
                    title: post.data.title,
                    url: post.data.url,
                    preview: post.data.preview,
                    num_comments: post.data.num_comments,
                    score: convertScoreToReadableFormat(post.data.score),
                    isSponsored: post.data.isSponsored,
                });
            });
            setPosts(consumablePosts);
            setLoading(false);
        });
        Axios.get("https://www.reddit.com/api/trending_subreddits.json").then((res) => {
            setTrendingSubReddits(res.data.subreddit_names);
            setTrendingSubRedditsLoading(false);
        });
    }, [url]);

    const filterClicked = (evt) => {
        setLoading(true);
        if (evt === "hot") {
            setUrl("https://www.reddit.com/hot.json");
        } else if (evt === "new") {
            setUrl("https://www.reddit.com/new.json");
        } else if (evt === "top") {
            setUrl("https://www.reddit.com/top.json");
        } else if (evt === "rising") {
            setUrl("https://www.reddit.com/rising.json");
        }
    };
    const convertScoreToReadableFormat = (num) => {
        if (num === null) {
            return null;
        }
        if (num === 0) {
            return "0";
        }
        var b = num.toPrecision(2).split("e"), // get power
            k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
            c = k < 1 ? num.toFixed(0) : (num / Math.pow(10, k * 3)).toFixed(1), // divide by power
            d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
            e = d + ["", "K", "M", "B", "T"][k]; // append power
        return e;
    };

    return (
        <div className="p-12">
            <TrendingTodayComponent loading={loading}></TrendingTodayComponent>
            <div className="ml-8">
                <FilterComponent filterClicked={filterClicked}></FilterComponent>
            </div>
            <div className="flex mt-4">
                <div className="container flex">
                    <DetailsComponent posts={posts} loading={loading}></DetailsComponent>
                    <div>
                        <div className="mx-auto">
                            <div className="flex">
                                {trendingSubRedditsLoading ? (
                                    <div className="animate-pulse">
                                        <div className="p-2 text-left text-white text-md bg-gradient-to-r from-blue-600 via-blue-400 to-green-300 h-18">
                                            <div className="flex">
                                                <img className="h-14" src="https://www.redditstatic.com/desktop2x/img/discovery/magnifying-glass-snoo.png" alt="magnifying-glass-logo"></img>
                                                <div className="mt-1 ml-2">
                                                    <div>SubReddits —</div>
                                                    <div>See whats's trending</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative h-auto w-80">
                                        <div className="p-2 text-left text-white text-md bg-gradient-to-r from-blue-600 via-blue-400 to-green-300 h-18">
                                            <div className="flex">
                                                <img className="h-14" src="https://www.redditstatic.com/desktop2x/img/discovery/magnifying-glass-snoo.png" alt="magnifying-glass-logo"></img>
                                                <div className="mt-1 ml-2">
                                                    <div>SubReddits —</div>
                                                    <div>See whats's trending</div>
                                                </div>
                                            </div>
                                        </div>
                                        {trendingSubReddits.map((trendingSubReddit) => (
                                            <div key={trendingSubReddit} className="bg-white">
                                                <div className="pt-2 mb-2 ml-2 text-left cursor-pointer" onClick={() => history.push(`/r/${trendingSubReddit}`)}>
                                                    <div className="flex">
                                                        <div>/r/{trendingSubReddit}</div>
                                                    </div>
                                                </div>
                                                <hr></hr>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeComponent;
