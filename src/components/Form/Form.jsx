import { useCallback, useEffect, useReducer, useState } from "react";
import {
  Button,
  TextField,
  Box,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormHelperText,
  CircularProgress,
  Paper,
} from "@mui/material";
import { v4 as uuidV4 } from "uuid";
import MultipleSelect from "./MultipleSelect";
import { green, pink } from "@mui/material/colors";
import usePostUserInfo from "../../hooks/usePostUserInfo";
import useFetchUserInfo from "../../hooks/useFetchUserInfo";
import useUpdateUserInfo from "../../hooks/useUpdateUserInfo";
import AlertMessage from "../../utility/Alert";

const initialState = {
  id: "",
  name: "",
  jobSector: [],
  agreeToTerms: false,
};

const Form = ({ setNewUser, currentID, setCurrentID }) => {
  const [userInfo, setUserInfo] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    initialState
  );

  const [error, setError] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      name: false,
      jobSector: false,
      agreeToTerms: false,
    }
  );

  const [sectorName, setSectorName] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showUpdateSuccessMessage, setShowUpdateSuccessMessage] =
    useState(false);

  const {
    postUserInfo,
    loading,
    success,
    error: postError,
  } = usePostUserInfo();

  const {
    user,
    loading: userLoading,
    error: userError,
  } = useFetchUserInfo(currentID);

  const {
    updateUserInfo,
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = useUpdateUserInfo();

  const clear = useCallback(() => {
    setCurrentID(0);
    setUserInfo({ id: "", name: "", jobSector: [], agreeToTerms: false });
  }, [setCurrentID]);

  useEffect(() => {
    if (user?.length === 0) clear();
    if (user?.length > 0) {
      setUserInfo(user[0]);
      setSectorName(user[0].jobSector);
    }
  }, [clear, user]);

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  const handleInputChange = (e, checked) => {
    const { name, value } = e.target;

    setUserInfo({
      id: uuidV4(),
      [name]: name === "agreeToTerms" ? checked : value,
    });
  };

  const updateSectorName = (selectedSectors) => {
    setUserInfo({ jobSector: selectedSectors });
    setError({ jobSector: false });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (
      userInfo.name.trim() === "" ||
      userInfo.jobSector.length < 1 ||
      !userInfo.agreeToTerms
    ) {
      if (userInfo.name.trim() === "") {
        setError({ name: true });
      }
      if (userInfo.jobSector.length < 1) {
        setError({ jobSector: true });
      }
      if (!userInfo.agreeToTerms) {
        setError({ agreeToTerms: true });
      }
      return;
    }

    let savedData;

    if (currentID === 0) {
      savedData = await postUserInfo(userInfo);
      if (savedData) setShowSuccessMessage(true);
    } else {
      savedData = await updateUserInfo(userInfo);
      if (savedData) setShowUpdateSuccessMessage(true);
    }

    if (savedData) {
      setNewUser(savedData);
      setSectorName([]);
      clear();
    } else {
      console.error("Failed to save user data");
    }
  };

  return (
    <Paper sx={{ padding: "10px" }}>
      <form onSubmit={handleSave} autoComplete="off">
        <TextField
          label="Name"
          value={userInfo.name}
          name="name"
          onChange={(e) => {
            handleInputChange(e);
            setError({ name: false });
          }}
          error={error.name}
          helperText={error?.name ? "Name is required" : ""}
          fullWidth
          margin="normal"
        />
        <MultipleSelect
          onUpdateSectorName={updateSectorName}
          sectorName={sectorName}
          setSectorName={setSectorName}
          error={error}
        />
        <FormControl error={error.agreeToTerms} required margin="normal">
          <FormControlLabel
            label="Agree To Terms"
            control={
              <Checkbox
                checked={userInfo.agreeToTerms}
                onChange={(e) => {
                  handleInputChange(e, e.target.checked);
                  setError({ agreeToTerms: false });
                }}
                name="agreeToTerms"
                sx={{
                  color: pink[800],
                  "&.Mui-checked": {
                    color: pink[600],
                  },
                }}
              />
            }
          />
          {error?.agreeToTerms && (
            <FormHelperText>You Need To Agree The Terms Of Use</FormHelperText>
          )}
        </FormControl>

        <Box sx={{ mt: 1, position: "relative" }}>
          <Button
            type="submit"
            variant="contained"
            style={{ background: " #4e54c8", fontWeight: "bold" }}
            fullWidth
            disableElevation
            sx={buttonSx}
            disabled={loading || updateLoading}
          >
            {currentID === 0
              ? success
                ? "Saved"
                : "Save"
              : updateSuccess
              ? "Updated"
              : "Update"}
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: green[500],
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </form>
      <AlertMessage
        open={showSuccessMessage}
        onClose={() => setShowSuccessMessage(false)}
        message={"User Added Successfully!"}
        severity="success"
      />
      <AlertMessage
        open={showUpdateSuccessMessage}
        onClose={() => setShowUpdateSuccessMessage(false)}
        message={"User Updated Successfully!"}
        severity="success"
      />
    </Paper>
  );
};

export default Form;
