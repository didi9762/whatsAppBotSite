import { Container, Box, TextField, Button, Typography,CircularProgress,Alert } from "@mui/material";
import { useState } from "react";
import QrModal from "./qrModal";
import { Bot } from "../types/types";
import { getQrCode, sendPhoneToGetQr,getUserData } from "./firebase";
import { useAtom } from "jotai";
import { UserDataAtom } from "../Atoms";


const TextFieldStyle = {
  "& label": {
    left: "unset",
    right: "1.75rem",
    transformOrigin: "right",
    fontSize: "0.8rem",
  },
  "& legend": {
    textAlign: "right",
    fontSize: "0.6rem",
  },
  marginBottom: 2,
};

const initialBot:Bot = {
    id:'',
BotName:'',
Ending:'',
bugsGroup:'',
groupsList:[],
allGroups:[],
fromGroup:'',
linkView:false,
txt_Photo:true,
online:false
}

const NewBot = () => {
  const [botPhone, setBotPhone] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [qrErr,setQrErr] = useState(false)
  const [loading, setLoading] = useState(false);
  const [qrCode,setQrCode]= useState<string|null>(null)
  const [,setUserData]=useAtom(UserDataAtom)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setBotPhone(e.target.value.replace(/\D/g, ""));
    setError(false);
  }

  async function reload() {
    const userD = await getUserData();
    setUserData(userD);
  }

  async function handleSubmit() {
   setQrErr(false)
    if (botPhone.length < 10) {
       
      setError(true);
      return;
    }
    setLoading(true)
    initialBot.id=botPhone
    initialBot.BotName = botPhone
    await sendPhoneToGetQr(botPhone)
        getQrCode((qrCode)=>{
            setQrCode(qrCode)
            if(qrCode==='err'){setLoading(false);setQrErr(true);return}
            if(qrCode){setOpen(true);
            setLoading(false)}
        },initialBot)
    
  }

  return (
    <div>{qrErr&&<Alert  severity="error">לא התקבל קוד </Alert>}
    <Container
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        {loading?<CircularProgress />:
        <div>
      <QrModal
      reload={reload}
        handleClose={() => setOpen(false)}
        open={open}
        qr={qrCode}
      />
      <Box  display={"flex"} flexDirection={"column"}>
        <Typography textAlign={"center"} variant="h4" mb={10}>
          הוספת בוט חדש
        </Typography>
        <TextField
          title="הכנס מספר טלפון "
          sx={TextFieldStyle}
          error={error}
          placeholder="הכנס מספר טלפון כולל קידומת"
          value={botPhone}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit} variant="outlined">
          {" "}
          קבל קוד לסריקה
        </Button>
      </Box></div>}
    </Container></div>
  );
};

export default NewBot;
