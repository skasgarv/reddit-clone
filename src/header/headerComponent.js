import React from "react";

import history from "../history";
import RedditLogo from "../Webp.net-resizeimage.png";

const HeaderComponent = () => {
    // useEffect(() => {
    //     let active = true;

    //     if (!loading) {
    //         return undefined;
    //     }

    //     // Trending topics
    //     (async () => {
    //         const response = await fetch("https://country.register.gov.uk/records.json?page-size=5000");
    //         const countries = await response.json();

    //         if (active) {
    //             setOptions(Object.keys(countries).map((key) => countries[key].item[0]));
    //         }
    //     })();

    //     return () => {
    //         active = false;
    //     };
    // }, [loading]);

    // React.useEffect(() => {
    //     if (!open) {
    //         setOptions([]);
    //     }
    // }, [open]);



    const handleSubmit = (evt) => {
        evt.preventDefault();
        history.push("/search/?q=" + evt.target[0].value)
    }

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
                <button className="inline-block w-32 py-2 m-2 text-xs font-bold text-center text-blue-500 uppercase border focus:outline-none rounded-3xl hover:bg-blue-50" onClick={() => history.push("/login")}>Login</button>
                <button className="inline-block w-32 py-2 m-2 text-xs font-bold text-center text-white uppercase bg-blue-500 border border-blue-500 focus:outline-none rounded-3xl hover:bg-blue-400"  onClick={() => history.push("/signUp")}>Sign Up</button>
            </div>
        </div>
        // <div>
        //     <nav className="navbar navbar-expand-lg navbar-light bg-light">
        //         <img src={logo} onClick={() => history.push("/")}></img>

        //         <Downshift onChange={downshiftOnChange} itemToString={(item) => (item ? item.title : "")} style={{ width: 800 }}>
        //             {({ selectedItem, getInputProps, getItemProps, highlightedIndex, isOpen, inputValue, getLabelProps }) => (
        //                 <div>
        //                     <input
        //                         {...getInputProps({
        //                             placeholder: "Search movies",
        //                             onChange: inputOnChange,
        //                             // onClick: fetchMovies("")
        //                         })}
        //                     />
        //                     {isOpen ? (
        //                         <div className="downshift-dropdown">
        //                             {movies
        //                                 .filter((item) => !inputValue || item.title.toLowerCase().includes(inputValue.toLowerCase()))
        //                                 .slice(0, 10)
        //                                 .map((item, index) => (
        //                                     <div
        //                                         className="dropdown-item"
        //                                         {...getItemProps({ key: index, index, item })}
        //                                         style={{
        //                                             backgroundColor: highlightedIndex === index ? "lightgray" : "white",
        //                                             fontWeight: selectedItem === item ? "bold" : "normal",
        //                                         }}
        //                                     >
        //                                         {item.title}
        //                                     </div>
        //                                 ))}
        //                         </div>
        //                     ) : null}
        //                 </div>
        //             )}
        //         </Downshift>

        //         {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //             <Autocomplete
        //                 id="asynchronous-demo"
        //                 style={{ width: 800 }}
        //                 open={open}
        //                 onInputChange={inputChanged}
        //                 onOpen={() => {
        //                     setOpen(true);
        //                 }}
        //                 // onFocus={() => {
        //                 //     setOpen(true);
        //                 // }}
        //                 onClose={() => {
        //                     console.log("yes")
        //                     setOpen(false);
        //                 }}
        //                 getOptionSelected={(option, value) => option.name === value.name}
        //                 getOptionLabel={(option) => option.name}
        //                 options={options}
        //                 renderInput={(params) => (
        //                     <TextField
        //                         {...params}
        //                         label="Search"
        //                         variant="outlined"
        //                         InputProps={{
        //                             ...params.InputProps,
        //                             endAdornment: <React.Fragment>{loading ? <CircularProgress color="inherit" size={20} /> : null}</React.Fragment>,
        //                         }}
        //                     />
        //                 )}
        //             />
        //         </div> */}
        //         <button className="mr-2 btn btn-outline-primary btn-light" type="button">
        //             LOG IN
        //         </button>
        //         <button className="mr-5 btn btn-primary" type="button">
        //             SIGN UP
        //         </button>
        //     </nav>
        // </div>
    );
};

export default HeaderComponent;
