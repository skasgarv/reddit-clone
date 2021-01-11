import React from "react";

import DetailsComponent from "../shared/detailsComponent/detailsComponent";
import TrendingTodayComponent from "./trendingToday/trendingTodayComponent";

const HomeComponent = () => {
    return (
        <div className="p-12 mx-auto">
            <TrendingTodayComponent></TrendingTodayComponent>
            <DetailsComponent></DetailsComponent>
        </div>
    );
};

export default HomeComponent;
