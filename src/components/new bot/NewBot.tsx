import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import QrModal from "./qrModal";
import { Bot } from "../../types/types";
import { getQrCode, sendPhoneToGetQr, getUserData } from "../firebase";
import { useAtom } from "jotai";
import { UserDataAtom } from "../../Atoms";

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

const initialBot: Bot = {
  id: "",
  BotName: "",
  Ending: "",
  bugsGroup: "",
  groupsList: [],
  allGroups: [],
  fromGroup: "",
  linkView: false,
  online: false,
  isChecker: false,
};

const NewBot = () => {
  const [botPhone, setBotPhone] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [qrErr, setQrErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [, setUserData] = useAtom(UserDataAtom);
  const [checker, setChecker] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setBotPhone(e.target.value.replace(/\D/g, ""));
    setError(false);
  }

  async function reload() {
    const userD = await getUserData();
    setUserData(userD);
  }

  async function handleSubmit() {
    setQrErr(false);
    if (botPhone.length < 10) {
      setError(true);
      return;
    }
    setLoading(true);
    initialBot.id = botPhone;
    initialBot.BotName = botPhone;
    initialBot.isChecker = checker;
    if (checker) {
      setBotPhone(`9999${botPhone}`);
    }
    await sendPhoneToGetQr(botPhone);
    getQrCode((qrCode) => {
      setQrCode(qrCode);
      if (qrCode === "err") {
        setLoading(false);
        setQrErr(true);
        return;
      }
      if (qrCode) {
        setOpen(true);
        setLoading(false);
      }
    }, initialBot);
  }

  return (
    <div>
      {qrErr && <Alert severity="error">לא התקבל קוד </Alert>}
      <Container
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading ? (
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography textAlign={"center"}>
              {"QR ממתין לקבלת קוד "}
            </Typography>
            <Typography mb={3} textAlign={"center"}>
              {"התהליך יכול להימשך זמן מה"}
            </Typography>
            <CircularProgress />
          </Box>
        ) : (
          <div>
            <QrModal
              reload={reload}
              handleClose={() => setOpen(false)}
              open={open}
              qr={qrCode}
            />
            <Box display={"flex"} flexDirection={"column"}>
              <Typography textAlign={"center"} variant="h4" mb={3}>
                הוספת בוט חדש
              </Typography>
              <Typography fontSize={13} textAlign={"center"} mb={3}>
                {
                  "לאחר הלחיצה יופיע קוד לסריקה \nיש להכין את ווצאפ מראש לסריקת הקוד"
                }
              </Typography>
              <Button
                onClick={() => setChecker(!checker)}
                sx={{ justifyContent: "center", mb: 5, display: "flex" }}
              >
                <Typography textAlign={"center"}>
                  להוספת בוט בדיקה לחץ כאן
                </Typography>
                <Checkbox checked={checker} />
              </Button>

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
            </Box>
          </div>
        )}
      </Container>
    </div>
  );
};

export default NewBot;
