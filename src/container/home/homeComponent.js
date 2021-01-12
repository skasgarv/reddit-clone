import Axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

import DetailsComponent from "../shared/detailsComponent/detailsComponent";
import TrendingTodayComponent from "./trendingToday/trendingTodayComponent";

const HomeComponent = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        Axios.get("https://www.reddit.com/r/popular.json").then((res) => {
            let consumablePosts = [];
            res.data.data.children.forEach(post => {
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
                })
            });
            setPosts(consumablePosts);
            console.log(res.data.data.children);
        });
    },[]);

    return (
        <div className="p-12 mx-auto">
            <TrendingTodayComponent></TrendingTodayComponent>
            <DetailsComponent posts={posts}></DetailsComponent>
        </div>
    );
};

export default HomeComponent;
