/**
 * This component will contain
 * 1. filter for hot, new and top.
 * 2. iterate over topics and display in card
 * 3. side details which will read the prop sent by parent component and display that component accordingly.
 */

import Axios from "axios";
import { useEffect, useState } from "react";

import history from "../../../history";

const DetailsComponent = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        Axios.get("https://www.reddit.com/r/popular.json").then((res) => {
            let popularPosts = res.data.data.children;
            setPosts(popularPosts);
            console.log(popularPosts);
        });
    }, []);

    return (
        <div className="container flex mx-auto">
            {/* Post cards */}
            <div className="w-160">
                {posts.map((post) => (
                    <div key={post.name} className="flex mb-2 bg-white rounded">
                        <div className="w-10 text-center bg-gray-200 rounded-l">
                            <p>Vote here</p>
                        </div>
                        <div className="w-full cursor-pointer">
                            {/* Show avatar, sub reddit data, posted by and time */}
                            <div className="flex items-center">
                                <img className="w-10 mr-2 border rounded" alt="user_img"></img>
                                <p className="text-xs font-bold cursor-pointer hover:underline" onClick={() => history.push(`${post.data.subreddit_name_prefixed}`)}>
                                    {post.data.subreddit_name_prefixed}
                                </p>
                                <p className="p-1 text-xs text-gray-500">• Posted by</p>
                                <p className="pt-1 pb-1 pr-1 text-xs text-gray-500 cursor-pointer hover:underline" onClick={() => history.push(`/u/${post.data.author}`)}>
                                    u/{post.data.author}
                                </p>
                                <p className="p-1 text-xs text-gray-500 cursor-pointer hover:underline" onClick={() => history.push(`${post.data.permalink}`)}>
                                    Time Place holder
                                </p>
                            </div>
                            {/* Show Title and Post details */}
                            <div className="flex">
                                {post.data.thumbnail === "self" || post.data.thumbnail === "default"  ? (
                                    <div className="m-2 text-lg font-semibold text-left">
                                        {post.data.title}
                                        <div className="m-2 text-xs font-bold text-left text-blue-500 cursor-pointer hover:underline" onClick={() => window.open(post.data.url)}>
                                            {post.data.url.length > 40 ? <div>{post.data.url.substring(0, 30) + "..."}</div> : <div>{post.data.url}</div>}
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="m-2 text-lg font-semibold text-left w-250">
                                            {post.data.title}
                                            <div className="m-2 text-xs font-bold text-left text-blue-500 cursor-pointer hover:underline" onClick={() => window.open(post.data.url)}>
                                                {post.data.url.length > 40 ? <div>{post.data.url.substring(0, 30) + "..."}</div> : <div>{post.data.url}</div>}
                                            </div>
                                        </div>
                                        <div className="m-2">
                                            <img src={post.data.thumbnail} alt="post_thumbnail" className="border-2 border-blue-500 rounded"></img>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Show Comments icon */}

                            <div className="flex p-1">
                                <div className="p-2 text-xs font-bold text-gray-400 rounded cursor-pointer hover:bg-gray-200" onClick={() => history.push(`${post.data.permalink}`)}>
                                    <i className="mr-1 fas fa-comment-alt fa-xs"></i>
                                    <span className="font-bold">20 Comments</span>
                                </div>
                                <div className="p-2 text-xs font-bold text-gray-400 rounded cursor-pointer hover:bg-gray-200" onClick={() => history.push(`/r/${post.name}`)}>
                                    <i className="mr-1 fas fa-share fa-xs"></i>
                                    <span className="font-bold">Share</span>
                                </div>
                                <div className="p-2 text-xs font-bold text-gray-400 rounded cursor-pointer hover:bg-gray-200" onClick={() => history.push(`/r/${post.name}`)}>
                                    <i className="mr-1 fas fa-bookmark fa-xs"></i>
                                    <span className="font-bold">Save</span>
                                </div>
                            </div>
                            {/* Note: Clicking on time, post and card should go to same end point.
                            /r/subReddit/comments/kqfnmg(not sure about this)/subreddit_of_the_month_january_2021_rvenn_know_of(topic)/ */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DetailsComponent;
