import { toast } from "react-toastify";

function ErrorAlert(props) {
    return (props.errors).map(message => toast.error(message, { autoClose: 5000 }));
}

export default ErrorAlert;