import React from "react";

import history from "../../history";


const SignUpComponent = () => {
    
    return (
        <div className="flex">
        <div className='p-12 w-40 h-screen bg-left bg-cover' style= {{backgroundImage: "url('./LoginImage.jpg')"}}>
        </div>
        <div className='p-10 w-80'>
            <div className="flex flex-col justify-center pt-12">
                <h1 className="text-lg text-bold mb-2">Sign Up</h1>
                <p className="mb-10 text-xs">By continuing, you agree to our User Agreement and Privacy Policy.</p>
            </div>
            <form>
            <div className="mb-2">
                <input type="text"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-400 rounded"
                placeholder="Email ID" />
            </div>
            <div className="mb-2">
                <input type="text"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-400 rounded"
                placeholder="Username" />
            </div>
            <div className="mb-2">
                <input type="password"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-400 rounded"
                placeholder="Password" />
            </div>
            <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border-blue-500 rounded" >
                Login
            </button>
            </form>
            <small>
                Already a readitor?
                    <a className="ml-1 text-blue-500 uppercase cursor-pointer " onClick={() => history.push("/login")}><span className="text-blue-500 ">Login</span></a>              
            </small>
        </div>
        </div>

    )

}

export default SignUpComponent;

