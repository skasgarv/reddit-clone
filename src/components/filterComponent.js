import { faHotjar } from "@fortawesome/free-brands-svg-icons";
import { faCertificate, faChartLine, faSignal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const FilterComponent = (props) => {
    const [selectButtonValue, setSelectButtonValue] = useState("");
    const buttonArray = [
        { value: "new", icon: faCertificate },
        { value: "top", icon: faSignal },
        { value: "rising", icon: faChartLine },
    ];
    return (
        <div className="container">
            <div className="flex h-12 bg-white rounded w-160">
                {selectButtonValue === "hot" || selectButtonValue === "" ? (
                    <button className="px-4 pl-2 pr-2 m-2 font-bold text-blue-500 bg-gray-300 cursor-not-allowed rounded-3xl focus:outline-none focus:bg-gray-300">
                        <div className="text-blue-600">
                            <FontAwesomeIcon className="mr-1" icon={faHotjar} /> Hot
                        </div>
                    </button>
                ) : (
                    <button
                        className="px-4 pl-2 pr-2 m-2 font-bold text-blue-500 bg-gray-100 hover:bg-gray-300 rounded-3xl focus:outline-none focus:bg-gray-300"
                        onClick={() => {
                            setSelectButtonValue("hot");
                            props.filterClicked("hot");
                        }}
                    >
                        <div className="text-blue-600">
                            <FontAwesomeIcon className="mr-1" icon={faHotjar} /> Hot
                        </div>
                    </button>
                )}
                {buttonArray.map((button) =>
                    selectButtonValue === button.value ? (
                        <button key={button.value} className="px-4 pl-2 pr-2 m-2 font-bold text-blue-500 bg-gray-300 cursor-not-allowed rounded-3xl focus:outline-none focus:bg-gray-300">
                            <div className="text-blue-600">
                                <FontAwesomeIcon className="mr-1" icon={button.icon} /> {button.value.charAt(0).toUpperCase() + button.value.slice(1)}
                            </div>
                        </button>
                    ) : (
                        <button key={button.value}
                            className="px-4 pl-2 pr-2 m-2 font-bold text-blue-500 bg-gray-100 hover:bg-gray-300 rounded-3xl focus:outline-none focus:bg-gray-300"
                            onClick={() => {
                                setSelectButtonValue(button.value);
                                props.filterClicked(button.value);
                            }}
                        >
                            <div className="text-blue-600">
                                <FontAwesomeIcon className="mr-1" icon={button.icon} /> {button.value.charAt(0).toUpperCase() + button.value.slice(1)}
                            </div>
                        </button>
                    )
                )}
            </div>
        </div>
    );
};

export default FilterComponent;
