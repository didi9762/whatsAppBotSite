import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { get, getDatabase, ref, update } from "firebase/database";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBFXo_Ho0L7pB-2_FSad2nd7j32rxAf3dU",
  authDomain: "whatsappdata-a1e14.firebaseapp.com",
  databaseURL: "https://whatsappdata-a1e14-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "whatsappdata-a1e14",
  storageBucket: "whatsappdata-a1e14.appspot.com",
  messagingSenderId: "141302883704",
  appId: "1:141302883704:web:e33057844975cbe7c6d48d",
  measurementId: "G-GFLB2JWRZY",
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
async function getUserData(){
  const db = getDatabase()
  const auth = getAuth()
  if(auth&&auth.currentUser){
    try{
      const userd = (await get(ref(db,'users/'+auth.currentUser.uid))).val()
      return userd
    }catch(e){console.log('error try get user data:',e);
    }
}
}

async function updtaeUserData(botIndex:number,updates:any) {
  try{
    const auth = getAuth()
    const user = auth.currentUser
    if(user){
  const db = getDatabase()
await update(ref(db,'users/'+`${user.uid}/BotsList/${botIndex}/`),updates)
await update(ref(db,'users/'+`${user.uid}/BotsList/${botIndex}/`),{'groupsList':updates.groupsList})
}else{return}
  }catch(e){
    console.log('error try update data:',e);
    
  }
}




export { firebaseApp,getUserData,updtaeUserData}