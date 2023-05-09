import { useContext, useState } from "react";
import BaseContext from "../../../contexts/BaseContext";
import useAxios from "../../../hooks/useAxios";
import Spinner from "../../loading/Spinner";

function CreateTaskModal({change, show, close}) {
    const [createTaskForm, setCreateTaskForm] = useState({title: "", description: "", date: "", start: "", end: ""});
    const [loading, setLoading] = useState(false);
    const { client } = useAxios();
    const { apis, setErrors, setSuccess } = useContext(BaseContext);

    function handleInput(e) {
        const {name, value} = e.target;
        setCreateTaskForm(prev => ({
            ...prev,
            [name] : value
        }))
    }

    async function storeTask(e) {
        e.preventDefault();
        setLoading(prev => true);
        await client.post(apis.tasks.store, createTaskForm)
            .then((res) => {
                if (res.status === 201) {
                    setSuccess(prev => "task created");
                    change(prev => "task created");
                }
            })
            .catch((err) => {
                if (err) {
                    setErrors(prev => err.response.data.errors);
                }
            })
            .finally(() => {
                setTimeout(() => {
                    setSuccess(prev => null);
                    setErrors(prev => null);
                    setLoading(prev => false)
                    close(prev => false)
                }, 2000);
            })
    }

    return (
        <div id="create-task-modal" tabIndex="-1" aria-hidden="true" className={ show ? "fixed top-10 lg:top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full justify-center items-center flex" : "fixed top-10 lg:top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full justify-center items-center" } role={ show && "dialog"} aria-modal={ show && "true"}>
            <div className="relative w-full h-full max-w-md md:h-auto">
                
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-900">
                    <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-900 dark:hover:text-white" onClick={() => close(prev => false)}>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create A New Task</h3>
                        <form className="space-y-6" method="POST">
                            
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input type="text" name="title" id="title" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" placeholder="title" required value={ createTaskForm.title } onChange={ (e) => handleInput(e) } />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea name="description" rows="5" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" onChange={(e) =>handleInput(e)} value={ createTaskForm.description }></textarea>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                                <input type="date" name="date" id="date" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" placeholder="date" value={ createTaskForm.date } onChange={ (e) => handleInput(e) } />
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start</label>
                                    <input type="time" name="start" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" placeholder="Start" required value={ createTaskForm.start } onChange={ (e) => handleInput(e) } />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End</label>
                                    <input type="time" name="end" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" placeholder="End" required value={ createTaskForm.end } onChange={ (e) => handleInput(e) } />
                                </div>
                            </div>
                            {
                                loading
                                ?
                                <Spinner />
                                :
                                <button onClick={storeTask} type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div> 
  
    )
}

export default CreateTaskModal;