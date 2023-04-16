import { useContext } from "react";
import BaseContext from "../../contexts/BaseContext";
import 'react-toastify/dist/ReactToastify.css';
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";

function Alert()
{
    const {errors, success} = useContext(BaseContext);
    
    if (errors) {
        return <ErrorAlert errors={errors} />
    }

    if (success) {
        return <SuccessAlert success={success} />
    }

}

export default Alert;
