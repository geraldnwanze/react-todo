import { toast } from "react-toastify";

function SuccessAlert(props) {
    return toast.success(props.success);
}

export default SuccessAlert;