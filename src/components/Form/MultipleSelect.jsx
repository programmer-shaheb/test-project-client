import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { FormHelperText } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useFetchSectors from "../../hooks/useFetchSectors";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const disabledOptionColor = "#4d1c00";

const getStyles = (value, sectorName, theme) => ({
  fontWeight: sectorName.includes(value)
    ? theme.typography.fontWeightMedium
    : theme.typography.fontWeightRegular,
  color: sectorName.includes(value) && disabledOptionColor,
});

const getOptionStyle = (nestedOption) => ({
  fontWeight: nestedOption.disabled ? "bold" : "normal",
  color: nestedOption.disabled ? "black" : "inherit",
});

const MultipleSelect = ({
  onUpdateSectorName,
  error,
  sectorName,
  setSectorName,
}) => {
  const { sectors, loading } = useFetchSectors();
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const selectedValues = typeof value === "string" ? value.split(",") : value;
    setSectorName(selectedValues);
    onUpdateSectorName(selectedValues);
  };

  return (
    <FormControl fullWidth error={error?.jobSector}>
      <InputLabel id="demo-multiple-name-label">Sectors</InputLabel>
      <Select
        fullWidth
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        multiple
        value={sectorName}
        onChange={handleChange}
        input={<OutlinedInput label="Sectors" />}
        MenuProps={MenuProps}
      >
        {sectors.map((option) => {
          if (option.options) {
            return option.options.map((nestedOption) => (
              <MenuItem
                key={nestedOption.value}
                value={nestedOption.value}
                disabled={nestedOption.disabled}
                style={{
                  ...getStyles(nestedOption.value, sectorName, theme),
                  ...getOptionStyle(nestedOption),
                }}
              >
                {nestedOption.subIndent ? "\u00A0\u00A0" : null}
                {nestedOption.superIndent ? "\u00A0\u00A0\u00A0\u00A0" : null}
                {nestedOption.label}
              </MenuItem>
            ));
          } else {
            return (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            );
          }
        })}
      </Select>
      {error?.jobSector && <FormHelperText>Choose Your Sector</FormHelperText>}
    </FormControl>
  );
};

export default MultipleSelect;
