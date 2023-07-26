import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const AlertMessage = ({ open, message, onClose, severity }) => {
  return (
    <Snackbar open={open} autoHideDuration={3000}>
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={onClose}
        severity={severity}
        anchororigin={("bottom", "left")}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default AlertMessage;
