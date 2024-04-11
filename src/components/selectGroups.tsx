import { useEffect, useState } from "react";
import {
  InputLabel,
  FormControl,
  Select,
  SelectChangeEvent,
  ListItemText,
  MenuItem,
  Checkbox,
  OutlinedInput,
} from "@mui/material";
import { useAtom } from "jotai";
import { UserDataAtom } from "../Atoms";

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

interface data {
  groupsExist: Array<string>;
  handleChangeGroups: (groups: Array<string>) => void;
}

export default function SelectGroups({
  groupsExist,
  handleChangeGroups,
}: data) {
  const [groups, setGroups] = useState<string[]>([]);
  const [allGroups, setAllGroups] = useState<string[]>([]);
  const [userData] = useAtom(UserDataAtom)

  useEffect(() => {
    if(userData){
   setAllGroups(userData.groupsToSend)
    setGroups(groupsExist)}
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof groups>) => {
    const {
      target: { value },
    } = event;
    setGroups(typeof value === "string" ? value.split(",") : value);
    handleChangeGroups(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="select-label">קבוצות לשליחה</InputLabel>
      <Select
        labelId="checkbox-label"
        id="checkbox"
        multiple
        value={groups}
        onChange={handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
        sx={{ mb: 2 }}
      >
        {allGroups.map((group, i) => (
          <MenuItem key={i} value={group}>
            <Checkbox checked={groups.indexOf(group) > -1} />
            <ListItemText secondary={group} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
