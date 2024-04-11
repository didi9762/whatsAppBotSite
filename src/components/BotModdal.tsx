import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Bot } from "../types/types";
import { TextField, Checkbox,Button } from "@mui/material";
import SelectGroups from "./selectGroups";
import SelectGroupFrom from "./selectGroupFrom";
import { useEffect, useState } from "react";
import { updtaeUserData } from "./firebase";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "calc(70vw - 10px)",
  "@media (min-width: 600px)": {
    width: "calc(40vw - 2px)",
  },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

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

interface params {
  open: boolean;
  handleClose: () => void;
  data: Bot | null;
  index:number|null;
  reload:()=>void
}

export default function BotModal({ open, handleClose, data ,index,reload}: params) {
const [newData,setNewData] = useState<Bot|null>(null)
const [textErr,setTextErr] = useState(false)

useEffect(()=>{
    setNewData(data)
},[open])

function handleChangeEnding(ending:string){
if(newData) setNewData({...newData,Ending:ending.replace(/[\n]/g ,'$')})
}

const handleChangeGroups = (groupsList:Array<string>)=>{  
if (newData) setNewData({...newData,groupsList:groupsList})
}

    const handleChangeGroupFrom = (group:string) => {
        if(newData)setNewData({...newData,fromGroup:group})
      };

      const handleSubmit = ()=>{
  if(newData?.BotName===''){setTextErr(true);return}
       if(newData&&index!==null) updtaeUserData(index,newData)
        reload()
        handleClose()
      }

  return (
    <div style={{marginTop:10}}>{newData&&
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, display: "flex", flexDirection: "column" }}>
          <Typography
            mb={3}
            textAlign={"center"}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            פרטי הבוט
          </Typography>
          <TextField
            size={"small"}
            sx={TextFieldStyle}
            label="מזהה הבוט - לא ניתן לשינוי"
            InputProps={{
              readOnly: true,
            }}
            defaultValue={newData.id}
          />
          <TextField
            size={"small"}
            error={textErr}
            sx={{ ...TextFieldStyle, direction: "rtl" }}
            label="שם הבוט"
            onChange={(event)=>setNewData({...newData,BotName:event.target.value})}
            defaultValue={newData.BotName}
            placeholder={newData.BotName}
          />
          <TextField
          multiline={true}
          rows={3}
            size={"small"}
            sx={{ ...TextFieldStyle, direction: "rtl" ,}}
            label="סיומת הקבוצה"
            onChange={(e)=>handleChangeEnding(e.target.value)}
            defaultValue={newData.Ending.replace(/[$]/g,'\n')}
            placeholder={newData.Ending.replace(/[$]/g,'\n')}
          />
          <SelectGroups groupsExist={newData.groupsList} handleChangeGroups={handleChangeGroups}/>
          <SelectGroupFrom handleChange={handleChangeGroupFrom} group={newData.fromGroup} />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography lineHeight={2.5}>תצוגת לינק</Typography>
            <Checkbox checked={newData.linkView} onClick={()=>setNewData({...newData,linkView:!newData.linkView})} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography lineHeight={2.5}>תצוגת תמונה וטקסט</Typography>
            <Checkbox checked={newData.txt_Photo} onClick={()=>setNewData({...newData,txt_Photo:!newData.txt_Photo})} />
          </Box>
          <Box display={'flex'} justifyContent={'space-between'} mt={5}>
          <Button onClick={handleClose} variant="contained" color='warning' >חזור</Button>
          <Button onClick={handleSubmit} variant="contained" color='success'>שמור</Button>
          </Box>
        </Box>
      </Modal>}
    </div>
  );
}
