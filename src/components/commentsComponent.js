import { faArrowCircleDown, faArrowCircleUp, faCommentAlt, faMicrophone, faShieldVirus, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ReactHtmlParser from "react-html-parser";

import history from "../history";

function Comment({ comment, className }) {
    let nestedComments = null;
    if (comment && comment.hasOwnProperty("replies")) {
        if (comment.replies && comment.replies.hasOwnProperty("data")) {
            nestedComments = (comment.replies.data.children || []).map((comment) => {
                return <Comment className="mt-2 mb-3 ml-2 border-l-2" key={comment.data.id} comment={comment.data} type="child" />;
            });
        }
    }

    return (
        <div className={className}>
            {comment.author ? (
                <div className="pl-3 pr-3 text-left">
                    <div className="pl-1 pr-1 rounded bg-blue-50">
                        <div className="flex">
                            <div className="mr-1">
                                <FontAwesomeIcon className="text-gray-500" icon={faUser}></FontAwesomeIcon>
                            </div>
                            {comment.is_submitter || comment.distinguished === "moderator" ? (
                                <div
                                    className="p-1 text-sm font-bold text-green-600 cursor-pointer hover:underline"
                                    onClick={() => {
                                        history.push(`/user/${comment.author}`);
                                    }}
                                >
                                    {comment.author}
                                </div>
                            ) : (
                                <div
                                    className="p-1 text-sm font-bold cursor-pointer hover:underline"
                                    onClick={() => {
                                        history.push(`/user/${comment.author}`);
                                    }}
                                >
                                    {comment.author}
                                </div>
                            )}
                            {comment.distinguished ? <FontAwesomeIcon className="mt-1 mr-1 text-green-600" icon={faShieldVirus}></FontAwesomeIcon> : null}
                            {comment.is_submitter ? <FontAwesomeIcon className="mt-1 mr-1 text-green-600" icon={faMicrophone}></FontAwesomeIcon> : null}
                            {comment.edited ? <div className="pt-1 pb-1 pl-1 text-sm italic text-gray-500">edited</div> : null}
                            <div className="p-1 text-sm text-gray-500 cursor-pointer hover:underline">
                                {
                                    <>
                                        {Math.floor(Math.floor((new Date() - new Date(comment.created_utc * 1000)) / 1000) / 60) && Math.floor(Math.floor((new Date() - new Date(comment.created_utc * 1000)) / 1000) / 60) < 60 ? (
                                            <div>{Math.floor(Math.floor((new Date() - new Date(comment.created_utc * 1000)) / 1000) / 60)} minutes ago</div>
                                        ) : Math.floor(Math.floor(Math.floor((new Date() - new Date(comment.created_utc * 1000)) / 1000) / 60) / 60) && Math.floor(Math.floor(Math.floor((new Date() - new Date(comment.created_utc * 1000)) / 1000) / 60) / 60) < 24 ? (
                                            <div>{Math.floor(Math.floor(Math.floor((new Date() - new Date(comment.created_utc * 1000)) / 1000) / 60) / 60)} hours ago</div>
                                        ) : Math.floor(Math.floor(Math.floor(Math.floor((new Date() - new Date(comment.created_utc * 1000)) / 1000) / 60) / 60) / 24) ? (
                                            <div>{Math.floor(Math.floor(Math.floor(Math.floor((new Date() - new Date(comment.created_utc * 1000)) / 1000) / 60) / 60) / 24)} days ago</div>
                                        ) : null}
                                    </>
                                }
                            </div>
                            {comment.stickied ? <div className="p-1 text-sm font-bold text-green-600">Stickied comment</div> : null}
                        </div>
                        <div className="p-1 ml-2 text-sm">{ReactHtmlParser(ReactHtmlParser(comment.body_html))}</div>
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
                                <FontAwesomeIcon className="mt-1 cursor-pointer" icon={faCommentAlt} />
                                <div className="m-1 text-xs font-bold">Reply</div>
                            </div>
                        </div>
                        {nestedComments}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

const CommentsComponent = ({ comments }) => {
    return (
        <div>
            <div className="bg-white rounded w-160">
                {comments.map((comment) => {
                    return <Comment key={comment.id} className="pt-2 mt-2" comment={comment} />;
                })}
            </div>
        </div>
    );
};

export default CommentsComponent;
