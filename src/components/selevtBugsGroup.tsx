import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import {MenuItem,Checkbox,ListItemText} from '@mui/material'
import FormControl from '@mui/material/FormControl';
import Select,{ SelectChangeEvent } from '@mui/material/Select';

interface data {
    group: string;
    allGroups:Array<string>;
    handleChange: (group: string) => void;
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

export default function SelectBugsGroup({group,allGroups,handleChange}:data) {
  const handleChoose= (event: SelectChangeEvent) => {
    handleChange(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-group-bug">קבוצת באגים</InputLabel>
        <Select
          labelId="select-group-bug"
          id="demo-simple-select"
          value={group}
          label="קבוצת באגים"
          size='small'
          MenuProps={MenuProps}
          renderValue={(selected) => selected}
          onChange={handleChoose}
        >
            {allGroups.map((grp, i) => (
          <MenuItem key={i} value={grp}>
            <Checkbox checked={grp===group} />
            <ListItemText secondary={grp} />
          </MenuItem>
        ))}
        </Select>
      </FormControl>
    </Box>
  );
}