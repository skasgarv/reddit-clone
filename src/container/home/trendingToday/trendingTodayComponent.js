import Axios from "axios";
import { useEffect, useState } from "react";

import MediaCard from "./cardComponent";

const TrendingTodayComponent = (props) => {
    const [trendingPosts, setTrendingPosts] = useState([]);
    const loading = props.loading;
    useEffect(() => {
        Axios.get("https://www.reddit.com/api/trending_searches_v1.json")
            .then((res) => {
                setTrendingPosts(
                    res.data.trending_searches.filter((trendingPost) => {
                        if (trendingPost.results.data.children.length) {
                            return trendingPost.results.data.children[0].data.thumbnail !== "default";
                        }
                        return null;
                    })
                );
            })
            .catch((err) => console.log("Unable to fetch trending posts: ", err));
    }, []);
    return (
        <div>
            {loading ? (
                <div className="container mx-auto animate-pulse">
                    <div className="flex mb-4">
                        <MediaCard></MediaCard>
                        <MediaCard></MediaCard>
                    </div>
                </div>
            ) : (
                <div className="container mx-auto">
                    <div className="m-1" align="left">
                        Trending Today
                    </div>
                    <div className="flex mb-4">
                        {trendingPosts.slice(0, 4).map((trendingPost) => (
                            <MediaCard key={trendingPost.query_string} trendingPost={trendingPost}></MediaCard>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrendingTodayComponent;
