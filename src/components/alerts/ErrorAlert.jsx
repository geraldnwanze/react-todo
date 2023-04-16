import { toast } from "react-toastify";

function ErrorAlert(props) {
    return (props.errors).map(message => toast.error(message));
}

export default ErrorAlert;