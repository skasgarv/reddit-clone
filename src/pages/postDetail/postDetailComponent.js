import Axios from "axios";
import { useEffect, useState } from "react";

import CommentsComponent from "../../components/commentsComponent";
import DetailsComponent from "../../components/detailsComponent";
import SideBarComponent from "../../components/sideBarComponent";
import history from "../../history";

const PostDetailComponent = () => {
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [sideBarLoading, setSideBarLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [subRedditInfo, setSubRedditInfo] = useState(true);

    useEffect(() => {
        Axios.get(`https://www.reddit.com/${history.location.pathname.split("/").slice(2).join("/")}.json`)
            .then((res) => {
                let consumablePosts = [];
                consumablePosts.push({
                    id: res.data[0].data.children[0].data.id,
                    subreddit_name_prefixed: res.data[0].data.children[0].data.subreddit_name_prefixed,
                    author: res.data[0].data.children[0].data.author,
                    permalink: res.data[0].data.children[0].data.permalink,
                    created_utc: res.data[0].data.children[0].data.created_utc,
                    thumbnail: res.data[0].data.children[0].data.thumbnail,
                    title: res.data[0].data.children[0].data.title,
                    url: res.data[0].data.children[0].data.url,
                    preview: res.data[0].data.children[0].data.preview,
                    num_comments: res.data[0].data.children[0].data.num_comments,
                    score: convertScoreToReadableFormat(res.data[0].data.children[0].data.score),
                    isSponsored: res.data[0].data.children[0].data.isSponsored,
                });
                setPost(consumablePosts);

                let consumableComments = [];
                res.data[1].data.children.forEach((child) => {
                    let data = child.data;
                    consumableComments.push({
                        id: data.id,
                        author: data.author,
                        body: data.body,
                        body_html: data.body_html,
                        created_utc: data.created_utc,
                        replies: data.replies,
                        score: data.score,
                        stickied: data.stickied,
                        is_submitter: data.is_submitter,
                        distinguished: data.distinguished,
                        edited: data.edited,
                    });
                    setComments(consumableComments);
                });
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error in getting sub reddit post details:", err);
            });
    }, []);
    useEffect(() => {
        Axios.get(`https://www.reddit.com/${history.location.pathname.split("/").slice(2, 4).join("/")}/about.json`)
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
    }, [post]);

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
        <div className="p-12 mt-2">
            <div className="container flex">
                <DetailsComponent posts={post} loading={loading}>
                    <CommentsComponent comments={comments}></CommentsComponent>
                </DetailsComponent>
                <SideBarComponent sideBarLoading={sideBarLoading} subRedditInfo={subRedditInfo}></SideBarComponent>
            </div>
        </div>
    );
};

export default PostDetailComponent;
