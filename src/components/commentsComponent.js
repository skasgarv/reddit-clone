import { faArrowCircleDown, faArrowCircleUp, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import React, { useEffect, useState } from "react";

function Comment({ comment, className }) {

    const [img, setImg] = useState(null);
    useEffect(() => {
        if (comment.author) {
            console.log("Hello", comment.author)
            Axios.get(`https://www.reddit.com/user/${comment.author}/about.json`).then((resp) => {
                setImg()
            })
        }
    })
    let nestedComments = null;
    if (comment && comment.hasOwnProperty("replies")) {
        if (comment.replies && comment.replies.hasOwnProperty("data")) {
            console.log(comment)
            nestedComments = (comment.replies.data.children || []).map((comment) => {
                return <Comment className="mt-2 mb-3 ml-8" key={comment.data.id} comment={comment.data} type="child" />;
            });
        }
    }

    return (
        <div className={className}>
            <div className="pl-2 text-left">
                <div className="flex">
                    <img alt="user-logo"></img>
                    <div className="p-1 text-sm">{comment.author}</div>
                    <div className="p-1 text-sm text-gray-500">Posted ago</div>
                </div>
                <div className="p-1 text-sm">{comment.body}</div>
                <div className="flex p-1">
                    <div className="flex mr-4 votes">
                        <div>
                            <FontAwesomeIcon className="text-gray-500 cursor-pointer" icon={faArrowCircleUp} />
                        </div>
                        <div className="m-1 text-xs font-bold text-black">{comment.score}</div>
                        <div>
                            <FontAwesomeIcon className="text-gray-500 cursor-pointer" icon={faArrowCircleDown} />
                        </div>
                    </div>
                    <div className="flex mr-3 text-gray-500 reply">
                        <FontAwesomeIcon className="mt-1 cursor-pointer" icon={faComment} />
                        <div className="m-1 text-xs font-bold">Reply</div>
                    </div>
                    <div className="flex mr-3 text-gray-500 reply">
                        <div className="m-1 text-xs font-bold">Share</div>
                    </div>
                    <div className="flex mr-3 text-gray-500 reply">
                        <div className="m-1 text-xs font-bold">Report</div>
                    </div>
                    <div className="flex mr-3 text-gray-500 reply">
                        <div className="m-1 text-xs font-bold">Save</div>
                    </div>
                </div>
            </div>
            {nestedComments}
        </div>
    );
}

const CommentsComponent = ({ comments }) => {
    return (
        <div>
            <div className="bg-white rounded w-160">
                {comments.map((comment) => {
                    return <Comment key={comment.id} className="mt-2" comment={comment} />;
                })}
            </div>
        </div>
    );
};

export default CommentsComponent;
