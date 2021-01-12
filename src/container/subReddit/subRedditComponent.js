/**
 * This component will have a header image and user data
 * Should show details component here and for side details, we have to send prop as well
 */

import Axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

import history from "../../history";
import DetailsComponent from "../shared/detailsComponent/detailsComponent";

const SubRedditPageComponent = () => {
    const [posts, setPosts] = useState([]);
    const [banner, setBanner] = useState([]);
    const [title, setTitle] = useState([]);
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
                    bannerBackgroundColor: style.bannerBackgroundColor ?  style.bannerBackgroundColor : "#3f9ade",
                    bannerHeight: style.bannerHeight,
                    bannerPositionedImage: style.bannerPositionedImage,
                    bannerBackgroundImage: style.bannerBackgroundImage,
                };
                console.log(consumableBanner);
                setBanner(consumableBanner);
                // console.log(res.data.structuredStyles.data.style)
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
                    });
                });
                setPosts(consumablePosts);
            }
        );
    }, []);

    return (
        <div className="pt-12">
            {banner.bannerHeight === "large" ? (
                <>
                    <div className="w-full h-full mb-1" style={{ backgroundColor: banner.bannerBackgroundColor }}>
                        <div className="mx-auto">{banner.bannerBackgroundImage ? <img className="bg-cover" src={banner.bannerBackgroundImage} alt="banner_img"></img> : banner.bannerPositionedImage ? <img className="p-4 mx-auto" src={banner.bannerPositionedImage} alt="banner_img"></img> : null}</div>
                    </div>
                </>
            ) : (
                <>
                    <div className="w-full mb-1 h-28" style={{ backgroundColor: banner.bannerBackgroundColor }}>
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
            <DetailsComponent posts={posts}></DetailsComponent>
        </div>
    );
};

export default SubRedditPageComponent;
