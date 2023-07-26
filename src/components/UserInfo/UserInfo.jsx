import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  tableCellClasses,
  TableRow,
  Paper,
  Button,
  Container,
} from "@mui/material";
import { Chip } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import useFetchSectors from "../../hooks/useFetchSectors";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: " #4e54c8",
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const UserInfo = ({ users, loading: userLoading, setCurrentID }) => {
  const { sectors, loading } = useFetchSectors();

  const findSectorLabel = (sectorValue) => {
    for (const sector of sectors) {
      if (sector.options) {
        for (const option of sector.options) {
          if (option.value === sectorValue) {
            return option.label;
          }
        }
      }
    }
    return "";
  };

  const emptyArrays = Array.from({ length: 2 }, () => []);
  const sortedUsers = users?.slice().sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <Container maxWidth="md">
      <TableContainer component={Paper} elevation={1}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Sectors</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          {userLoading ? (
            <TableBody>
              {emptyArrays?.map((_, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>
                    <Skeleton
                      animation="wave"
                      sx={{
                        height: "70px",
                        width: "100%",
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Skeleton
                      animation="wave"
                      sx={{
                        height: "70px",
                        width: "100%",
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Skeleton
                      animation="wave"
                      sx={{
                        height: "70px",
                        width: "100%",
                      }}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {sortedUsers?.map((user) => (
                <StyledTableRow key={user.userId}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {user.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {loading ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {user.jobSector.map((sector, index) => (
                          <Skeleton
                            key={index}
                            variant="circular"
                            animation="wave"
                            width={70}
                            height={38}
                            sx={{ marginX: "5px" }}
                          />
                        ))}
                      </div>
                    ) : (
                      user.jobSector.map((sector) => (
                        <Chip
                          sx={{ marginX: "5px" }}
                          key={sector}
                          label={findSectorLabel(sector)}
                          variant="outlined"
                        />
                      ))
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="outlined"
                      disableElevation
                      sx={{
                        color: "#4e54c8",
                      }}
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentID(user.userId);
                      }}
                    >
                      Edit
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserInfo;
