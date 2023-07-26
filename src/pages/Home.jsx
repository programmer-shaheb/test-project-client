import { Container, Grid, Grow } from "@mui/material";
import Form from "../components/Form/Form";
import UserInfo from "../components/UserInfo/UserInfo";
import useFetchAllUserInfo from "../hooks/useFetchAllUserInfo";
import { useState } from "react";
import AnimatedBG from "../utility/AnimatedBG";

const Home = () => {
  const [newUser, setNewUser] = useState({});
  const [currentID, setCurrentID] = useState(0);
  const { userInfo, loading, error } = useFetchAllUserInfo(newUser);

  return (
    <>
      <AnimatedBG />
      <Container maxWidth="xl">
        <Grid
          container
          sx={{
            height: "100vh",
          }}
          alignItems="center"
          justifyContent="center"
        >
          <Grow in timeout={1000}>
            <Grid item xs={12} sm={6} md={4}>
              <Form
                setNewUser={setNewUser}
                setCurrentID={setCurrentID}
                currentID={currentID}
              />
            </Grid>
          </Grow>

          {userInfo?.length > 0 && (
            <Grow in timeout={1500}>
              <Grid item xs={12} sm={6} md={8}>
                {userInfo?.length > 0 ? (
                  <UserInfo
                    users={userInfo}
                    loading={loading}
                    setCurrentID={setCurrentID}
                  />
                ) : (
                  <div></div>
                )}
              </Grid>
            </Grow>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
