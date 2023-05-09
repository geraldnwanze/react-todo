import { toast } from "react-toastify";

function SuccessAlert(props) {
    return toast.success(props.success, { autoClose: 2000 });
}

export default SuccessAlert;