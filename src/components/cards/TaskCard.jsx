import { useContext, useState } from "react";
import ViewTaskModal from "../modals/tasks/ViewTaskModal";
import useAxios from "../../hooks/useAxios";
import BaseContext from "../../contexts/BaseContext";
import Spinner from "../loading/Spinner";
import EditTaskModal from "../modals/tasks/EditTaskModal";
import { ErrorConfirm } from "../alerts/Confirm";

function TaskCard({task, change}) {
    const [showViewTaskModal, setShowViewTaskModal] = useState();
    const [showEditTaskModal, setShowEditTaskModal] = useState();
    const [completeTaskLoading, setCompleteTaskLoading] = useState();
    const [deleteTaskLoading, setDeleteTaskLoading] = useState();
    const { client } = useAxios();
    const { apis, setErrors, setSuccess } = useContext(BaseContext);

    async function completeTask() {
        setCompleteTaskLoading(prev => true);
        await client.patch(`${apis.tasks.complete}/${task.id}`)
            .then((res) => {
                setSuccess(prev => res.data.success); 
                change(prev => 'task completed');
            })
            .catch((err) => {
                err && setErrors(prev => err.response.data.error);
            })
            .finally(() => {
                setTimeout(() => {
                    setSuccess(prev => null)
                    setErrors(prev => null)
                    setCompleteTaskLoading(prev => false);
                }, 1000);
            })
    }

    async function deleteTask() {
        setDeleteTaskLoading(prev => true);
        await client.delete(`${apis.tasks.destroy}/${task.id}`)
            .then((res) => {
                console.log(res)
                change(prev => 'task deleted');
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setTimeout(() => {
                    setDeleteTaskLoading(prev => false);
                }, 1000);
            })
    }

    return (
        <div className="w-10/12 lg:max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-8 mx-auto">
            
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task.title}</h5>
            
            <div className="flex justify-between mt-8">
                <button onClick={ () => setShowViewTaskModal(prev => true) } >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="w-10 h-10 stroke-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
                {
                    showViewTaskModal
                    &&
                    <ViewTaskModal task={task} show={showViewTaskModal} close={ setShowViewTaskModal } />
                }
                <button onClick={() => setShowEditTaskModal(prev => true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="w-10 h-10 stroke-orange-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>                      
                </button>
                {
                    showEditTaskModal
                    &&
                    <EditTaskModal task={task} show={showEditTaskModal} close={setShowEditTaskModal} />
                }

                {
                    !task.completed
                    &&
                    (
                        completeTaskLoading
                    ?
                        <Spinner />
                    :
                        <button onClick={completeTask}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" className="w-10 h-10 stroke-green-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    )
                }

                {
                    deleteTaskLoading
                ?
                    <Spinner />
                :
                    <>
                        <button onClick={deleteTask}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="w-10 h-10 stroke-red-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>                      
                        </button>

                        <ErrorConfirm />
                    </>
                }
            </div>

        </div>
    )
}

export default TaskCard;