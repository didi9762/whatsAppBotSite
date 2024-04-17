import { Container, List,  Button, Typography, Box } from "@mui/material";
import { Bot } from "../types/types";
import BotModal from "./manage bots/BotModdal";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { UserDataAtom } from "../Atoms";
import { getUserData } from "./firebase";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [allData, setAllData] = useAtom(UserDataAtom);
  const [botsList, setBotsList] = useState<Array<string>>([]);
  const [index, setIndex] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [botChoose, setBotChoose] = useState<Bot | null>(null);
const navigate = useNavigate()

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
            {botsList.length!==0? botsList.map((bot, i) => {
              return (
                

                  <Button
                  sx={{height:30}}
                    key={i}
                    onClick={() => handleOpen(bot, i)}
                    variant="text"
                  >
                    <Typography textAlign={'center'}>{bot}</Typography>

                  </Button>
                
              );
            }):
          <Box display={'flex'} justifyContent={'center'} alignContent={'center'}>
            <Button onClick={()=>navigate('NewBot')} variant="text" sx={{textAlign:'center'}}>{'עדיין אין בוטים במערכת \n לחץ להוספת בוט ראשון'}</Button>
          </Box>
          }
          </List>
        </Container>
      )}
    </div>
  );
};

export default MainPage;
