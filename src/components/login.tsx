import { Box, Container, TextField, Button } from "@mui/material";
import { useAtom } from "jotai";
import { UserDataAtom } from "../Atoms";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {getUserData } from "./firebase";

const LogIn = () => {
  const [,setUserData] = useAtom(UserDataAtom);
  const [mailError, setMailError] = useState(false);
  const [mail, setMail] = useState("");
  const [passError, setPassError] = useState(false);
  const [password, setPassword] = useState("");

  async function login() {
    try {
      const user = await signInWithEmailAndPassword(
        getAuth(),
        mail,
        password
      );
      
      const toekn = await user.user.getIdToken()
      localStorage.setItem("fbtoken", toekn);
      const userD = await getUserData()
      setUserData(userD)
    } catch (e: any) {
      if (e.code.includes("mail")) {
        console.log("error invalide email:", e);
        setMailError(true);
      } else {
        console.log("error invalide password:", e), setMailError(false);
        setPassError(true);
      }
    }
  }



  return (
    <Container
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          onChange={(e) => setMail(e.target.value)}
          error={mailError}
          label="mail"
          variant="standard"
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          error={passError}
          sx={{ mt: 5 }}
          type="password"
          label="password"
          variant="standard"
        />

        <Button
          onClick={login}
          sx={{ width: "80%", mt: 5 }}
          variant="contained"
        >
          Log in
        </Button>
      </Box>
    </Container>
  );
};

export default LogIn;
