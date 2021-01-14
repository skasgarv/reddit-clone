import React from "react";

import history from "../history";
import RedditLogo from "../Webp.net-resizeimage.png";

const HeaderComponent = () => {
    const handleSubmit = (evt) => {
        evt.preventDefault();
        history.push("/search/?q=" + evt.target[0].value);
    };

    return (
        <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 bg-white">
            {/* Logo */}
            <div className="flex items-center">
                <img className="h-8 pl-2 cursor-pointer" alt="Reddit Logo" src={RedditLogo} onClick={() => history.push("/")}></img>
            </div>

            {/* Search */}
            <div className="flex items-center mx-auto">
                <form onSubmit={handleSubmit}>
                    <input className="bg-gray-100 border-2 rounded w-160 hover:border-blue-500 hover:bg-white" placeholder=" Search"></input>
                </form>
            </div>

            {/* Sign up and Sign in */}
            <div className="flex items-center">
                <button className="inline-block w-32 py-2 m-2 text-xs font-bold text-center text-blue-500 uppercase border focus:outline-none rounded-3xl hover:bg-blue-50" onClick={() => history.push("/login")}>
                    Login
                </button>
                <button className="inline-block w-32 py-2 m-2 text-xs font-bold text-center text-white uppercase bg-blue-500 border border-blue-500 focus:outline-none rounded-3xl hover:bg-blue-400" onClick={() => history.push("/signUp")}>
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default HeaderComponent;
