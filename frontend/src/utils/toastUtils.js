import { toast } from "react-toastify";

const notifySuccess = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // style: { 
        //     background: "rgba(255, 255, 255, 0.5)", // Semi-transparent black
        //     color: "black" // White text for visibility
        // }
    });
};

const notifyError = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

export { notifySuccess, notifyError};