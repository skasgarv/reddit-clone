import MediaCard from "./cardComponent";

const TrendingTodayComponent = () => {
    return (
        <div className="container mx-auto">
            <div className="m-1" align="left">
                Trending Today
            </div>
            <div className="flex mb-4">
                <MediaCard></MediaCard>
                <MediaCard></MediaCard>
                <MediaCard></MediaCard>
                <MediaCard></MediaCard>
            </div>
        </div>
    );
};

export default TrendingTodayComponent;
