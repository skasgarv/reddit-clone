/**
 * This component will contain
 * 1. filter for hot, new and top.
 * 2. iterate over topics and display in card
 * 3. side details which will read the prop sent by parent component and display that component accordingly.
 */

import { faArrowCircleDown, faArrowCircleUp, faBookmark, faCommentAlt, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import history from "../../../history";

const DetailsComponent = (props) => {
    /**
     * id
     * subreddit_name_prefixed
     * author
     * permalink
     * created_utc
     * thumbnail
     * title
     * url
     * preview
     * num_comments
     * score
     */
    const posts = props.posts;
    const loading = props.loading;

    return (
        <div>
            {loading ? (
                <div className="container mx-auto animate-pulse w-160 sm:w-100">
                    <div>
                        <div className="flex mb-4 bg-white border-2 rounded hover:border-gray-300 h-96">
                            <div className="w-10 text-center bg-gray-50 rounded-l-r">
                                <div>
                                    <FontAwesomeIcon className="mt-3 ml-1 mr-1 cursor-pointer" icon={faArrowCircleUp} />
                                </div>
                                <div>
                                    <FontAwesomeIcon className="ml-1 mr-1 cursor-pointer" icon={faArrowCircleDown} />
                                </div>
                            </div>
                            <div className="w-full"></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container flex mx-auto">
                    {/* Post cards */}
                    <div className="w-160 sm:w-100">
                        {posts.map((post) => (
                            <div key={post.id} className="flex mb-4 bg-white border-2 rounded hover:border-gray-300">
                                <div className="w-10 text-center bg-gray-50 rounded-l-r">
                                    <div>
                                        <FontAwesomeIcon className="mt-3 ml-1 mr-1 cursor-pointer" icon={faArrowCircleUp} />
                                    </div>
                                    <div className="m-1 text-xs font-bold">{post.score}</div>
                                    <div>
                                        <FontAwesomeIcon className="ml-1 mr-1 cursor-pointer" icon={faArrowCircleDown} />
                                    </div>
                                </div>
                                <div className="w-full">
                                    {/* Show avatar, sub reddit data, posted by and time */}
                                    <div className="flex items-center">
                                        {post.isSponsored ? (
                                            <p className="p-1 text-xs text-blue-500">PROMOTED</p>
                                        ) : (
                                            <div className="flex">
                                                <img className="w-10 mr-2 border rounded"></img>
                                                <p className="text-xs font-bold cursor-pointer hover:underline" onClick={() => history.push(`${post.subreddit_name_prefixed}`)}>
                                                    {post.subreddit_name_prefixed}
                                                </p>
                                            </div>
                                        )}

                                        <p className="p-1 text-xs text-gray-500">• Posted by</p>
                                        <p className="pt-1 pb-1 pr-1 text-xs text-gray-500 cursor-pointer hover:underline" onClick={() => history.push(`/u/${post.author}`)}>
                                            u/{post.author}
                                        </p>
                                        <div className="p-1 text-xs text-gray-500 cursor-pointer hover:underline" onClick={() => history.push(`/subRedditDetails${post.permalink}`)}>
                                            {
                                                <>
                                                    {Math.floor(Math.floor((new Date() - new Date(post.created_utc * 1000)) / 1000) / 60) && Math.floor(Math.floor((new Date() - new Date(post.created_utc * 1000)) / 1000) / 60) < 60 ? (
                                                        <div>{Math.floor(Math.floor((new Date() - new Date(post.created_utc * 1000)) / 1000) / 60)} minutes ago</div>
                                                    ) : Math.floor(Math.floor(Math.floor((new Date() - new Date(post.created_utc * 1000)) / 1000) / 60) / 60) && Math.floor(Math.floor(Math.floor((new Date() - new Date(post.created_utc * 1000)) / 1000) / 60) / 60) < 24 ? (
                                                        <div>{Math.floor(Math.floor(Math.floor((new Date() - new Date(post.created_utc * 1000)) / 1000) / 60) / 60)} hours ago</div>
                                                    ) : Math.floor(Math.floor(Math.floor(Math.floor((new Date() - new Date(post.created_utc * 1000)) / 1000) / 60) / 60) / 24) ? (
                                                        <div>{Math.floor(Math.floor(Math.floor(Math.floor((new Date() - new Date(post.created_utc * 1000)) / 1000) / 60) / 60) / 24)} days ago</div>
                                                    ) : null}
                                                </>
                                            }
                                        </div>
                                    </div>
                                    {/* Show Title and Post details */}
                                    <div className="flex">
                                        {post.thumbnail === "self" || post.thumbnail === "default" ? (
                                            <>
                                                <div className="m-2 text-lg font-semibold text-left">
                                                    <div className="cursor-pointer" onClick={() => history.push(`/subRedditDetails${post.permalink}`)}>
                                                        {post.title}
                                                    </div>
                                                    <div className="mt-2 text-xs font-semibold text-left text-blue-500 cursor-pointer hover:underline" onClick={() => window.open(post.url)}>
                                                        {post.url ? post.url.length > 40 ? <div>{post.url.substring(0, 30) + "..."}</div> : <div>{post.url}</div> : null}
                                                    </div>
                                                    <br></br>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {post.preview && post.preview.enabled ? null : (
                                                    <>
                                                        <div className="m-2 text-lg font-semibold text-left w-250">
                                                            <div className="cursor-pointer" onClick={() => history.push(`/subRedditDetails${post.permalink}`)}>
                                                                {post.title}
                                                            </div>
                                                            <div className="mt-2">
                                                                {post.url ? (
                                                                    post.url.length > 40 ? (
                                                                        <div className="text-xs font-semibold text-left text-blue-500 cursor-pointer hover:underline" onClick={() => window.open(post.url)}>{post.url.substring(0, 30) + "..."}</div>
                                                                    ) : (
                                                                        <div className="text-xs font-semibold text-left text-blue-500 cursor-pointer hover:underline" onClick={() => window.open(post.url)}>
                                                                            {post.url}
                                                                        </div>
                                                                    )
                                                                ) : null}
                                                            </div>
                                                            <br></br>
                                                        </div>
                                                        <div className="m-2">
                                                            <img src={post.thumbnail} alt="post_thumbnail" className="border-2 border-blue-500 rounded" onClick={() => window.open(post.url)}></img>
                                                        </div>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>

                                    <div>
                                        {post.thumbnail !== "self" && post.thumbnail !== "default" && post.preview ? (
                                            post.preview.enabled ? (
                                                <>
                                                    <div className="cursor-pointer" onClick={() => history.push(`/subRedditDetails${post.permalink}`)}>
                                                        <div className="w-full m-2 text-lg font-semibold text-left">{post.title}</div>
                                                        <div className="m-2">
                                                            <img src={post.url} alt="post_thumbnail" className="mx-auto border-2 w-250"></img>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : null
                                        ) : null}
                                    </div>

                                    {/* Show Comments icon */}

                                    <div className="flex p-1">
                                        <div className="p-1 text-sm font-bold text-gray-500 rounded cursor-pointer hover:bg-gray-200" onClick={() => history.push(`/subRedditDetails${post.permalink}`)}>
                                            <FontAwesomeIcon className="mr-1" icon={faCommentAlt} />
                                            <span className="font-bold">{post.num_comments} Comments</span>
                                        </div>
                                        <div className="p-1 text-sm font-bold text-gray-500 rounded cursor-pointer hover:bg-gray-200" onClick={() => history.push(`/r/${post.name}`)}>
                                            <FontAwesomeIcon className="mr-1" icon={faShare} />
                                            <span className="font-bold">Share</span>
                                        </div>
                                        <div className="p-1 text-sm font-bold text-gray-500 rounded cursor-pointer hover:bg-gray-200" onClick={() => history.push(`/r/${post.name}`)}>
                                            <FontAwesomeIcon className="mr-1" icon={faBookmark} />
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
            )}
        </div>
    );
};

export default DetailsComponent;
