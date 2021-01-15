/**
 * This component will have a header image and user data
 * Should show details component here and for side details, we have to send prop as well
 */

import Axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

import DetailsComponent from "../../components/detailsComponent";
import FilterComponent from "../../components/filterComponent";
import SideBarComponent from "../../components/sideBarComponent";
import history from "../../history";

const SubRedditPageComponent = () => {
    const [posts, setPosts] = useState([]);
    const [sideBarLoading, setSideBarLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [subRedditInfo, setSubRedditInfo] = useState(true);
    const [url, setUrl] = useState(`https://www.reddit.com/r/${history.location.pathname.substr(3, history.location.pathname.length)}.json`);

    useEffect(() => {
        Axios.get(`${url}`).then((res) => {
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
    }, [url]);

    useEffect(() => {
        Axios.get(`https://www.reddit.com/r/${history.location.pathname.substr(3, history.location.pathname.length)}/about.json`)
            .then((res) => {
                setSubRedditInfo({
                    title: res.data.data.header_title,
                    subRedditName: res.data.data.display_name_prefixed,
                    publicDescription: res.data.data.public_description,
                    subscribers: convertScoreToReadableFormat(res.data.data.subscribers),
                    accountsActive: convertScoreToReadableFormat(res.data.data.accounts_active),
                    created: new Date(res.data.data.created * 1000).toGMTString().split(" ", 4).join(" "),
                    subRedditImg: res.data.data.icon_img,
                });
                setSideBarLoading(false);
            })
            .catch((err) => {
                console.error("Error in getting sub reddit about details: ", err);
            });
    }, []);

    const filterClicked = (evt) => {
        setLoading(true);
        if (evt === "hot") {
            setUrl(`https://www.reddit.com/r/${history.location.pathname.substr(3, history.location.pathname.length)}/hot.json`);
        } else if (evt === "new") {
            setUrl(`https://www.reddit.com/r/${history.location.pathname.substr(3, history.location.pathname.length)}/new.json`);
        } else if (evt === "top") {
            setUrl(`https://www.reddit.com/r/${history.location.pathname.substr(3, history.location.pathname.length)}/top.json`);
        } else if (evt === "rising") {
            setUrl(`https://www.reddit.com/r/${history.location.pathname.substr(3, history.location.pathname.length)}/rising.json`);
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
        <div className="pt-12">
            <div className="container mb-4 text-left">
                <div className="flex m-2">
                    {subRedditInfo.subRedditImg ? <img className="w-20 mr-2 border rounded-3xl" src={subRedditInfo.subRedditImg} alt="subreddit-logo"></img> : null}
                    <div>
                        <div className="text-3xl font-bold text-left">{subRedditInfo.title}</div>
                        <div className="text-sm font-bold text-gray-600">{subRedditInfo.subRedditName}</div>
                    </div>
                </div>
            </div>
            <hr className="mb-2"></hr>
            <div className="ml-8">
                <FilterComponent filterClicked={filterClicked}></FilterComponent>
            </div>
            <div className="flex mt-4">
                <div className="container flex">
                    <DetailsComponent posts={posts} loading={loading}></DetailsComponent>
                    <SideBarComponent sideBarLoading={sideBarLoading} subRedditInfo={subRedditInfo}></SideBarComponent>
                </div>
            </div>
        </div>
    );
};

export default SubRedditPageComponent;
