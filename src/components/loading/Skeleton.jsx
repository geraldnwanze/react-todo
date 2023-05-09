function Skeleton() {
    return (
        <div role="status" className="w-10/12 lg:max-w-lg mx-auto animate-pulse bg-gray-200 p-6 rounded-lg my-8">
            <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-6 mx-auto"></div>
            <div className="flex justify-between">
                <div className="h-10 w-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="h-10 w-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="h-10 w-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="h-10 w-10 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default Skeleton;