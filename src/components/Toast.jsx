import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import parse from "html-react-parser";


const Toast = {
  success: (message) => {
    toast.success(<div dangerouslySetInnerHTML={{ __html: message }} />, {
      progressStyle: { backgroundColor: "#4caf50" }, // Green progress bar
    });
  },
  error: (message) => {
    toast.error(<div dangerouslySetInnerHTML={{ __html: message }} />, {
      progressStyle: { backgroundColor: "#f44336" }, // Red progress bar
    });
  },

  warning: (message) => {
    toast.warning(<div dangerouslySetInnerHTML={{ __html: message }} />, {
      progressStyle: { backgroundColor: "#ff9800" }, // Orange progress bar
    });
  },
  info: (message) => {
    toast.info(<div dangerouslySetInnerHTML={{ __html: message }} />, {
      progressStyle: { backgroundColor: "#2196f3" }, // Blue progress bar
    });
  },
  default: (message) => {
    toast(<div dangerouslySetInnerHTML={{ __html: message }} />);
  },
  callBack: {
    warning: (message, options = {}) => {
      const { onConfirm, onCancel } = options; // Get optional callbacks

      const toastId = toast.warning(
        <div>
          <p>{parse(message)}</p>
          {onConfirm && onCancel && ( // Only show buttons if actions exist
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button onClick={() => { toast.dismiss(toastId); onConfirm(); }} style={yesButtonStyle}>Yes</button>
              <button onClick={() => { toast.dismiss(toastId); onCancel(); }} style={noButtonStyle}>No</button>
            </div>
          )}
        </div>,
        { autoClose: false, closeOnClick: false, draggable: false }
      );
    },
    info: (message, options = {}) => {
      const { onConfirm, onCancel } = options; // Get optional callbacks

      const toastId = toast.info(
        <div>
          <p>{parse(message)}</p>
          {onConfirm && onCancel && ( // Only show buttons if actions exist
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button onClick={() => { toast.dismiss(toastId); onConfirm(); }} style={yesButtonStyle}>Yes</button>
              <button onClick={() => { toast.dismiss(toastId); onCancel(); }} style={noButtonStyle}>No</button>
            </div>
          )}
        </div>,
        { autoClose: false, closeOnClick: false, draggable: false }
      );
    },
  }
};


const yesButtonStyle = {
  padding: "4px 26px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  backgroundColor: "#f44336", // Red for "Yes"
  color: "white",
  marginLeft: "10px"
};

const noButtonStyle = {
  padding: "4px 26px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  backgroundColor: "#4caf50", // Green for "No"
  color: "white",
};

// Export both Toast and ToastContainer
export { Toast, ToastContainer };