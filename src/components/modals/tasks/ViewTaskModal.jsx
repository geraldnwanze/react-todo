function ViewTaskModal({task, show, close}) {

    return (
        
        <div tabIndex="-1" aria-hidden="true"
            className={ 
                show 
                ? 
                "fixed top-20 lg:top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full justify-center items-center flex" 
                : 
                "fixed top-20 lg:top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full justify-center items-center hidden" 
                }

                role={ show && "dialog"}
        >
            <div className="relative w-full h-full max-w-2xl md:h-auto">
                
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                    
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {task.title}
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={ () => close(prev => false) }>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    
                    <div className="p-6 space-y-6">
                        <p className="text-base leading-relaxed text-white dark:text-white text-center">
                            {task.description ? task.description : 'No Description'}
                        </p>
                    </div>
                    
                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600 justify-between text-white">
                        <span>{ task.start }</span>
                        <span>{ task.end }</span>
                    </div>
                </div>
            </div>
        </div>
         
    )
}

export default ViewTaskModal;