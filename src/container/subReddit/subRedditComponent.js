/**
 * This component will have a header image and user data
 * Should show details component here and for side details, we have to send prop as well
 */

import Axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

import history from "../../history";
import DetailsComponent from "../shared/detailsComponent/detailsComponent";
import FilterComponent from "../shared/filter/filterComponent";

const SubRedditPageComponent = () => {
    const [posts, setPosts] = useState([]);
    const [banner, setBanner] = useState([]);
    const [title, setTitle] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subRedditInfo, setSubRedditInfo] = useState(true);
    useEffect(() => {
        Axios.get(`https://gateway.reddit.com/desktopapi/v1/subreddits/${history.location.pathname.substr(3, history.location.pathname.length)}?rtj=only&redditWebClient=web2x&app=web2x-client-production&allow_over18=&include=structuredStyles%2CprefsSubreddit&geo_filter=US&layout=card`).then(
            (res) => {
                console.log(res);
                Object.keys(res.data.subreddits).forEach((subRedditId) => {
                    if ("/" + res.data.subreddits[subRedditId].displayText === history.location.pathname) {
                        setTitle({
                            titleText: res.data.subreddits[subRedditId].title,
                            subRedditText: res.data.subreddits[subRedditId].displayText,
                        });
                    }
                });

                let style = res.data.structuredStyles.data.style;
                let consumableBanner = {
                    backgroundImagePosition: style.backgroundImagePosition,
                    bannerBackgroundColor: style.bannerBackgroundColor ? style.bannerBackgroundColor : "#3f9ade",
                    bannerHeight: style.bannerHeight,
                    bannerPositionedImage: style.bannerPositionedImage,
                    bannerBackgroundImage: style.bannerBackgroundImage,
                    backgroundColor: style.backgroundColor,
                };
                setBanner(consumableBanner);

                let consumablePosts = [];
                Object.keys(res.data.posts).forEach((post) => {
                    let preview = {};
                    let url = null;
                    if (res.data.posts[post].callToAction === null && res.data.posts[post].preview !== undefined) {
                        preview.enabled = true;
                        url = res.data.posts[post].preview.url;
                    } else {
                        preview.enabled = false;
                        url = res.data.posts[post].domain;
                    }
                    consumablePosts.push({
                        id: res.data.posts[post].id,
                        subreddit_name_prefixed: history.location.pathname,
                        author: res.data.posts[post].author,
                        permalink: res.data.posts[post].permalink.includes("https://www.reddit.com/") ? res.data.posts[post].permalink.substr(22, res.data.posts[post].permalink.length) : res.data.posts[post].permalink,
                        created_utc: res.data.posts[post].created / 1000,
                        thumbnail: res.data.posts[post].thumbnail.url,
                        title: res.data.posts[post].title,
                        url: url,
                        preview: preview,
                        num_comments: res.data.posts[post].numComments,
                        score: convertScoreToReadableFormat(res.data.posts[post].score),
                        isSponsored: res.data.posts[post].isSponsored,
                    });
                });

                // console.log(res.data.subredditAboutInfo)
                let consumableSubRedditInfo = {};
                Object.keys(res.data.subredditAboutInfo).forEach((subredditAboutInfo) => {
                    consumableSubRedditInfo = {
                        publicDescription: res.data.subredditAboutInfo[subredditAboutInfo].publicDescription,
                        subscribers: convertScoreToReadableFormat(res.data.subredditAboutInfo[subredditAboutInfo].subscribers),
                        accountsActive: convertScoreToReadableFormat(res.data.subredditAboutInfo[subredditAboutInfo].accountsActive),
                        created: new Date(res.data.subredditAboutInfo[subredditAboutInfo].created * 1000).toGMTString().split(" ", 4).join(" "),
                    };
                    console.log(consumableSubRedditInfo);
                });

                setPosts(consumablePosts);
                setSubRedditInfo(consumableSubRedditInfo);
                setLoading(false);
            }
        );
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
        <div className="pt-12">
            {banner.bannerHeight === "large" ? (
                <>
                    <div className="w-full h-full mb-1 border-t-2" style={{ backgroundColor: banner.bannerBackgroundColor }}>
                        <div className="mx-auto">{banner.bannerBackgroundImage ? <img className="bg-cover" src={banner.bannerBackgroundImage} alt="banner_img"></img> : banner.bannerPositionedImage ? <img className="p-4 mx-auto" src={banner.bannerPositionedImage} alt="banner_img"></img> : null}</div>
                    </div>
                </>
            ) : (
                <>
                    <div className="w-full mb-1 border-t-2" style={{ backgroundColor: banner.bannerBackgroundColor }}>
                        <div className="mx-auto">{banner.bannerBackgroundImage ? <img className="bg-cover" src={banner.bannerBackgroundImage} alt="banner_img"></img> : banner.bannerPositionedImage ? <img className="p-4 mx-auto" src={banner.bannerPositionedImage} alt="banner_img"></img> : null}</div>
                    </div>
                </>
            )}

            <div className="container mb-4 text-left">
                <div className="flex m-2">
                    <img className="w-10 mr-2 border rounded"></img>
                    <div>
                        <div className="text-3xl font-bold text-left">{title.titleText}</div>
                        <div className="text-sm font-bold text-gray-600">{title.subRedditText}</div>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className="flex mt-4">
                <div className="container flex">
                    <DetailsComponent posts={posts} loading={loading}></DetailsComponent>
                    <div>
                        <div>
                            <div className="mx-auto">
                                <div className="flex">
                                    <div className="relative h-auto border-2 border-gray-500 rounded w-80">
                                        <div className="h-10 p-2 font-semibold text-left text-white bg-black">About Community</div>
                                        <div className="bg-white">
                                            <div className="pt-2 pl-2 text-left">{subRedditInfo.publicDescription}</div>
                                            <div className="flex pl-2 mt-3 mb-3 ml-2 text-center bg-white">
                                                <div className="mr-8 font-semibold">
                                                    <div className="text-left">{subRedditInfo.subscribers}</div> <div>Members</div>
                                                </div>
                                                <div className="font-semibold">
                                                    <div className="text-left">{subRedditInfo.accountsActive}</div> <div>Online</div>
                                                </div>
                                            </div>
                                            <div className="m-2 border-t-2 border-gray-400"></div>
                                            <div className="flex pb-2 pl-2 mt-2 text-sm font-semibold text-left">Created {subRedditInfo.created}</div>
                                        </div>
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

export default SubRedditPageComponent;
