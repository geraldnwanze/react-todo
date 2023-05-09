import { useContext, useEffect, useState } from "react";
import TaskCard from "../../cards/TaskCard";
import BaseContext from "../../../contexts/BaseContext";
import Skeleton from "../../loading/Skeleton";
import useAxios from "../../../hooks/useAxios";
import CreateTaskModal from "../../modals/tasks/CreateTaskModal";

function TaskPage() {
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState(null);
    const [taskChanged, setTaskChanged] = useState(null);
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
    const { apis, setErrors, setPagination } = useContext(BaseContext);
    const { client } = useAxios();

    useEffect(() => {
        getTasks();
    }, [taskChanged])

    async function getTasks() {
        setLoading(prev => true);
        await client.get(apis.tasks.index)
            .then((res) => {
                if (res) {
                    setTasks(prev => res.data.data);
                    setPagination(prev => res.data.meta);
                }
            })
            .catch((err) => {
                if (err) {
                    setErrors(prev => err.response.data.error)
                }
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(prev => false);
                    setErrors(prev => null);
                }, 2000);
            })
    }

    const taskList = tasks ? tasks.map((task, key) => (<TaskCard key={key} task={task} change={setTaskChanged} />)) : <h1 className="text-xl font-bold">No Tasks For Today</h1>

    return (
        
        <section className="w-full mt-20">
            <div className="container mx-auto text-center items-center">
                <h1 className="text-3xl font-bold text-center mt-32">Tasks For Today</h1>
                <button className="bg-blue-600 rounded-lg py-1 px-8 my-5" onClick={() => setShowCreateTaskModal(prev => true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="w-10 h-10 fill-white stroke-blue-600 mx-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>

                { showCreateTaskModal && <CreateTaskModal change={setTaskChanged} show={showCreateTaskModal} close={setShowCreateTaskModal} /> }
        
                { 
                    loading 
                    ?

                    <Skeleton />

                    :

                    taskList
                }

                <div className="w-10/12 lg:w-1/3 mx-auto py-5">
                    
                </div>
            </div>
        </section>
    )
}

export default TaskPage;