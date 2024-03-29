import Axios from "axios";
import { useEffect, useState } from "react";

import TrendingTodayCard from "./trendingTodayCardComponent";

const TrendingTodayComponent = () => {
    const [trendingPosts, setTrendingPosts] = useState([]);
    const [loading, setLoading] = useState(true);
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
                setLoading(false);
            })
            .catch((err) => console.error("Unable to fetch trending posts: ", err));
    }, []);
    return (
        <div>
            {loading ? (
                <div className="container mx-auto animate-pulse">
                    <div className="flex mb-4">
                        <TrendingTodayCard></TrendingTodayCard>
                        <TrendingTodayCard></TrendingTodayCard>
                    </div>
                </div>
            ) : (
                <div className="container mx-auto">
                    <div className="m-1 mt-2 text-sm font-semibold" align="left">
                        Trending Today
                    </div>
                    <div className="flex mb-4">
                        {trendingPosts.slice(0, 4).map((trendingPost) => (
                            <TrendingTodayCard key={trendingPost.query_string} trendingPost={trendingPost}></TrendingTodayCard>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrendingTodayComponent;
