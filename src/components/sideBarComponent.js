const SideBarComponent = ({ sideBarLoading, subRedditInfo }) => {
    return (
        <div>
            {sideBarLoading ? (
                <div>
                    <div className="mx-auto animate-pulse">
                        <div className="flex">
                            <div className="relative h-auto w-80">
                                <div className="h-10 p-2 font-semibold text-left text-white bg-gradient-to-r from-blue-600 via-blue-400 to-green-300">About Community</div>
                                <div className="bg-white"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div>
                        <div className="mx-auto">
                            <div className="flex">
                                <div className="relative h-auto w-80">
                                    <div className="h-10 p-2 font-semibold text-left text-white bg-gradient-to-r from-blue-600 via-blue-400 to-green-300">About Community</div>
                                    <div className="bg-white">
                                        <div className="pt-2 pl-2 text-left">{subRedditInfo.publicDescription}</div>
                                        <div className="flex pl-2 mt-3 mb-3 ml-2 text-center bg-white">
                                            <div className="mr-8 font-semibold">
                                                <div className="text-left">{subRedditInfo.subscribers}</div> <div>Members</div>
                                            </div>
                                            <div className="font-semibold">
                                                <div className="text-left">{subRedditInfo.accountsActive}</div> <div>Online</div>
                                            </div>
                                        </div>
                                        <div className="m-2 border-t-2 border-gray-300"></div>
                                        <div className="flex pb-2 pl-2 mt-2 text-sm font-semibold text-left">Created {subRedditInfo.created}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SideBarComponent;
