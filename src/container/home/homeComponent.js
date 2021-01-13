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
    useEffect(() => {
        Axios.get("https://www.reddit.com/r/popular.json").then((res) => {
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
            console.log(res);
        });
        Axios.get("https://www.reddit.com/api/trending_subreddits.json").then((res) => {
            console.log("setting", res);
            setTrendingSubReddits(res.data.subreddit_names);
        });
    }, []);
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
            <div className="flex mt-4">
                <div className="container flex">
                    <DetailsComponent posts={posts} loading={loading}></DetailsComponent>
                    <div>
                        <div>
                            <div className="mx-auto">
                                <div className="flex">
                                    <div className="relative h-auto border-2 border-gray-500 rounded w-80">
                                        <div className="h-10 p-2 font-semibold text-left text-white bg-black">Trending SubReddits</div>
                                        {trendingSubReddits.map((trendingSubReddit) => (
                                            <div>
                                                <div class="cursor-pointer m-2" onClick={() => history.push(`/r/${trendingSubReddit}`)}>/r/{trendingSubReddit}</div>
                                                <hr></hr>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeComponent;
