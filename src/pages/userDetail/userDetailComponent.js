import { faBahai, faBirthdayCake, faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import ReactHtmlParser from "react-html-parser";

import DetailsComponent from "../../components/detailsComponent";
import FilterComponent from "../../components/filterComponent";
import history from "../../history";

const UserDetailComponent = () => {
    const [userInfo, setUserInfo] = useState({});
    const [url, setUrl] = useState(`https://www.reddit.com${history.location.pathname}.json`);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        Axios.get(`https://www.reddit.com${history.location.pathname}/about.json`)
            .then((res) => {
                let data = res.data.data;
                let consumableUserInfo = {};
                consumableUserInfo = {
                    icon_img: data.icon_img ? data.icon_img.split("?")[0] : null,
                    name: data.name,
                    total_karma: data.total_karma ? data.total_karma.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null,
                    created_utc: new Date(data.created_utc * 1000).toGMTString().split(" ", 4).join(" "),
                };
                setUserInfo(consumableUserInfo);
            })
            .catch((err) => console.error("Error in getting user details: ", err));
    }, []);

    useEffect(() => {
        Axios.get(url).then((res) => {
            let consumablePosts = [];
            let consumableComments = [];
            res.data.data.children.forEach((child) => {
                if (child.kind === "t3") {
                    consumablePosts.push({
                        id: child.data.id,
                        subreddit_name_prefixed: child.data.subreddit_name_prefixed,
                        author: child.data.author,
                        permalink: child.data.permalink,
                        created_utc: child.data.created_utc,
                        thumbnail: child.data.thumbnail,
                        title: child.data.title,
                        url: child.data.url,
                        preview: child.data.preview,
                        num_comments: child.data.num_comments,
                        score: convertScoreToReadableFormat(child.data.score),
                        isSponsored: child.data.isSponsored,
                        name: child.data.name,
                    });
                }
                if (child.kind === "t1") {
                    consumableComments.push({
                        link_id: child.data.link_id,
                        body_html: child.data.body_html,
                        score: child.data.score,
                        permalink: child.data.permalink,
                        author: child.data.author,
                        created_utc: child.data.created_utc,
                    });
                }
                consumablePosts.find((post) => post.name !== child.name);
            });
            setPosts(consumablePosts);
            setComments(consumableComments);
            setLoading(false);
        });
    }, [url]);

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

    const filterClicked = (evt) => {
        setLoading(true);
        if (evt === "hot") {
            setUrl(`https://www.reddit.com${history.location.pathname}.json?sort=hot`);
        } else if (evt === "new") {
            setUrl(`https://www.reddit.com${history.location.pathname}.json?sort=new`);
        } else if (evt === "top") {
            setUrl(`https://www.reddit.com${history.location.pathname}.json?sort=top`);
        } else if (evt === "rising") {
            setUrl(`https://www.reddit.com${history.location.pathname}.json?sort=rising`);
        }
    };

    return (
        <div className="pt-14">
            <div className="">
                <FilterComponent filterClicked={filterClicked}></FilterComponent>
            </div>
            <div className="container">
                <div className="flex mt-4">
                    <div className="bg-white w-160 sm:w-100">
                        <div className="text-left cursor-pointer">
                            <div className="ml-2 mr-2">
                                <div>
                                {!posts.length ? <div>No Posts for User</div>: null}
                                    {posts.map((post) => (
                                        <div key={post.id}className="mt-2">
                                            <DetailsComponent posts={[post]} loading={loading}>
                                                <div className="mb-4">
                                                    {comments.map((comment) =>
                                                        comment.link_id === post.name ? (
                                                            <div className="flex p-1 m-1 rounded bg-blue-50">
                                                                <FontAwesomeIcon className="mt-3 ml-1 mr-3" icon={faCommentAlt}></FontAwesomeIcon>
                                                                <div>
                                                                    <div className="flex">
                                                                        <div className="m-1 text-xs font-bold">{comment.author}</div>
                                                                        <div className="m-1 text-xs text-gray-500">{comment.score} points • </div>
                                                                        <div className="m-1 text-xs text-gray-500 cursor-pointer hover:underline" onClick={() => history.push(`/subRedditDetails${comment.permalink}`)}>
                                                                            <>
                                                                                {Math.floor(Math.floor((new Date() - new Date(comment.created_utc * 1000)) / 1000) / 60) && Math.floor(Math.floor((new Date() - new Date(comment.created_utc * 1000)) / 1000) / 60) < 60 ? (
                                                                                    <div>{Math.floor(Math.floor((new Date() - new Date(comment.created_utc * 1000)) / 1000) / 60)} minutes ago</div>
                                                                                ) : Math.floor(Math.floor(Math.floor((new Date() - new Date(comment.created_utc * 1000)) / 1000) / 60) / 60) &&
                                                                                  Math.floor(Math.floor(Math.floor((new Date() - new Date(comment.created_utc * 1000)) / 1000) / 60) / 60) < 24 ? (
                                                                                    <div>{Math.floor(Math.floor(Math.floor((new Date() - new Date(comment.created_utc * 1000)) / 1000) / 60) / 60)} hours ago</div>
                                                                                ) : Math.floor(Math.floor(Math.floor(Math.floor((new Date() - new Date(comment.created_utc * 1000)) / 1000) / 60) / 60) / 24) ? (
                                                                                    <div>{Math.floor(Math.floor(Math.floor(Math.floor((new Date() - new Date(comment.created_utc * 1000)) / 1000) / 60) / 60) / 24)} days ago</div>
                                                                                ) : null}
                                                                            </>
                                                                        </div>
                                                                    </div>
                                                                    <div className="m-1 text-xs" onClick={() => history.push(`/subRedditDetails${comment.permalink}`)}>
                                                                        {ReactHtmlParser(ReactHtmlParser(comment.body_html))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : null
                                                    )}
                                                </div>
                                            </DetailsComponent>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="ml-4">
                            <div className="flex">
                                <div className="bg-white rounded">
                                    <div className="h-20 p-2 bg-blue-600 rounded-t">
                                        <img className="w-20 h-20 text-left" src={userInfo.icon_img} alt="icon_img"></img>
                                    </div>
                                    <div className="mt-2 ml-2 text-xs font-semibold text-left">u/{userInfo.name}</div>

                                    <div className="flex pb-2 pr-2 mt-2">
                                        <div className="ml-2 mr-12 text-sm font-semibold text-left">
                                            <div>Karma</div>
                                            <div className="flex">
                                                <FontAwesomeIcon className="mt-1 mr-2 text-blue-500" icon={faBahai}></FontAwesomeIcon>
                                                <div className="pt-0.5 text-xs text-gray-500">{userInfo.total_karma}</div>
                                            </div>
                                            {/* <div className="flex">{userInfo.total_karma}</div> */}
                                        </div>
                                        <div className="ml-2 text-sm font-semibold text-left">
                                            <div>Cake Day</div>
                                            <div className="flex">
                                                <FontAwesomeIcon className="mt-1 mr-2 text-blue-500" icon={faBirthdayCake}></FontAwesomeIcon>
                                                <div className="pt-0.5 text-xs text-gray-500">{userInfo.created_utc}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <br></br>
                                    <div>
                                        <button className="inline-block w-40 py-2 m-2 text-xs font-bold text-center text-white uppercase bg-blue-600 border border-blue-500 focus:outline-none rounded-3xl hover:bg-blue-400" onClick={() => history.push("/signUp")}>
                                            Follow
                                        </button>
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

export default UserDetailComponent;
