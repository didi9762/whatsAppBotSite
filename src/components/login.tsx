import { Box, Container, TextField, Button, Fab } from "@mui/material";
import { useAtom } from "jotai";
import { UserDataAtom } from "../Atoms";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { getUserData, newUserUserName } from "./firebase";

const LogIn = () => {
  const [, setUserData] = useAtom(UserDataAtom);
  const [mailError, setMailError] = useState(false);
  const [mail, setMail] = useState("");
  const [passError, setPassError] = useState(false);
  const [password, setPassword] = useState("");
  const [isSignUp, setSignUp] = useState(false);
  const [userName,setUserName] = useState('')


  async function login() {
    try {
      const user = await signInWithEmailAndPassword(getAuth(), mail, password);

      const toekn = await user.user.getIdToken();
      localStorage.setItem("fbtoken", toekn);
      const userD = await getUserData();
      setUserData(userD);
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

  async function signUp() {
    try {
      const user = await createUserWithEmailAndPassword(
        getAuth(),
        mail,
        password
      );
      await newUserUserName(userName)
      const toekn = await user.user.getIdToken();
      localStorage.setItem("fbtoken", toekn);
      const userD = await getUserData();
      setUserData(userD);
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
        <Fab onClick={()=>setSignUp(!isSignUp)} sx={{ mb: 5 }} variant="extended" size="small" color="inherit">
          {isSignUp?
          <AccountCircleOutlinedIcon sx={{mr:3}}/>:
          <PersonAddAltOutlinedIcon sx={{mr:3}} />}
          {!isSignUp ? "משתמש חדש? הרשם" : "משתמש רשום? הכנס"}
        </Fab>
        {isSignUp?<TextField
          onChange={(e) => setUserName(e.target.value)}
          label="User name"
          variant="standard"
        />:null}
        <TextField
        sx={{mt:4}}
          onChange={(e) => setMail(e.target.value)}
          error={mailError}
          type="email"
          label="mail"
          variant="standard"
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          error={passError}
          sx={{ mt: 5 }}
          type={isSignUp?"text":'password'}
          label="password"
          variant="standard"
        />

        <Button
          onClick={isSignUp ? signUp : login}
          sx={{ width: "80%", mt: 5 }}
          variant="contained"
          color={isSignUp ? "secondary" : "primary"}
        >
          {isSignUp ? "צור חשבון" : "כנס"}
        </Button>
      </Box>
    </Container>
  );
};

export default LogIn;
