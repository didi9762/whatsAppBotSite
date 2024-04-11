import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {ListItemText} from '@mui/material'
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { UserDataAtom } from '../Atoms';



interface data{
    group:string
    handleChange:(group:string)=>void
}

export default function SelectGroupFrom({group,handleChange}:data) {
  const [allGroupsFrom,setAllGroupsFrom] = useState<string[]>([])
  const [userData] = useAtom(UserDataAtom)
useEffect(()=>{
  if(userData)setAllGroupsFrom(userData?.groupsFrom)
},[])


    const handleChoose = (event: SelectChangeEvent) => {
        handleChange(event.target.value as string);
      };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-label">קבוצה שולחת</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={group}
          label="group"
          onChange={handleChoose}
        > {allGroupsFrom.map((groupToChoose,i) => (
            <MenuItem  key={i} value={groupToChoose}>
              <ListItemText secondary={groupToChoose} />
            </MenuItem>
          ))}

        </Select>
      </FormControl>
    </Box>
  );
}