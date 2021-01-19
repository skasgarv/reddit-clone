import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import history from "../../history";

const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");

const PendingComponent = () => {
    return (
        <div className="p-12">
            <div className="m-8 text-xl">
                <FontAwesomeIcon className="mr-1" icon={faExclamationTriangle}></FontAwesomeIcon>
                To be implemented!
                <div>
                    <button className="inline-block w-32 py-2 m-2 text-xs font-bold text-center text-white uppercase bg-blue-500 border border-blue-500 focus:outline-none rounded-3xl hover:bg-blue-400" onClick={() => history.push("/")}>
                        Go Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PendingComponent;
