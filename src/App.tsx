import { Container } from "@mui/material";
import Header from "./components/Header";
import MainPage from "./components/mainPage";
import { useAtom } from "jotai";
import { UserDataAtom } from "./Atoms";
import { useEffect } from "react";
import LogIn from "./components/login";


const App = () => {
const [userData] = useAtom(UserDataAtom)

useEffect(()=>{  

},[userData])

  return (<div>
    {userData?<Container>
      <Header userData={userData} />
<MainPage />
    </Container>:<LogIn/>}
    </div>
  );
};

export default App;
