import { atom } from "jotai";
import { User} from "./types/types";



const UserDataAtom= atom<User|null> (null)

export {UserDataAtom}