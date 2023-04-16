import TaskCard from "../../cards/TaskCard";

function TaskPage() {
    return (
        <section className="w-full mt-20">
            <div className="container mx-auto text-center items-center">
                <h1 className="text-3xl font-bold text-center mt-32">Tasks For Today</h1>
                <button className="bg-blue-600 rounded-lg py-1 px-8 my-5" data-modal-target="create-task-modal" data-modal-toggle="create-task-modal">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="w-10 h-10 fill-white stroke-blue-600 mx-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>

                <TaskCard />

                <div className="w-10/12 lg:w-1/3 mx-auto py-5">
                    page links
                </div>
            </div>
        </section>
    )
}

export default TaskPage;