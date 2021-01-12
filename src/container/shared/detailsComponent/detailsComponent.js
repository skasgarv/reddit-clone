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
            console.log(res);
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
                    <div key={post.data.id} className="flex mb-4 bg-white rounded-xl">
                        <div className="w-10 text-center bg-gray-200 rounded-l-lg">
                            <p>Vote here</p>
                        </div>
                        <div className="w-full">
                            {/* Show avatar, sub reddit data, posted by and time */}
                            <div className="flex items-center">
                                <img className="w-10 mr-2 border rounded"></img>
                                <p className="text-xs font-bold cursor-pointer hover:underline" onClick={() => history.push(`${post.data.subreddit_name_prefixed}`)}>
                                    {post.data.subreddit_name_prefixed}
                                </p>
                                <p className="p-1 text-xs text-gray-500">• Posted by</p>
                                <p className="pt-1 pb-1 pr-1 text-xs text-gray-500 cursor-pointer hover:underline" onClick={() => history.push(`/u/${post.data.author}`)}>
                                    u/{post.data.author}
                                </p>
                                <div className="p-1 text-xs text-gray-500 cursor-pointer hover:underline" onClick={() => history.push(`/subRedditDetails${post.data.permalink}`)}>
                                    {
                                        <>
                                            {Math.floor(Math.floor((new Date() - new Date(post.data.created_utc * 1000)) / 1000) / 60) && Math.floor(Math.floor((new Date() - new Date(post.data.created_utc * 1000)) / 1000) / 60) < 60 ? (
                                                <div>{Math.floor(Math.floor((new Date() - new Date(post.data.created_utc * 1000)) / 1000) / 60)} minutes ago</div>
                                            ) : Math.floor(Math.floor(Math.floor((new Date() - new Date(post.data.created_utc * 1000)) / 1000) / 60) / 60) && Math.floor(Math.floor(Math.floor((new Date() - new Date(post.data.created_utc * 1000)) / 1000) / 60) / 60) < 24 ? (
                                                <div>{Math.floor(Math.floor(Math.floor((new Date() - new Date(post.data.created_utc * 1000)) / 1000) / 60) / 60)} hours ago</div>
                                            ) : Math.floor(Math.floor(Math.floor(Math.floor((new Date() - new Date(post.data.created_utc * 1000)) / 1000) / 60) / 60) / 24) ? (
                                                <div>{Math.floor(Math.floor(Math.floor(Math.floor((new Date() - new Date(post.data.created_utc * 1000)) / 1000) / 60) / 60) / 24)} days ago</div>
                                            ) : null}
                                        </>
                                    }
                                </div>
                            </div>
                            {/* Show Title and Post details */}
                            <div className="flex">
                                {post.data.thumbnail === "self" || post.data.thumbnail === "default" ? (
                                    <>
                                        <div className="m-2 text-lg font-semibold text-left">
                                            <div className="cursor-pointer" onClick={() => history.push(`/subRedditDetails${post.data.permalink}`)}>{post.data.title}</div>
                                            <br></br>
                                            <div className="mt-2 text-xs font-semibold text-left text-blue-500 cursor-pointer hover:underline" onClick={() => window.open(post.data.url)}>
                                                {post.data.url.length > 40 ? <div>{post.data.url.substring(0, 30) + "..."}</div> : <div>{post.data.url}</div>}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {post.data.preview && post.data.preview.enabled ? null : (
                                            <>
                                                <div className="m-2 text-lg font-semibold text-left w-250">
                                                    <div className="cursor-pointer" onClick={() => history.push(`/subRedditDetails${post.data.permalink}`)}>{post.data.title}</div>
                                                    <div className="mt-2">
                                                        {post.data.url.length > 40 ? (
                                                            <div className="text-xs font-semibold text-left text-blue-500 cursor-pointer hover:underline">{post.data.url.substring(0, 30) + "..."}</div>
                                                        ) : (
                                                            <div className="text-xs font-semibold text-left text-blue-500 cursor-pointer hover:underline" onClick={() => window.open(post.data.url)}>
                                                                {post.data.url}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="m-2">
                                                    <img src={post.data.thumbnail} alt="post_thumbnail" className="border-2 border-blue-500 rounded" onClick={() => window.open(post.data.url)}></img>
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>

                            <div>
                                {post.data.preview ? (
                                    post.data.preview.enabled ? (
                                        <>
                                            <div className="cursor-pointer" onClick={() => history.push(`/subRedditDetails${post.data.permalink}`)}>
                                            <div className="w-full m-2 text-lg font-semibold text-left" >{post.data.title}</div>
                                            <div className="m-2">
                                                <img src={post.data.url} alt="post_thumbnail" className="mx-auto border-2 w-250"></img>
                                            </div>
                                            </div>
                                        </>
                                    ) : null
                                ) : null}
                            </div>

                            {/* Show Comments icon */}

                            <div className="flex p-1">
                                <div className="p-1 text-xs font-bold text-gray-500 rounded cursor-pointer hover:bg-gray-200" onClick={() => history.push(`/subRedditDetails${post.data.permalink}`)}>
                                    <i className="mr-1 fas fa-comment-alt fa-xs"></i>
                                    <span className="font-bold">{post.data.num_comments} Comments</span>
                                </div>
                                <div className="p-1 text-xs font-bold text-gray-500 rounded cursor-pointer hover:bg-gray-200" onClick={() => history.push(`/r/${post.name}`)}>
                                    <i className="mr-1 fas fa-share fa-xs"></i>
                                    <span className="font-bold">Share</span>
                                </div>
                                <div className="p-1 text-xs font-bold text-gray-500 rounded cursor-pointer hover:bg-gray-200" onClick={() => history.push(`/r/${post.name}`)}>
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
