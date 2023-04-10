import BaseContext from "../contexts/base";

const links = {
    home: "/",
    login: "/auth/login",
    tasks: {
        home: "/tasks",
        search: "/tasks/search"
    },
    api: {
        base_url: "http://todo.test/api/v1",
        auth: {
            login: "/auth/login"
        }
    }
}

const app = {
    name: "Todo App"
}

function BaseProvider(props) {
    return (
        <BaseContext.Provider value={{links, app}}>
            {props.children}
        </BaseContext.Provider>
    )
}

export default BaseProvider;