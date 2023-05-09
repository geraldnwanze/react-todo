import { useContext } from "react";
import BaseContext from "../../contexts/BaseContext";
import { Link } from "react-router-dom";

function Pagination() {
    const { pagination } = useContext(BaseContext);
    console.log(pagination)

    const links = pagination && pagination.links.map((link, key) => (
        <li key={key}>
            <Link to={link.url} aria-current={link.active} className="px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" >{ link.label }</Link>
        </li>
    ))

    return (
        <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px">
                {
                    pagination

                    &&
                    
                    { links }
                }
            </ul>
        </nav>
    )
}

export default Pagination;