import { Container, List, ListItem, Button, Typography } from "@mui/material";
import { Bot } from "../types/types";
import BotModal from "./BotModdal";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { UserDataAtom } from "../Atoms";
import { getUserData } from "./firebase";


const MainPage = () => {
  const [allData, setAllData] = useAtom(UserDataAtom);
  const [botsList, setBotsList] = useState<Array<string>>([]);
  const [index, setIndex] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [botChoose, setBotChoose] = useState<Bot | null>(null);
  useEffect(() => {
    if (allData){
      if(allData.BotsList){
        const lst =Object.keys(allData.BotsList)
setBotsList(lst.map((key)=>{return allData.BotsList[key].BotName}))
      }else{
        setBotsList([])
      }}
  }, [allData]);

  const handleClose = () => {
    setOpen(false);
    setBotChoose(null);
  };
  const handleOpen = (BotName: string, index: number) => {
    if(allData){
    const bot = Object.values(allData.BotsList).filter((b)=> b.BotName === BotName);
    if (bot) {
      setBotChoose(bot[0]);
      setIndex(index);
      setOpen(true);
    }}
  };

  async function reload() {
    const userD = await getUserData();
    setAllData(userD);
  }

  return (
    <div>
      {allData && (
        <Container
          style={{
            marginTop: 10,
            display: "flex",
            width: "50vw",
            maxWidth: 400,
            float: "right",
            height: "auto",
            border: "0.1px solid #babdc1",
          }}
        >
          <BotModal
            reload={reload}
            index={index}
            handleClose={handleClose}
            open={open}
            data={botChoose}
          />
          <List
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            {botsList.map((bot, i) => {
              return (
                <Button
                sx={{height:30}}
                  key={i}
                  onClick={() => handleOpen(bot, i)}
                  variant="text"
                >
                  <ListItem
                    style={{ width: "100%", justifyContent: "flex-end" }}
                  >
                    <Typography>{bot}</Typography>
                  </ListItem>
                </Button>
              );
            })}
          </List>
        </Container>
      )}
    </div>
  );
};

export default MainPage;
