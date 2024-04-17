import {  Alert, Box, Button, Modal, Typography } from "@mui/material"
import QRCode from "react-qr-code"
import { getMessage } from "../firebase"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"

interface params {
    open:boolean
    qr:string|null,
    handleClose:()=>void
    reload:()=>void
}

const style = {
    width: "calc(70vw - 10px)",
    "@media (min-width: 300px)": {
      width: "calc(40vw - 2px)",
    },
}

const QrModal = ({open,qr,handleClose,reload}:params)=>{
    const [success,setSuccess]= useState(false)
    const [note,SetNote] = useState('')
    const navigate = useNavigate();

    useEffect(()=>{
if(open){listen()}
    },[open])
    function listen(){
getMessage((msg:string)=>{
    if(msg==='success'){
        setSuccess(true)
        setTimeout(()=>{
            navigate('MainPage')
            handleClose()
            reload()

        },5000)
    }
    else if(msg.startsWith('note')){
        SetNote(msg)
        setTimeout(()=>{
            handleClose()
        },5000)}
})
    }
    return(
        <Modal
        sx={{display:'flex',justifyContent:'center',alignItems:'center'}} 
        open={open}
        >
          <div>
        { success&&open?<Alert severity="success">קוד נסרק בהצלחה</Alert>:note!==''?
           <Alert severity="warning">{note}:בעיה בסריקת קוד</Alert>:null} 
<Box display={'flex'} flexDirection={'column'} alignItems={'center'} p={5} sx={{...style,backgroundColor:'white'}}>
{qr?<QRCode value={qr} size={190} />:null}
<Typography textAlign={'center'} mb={3}  mt={5} variant="h5">סרוק קוד באמצעות הווצאפ</Typography>
<Button  variant="outlined" onClick={handleClose}>בטל</Button>
</Box></div>
        </Modal>
    )
}

export default QrModal