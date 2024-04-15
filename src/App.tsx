import { Container } from "@mui/material";
import Header from "./components/Header";
import { useAtom } from "jotai";
import { UserDataAtom } from "./Atoms";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogIn from "./components/login";
import MainPage from "./components/mainPage";
import NewBot from "./components/NewBot";
import { useEffect } from "react";
import { getUserData, listenToChanges } from "./components/firebase";

const App = () => {
  const [userData,setUserData] = useAtom(UserDataAtom);


  useEffect(()=>{
listenToChanges(reload)

  },[userData])

  async function reload() {
    const userD = await getUserData();
    setUserData(userD);
  }

  return (
    <Router >
      <div>
        {userData ? (
          <Container>
            <Header userData={userData} />
          <Routes  >
              <Route   path="/whatsAppBotSite"  element={<MainPage/>}/>
<Route path="/whatsAppBotSite/NewBot" Component={NewBot}/>
              </Routes>
          </Container>
        ) : (
          <LogIn />
        )}
      </div>
    </Router>
  );
};

export default App;
