import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { Autocomplete,Button,TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { UserDataAtom } from '../Atoms';

interface data {
  group: string;
  handleChange: (group: string) => void;
}

export default function SelectGroupFrom({ group, handleChange }: data) {
  const [allGroupsFrom, setAllGroupsFrom] = useState<string[]>([]);
  const [userData] = useAtom(UserDataAtom);
  const [newV,setNewV] = useState(false)
  const [newGroup,setNewGroup] = useState('')

  useEffect(() => {
    if (userData) {
      setAllGroupsFrom(userData.groupsFrom)}
  }, [userData]);

  const handleChoose = (event: any, newValue: string | null) => {
    if(!event&&newValue){
      handleChange(newValue)
      setNewV(false)
    }
    else if (newValue) handleChange(newValue);

  };
  function handleNewInput(event: any) {
    if (event && !allGroupsFrom.some(group => group.includes(event.target.value))) {
      setNewV(true)
      setNewGroup(event.target.value)
    }
    else{setNewV(false)}
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Autocomplete
        onInputChange={handleNewInput}
          id="select-label"
          options={allGroupsFrom}
          value={group}
          onChange={handleChoose}
          freeSolo
          renderInput={(params) => (
            <TextField {...params} label="קבוצה שולחת" />
          )}
        />
        {newV?<Button onClick={()=>handleChoose(false,newGroup)}  variant='outlined' >הוסף חדש</Button>:null}
      </FormControl>
    </Box>
  );
}
