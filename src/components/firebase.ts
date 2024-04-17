import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  get,
  getDatabase,
  ref,
  update,
  onValue,
  off,
  remove,
} from "firebase/database";
import { Bot } from "../types/types";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBFXo_Ho0L7pB-2_FSad2nd7j32rxAf3dU",
  authDomain: "whatsappdata-a1e14.firebaseapp.com",
  databaseURL:
    "https://whatsappdata-a1e14-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "whatsappdata-a1e14",
  storageBucket: "whatsappdata-a1e14.appspot.com",
  messagingSenderId: "141302883704",
  appId: "1:141302883704:web:e33057844975cbe7c6d48d",
  measurementId: "G-GFLB2JWRZY",
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
async function newUserUserName(userName: string) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const db = getDatabase();
      const userRef = ref(db, "users/" + `${user.uid}/`);
      await update(userRef, { userName: userName });
    }
  } catch (e) {
    console.log("error try set new user userName");
  }
}

async function getUserData() {
  const db = getDatabase();
  const auth = getAuth();
  if (auth && auth.currentUser) {
    try {
      const userd = (await get(ref(db, "users/" + auth.currentUser.uid))).val();
      return userd;
    } catch (e) {
      console.log("error try get user data:", e);
    }
  }
}

async function listenToChanges(callback: () => void) {
  let initial = true;
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const db = getDatabase();
      const query = ref(db, "users/" + `${user.uid}/`);
      onValue(query, () => {
        if (initial) {
          initial = false;
          return;
        }
        callback();
      });
    }
  } catch (e) {
    console.log("error when listening to changes:", e);
  }
}

async function updtaeUserData(botId: string, updates: any) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const db = getDatabase();
      await update(
        ref(db, "users/" + `${user.uid}/BotsList/${botId}/`),
        updates
      );
      if (updates.groupsList) {
        await update(ref(db, "users/" + `${user.uid}/BotsList/${botId}`), {
          groupsList: updates.groupsList,
        });
      }
    } else {
      return;
    }
  } catch (e) {
    console.log("error try update data:", e);
  }
}

async function updtaeGroupsFrom(botId: string, updates: any) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const db = getDatabase();
      await update(ref(db, "users/" + `${user.uid}/BotsList/${botId}/`), {
        allGroups: updates,
      });
    } else {
      return;
    }
  } catch (e) {
    console.log("error try update groupsFrom list:", e);
  }
}

async function getQrCode(callback: (qrCode: string) => void, newBot: Bot) {
  let timer: NodeJS.Timeout | null = null;

  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const db = getDatabase();
      const qrRef = ref(db, `users/${user.uid}/newBotQr`);
      await addNewBot(newBot);
      const listener = onValue(qrRef, (snapshot) => {
        const qrCode = snapshot.val();
        if (!/^\d{10,}$/.test(qrCode) && qrCode !== "") {
          callback(qrCode);
        }
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      });
      timer = setTimeout(() => {
        off(qrRef, "value", listener);
        callback("err");
        deleteBot(newBot.id);
      }, 40000);
      return () => {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        off(qrRef, "value", listener);
      };
    }
  } catch (e) {
    console.log("Error trying to get QR code:", e);
  }

  // If an error occurs, return a dummy function
  return () => {};
}

async function getMessage(callback: (msg: string) => void) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const db = getDatabase();
      const msgRef = ref(db, `users/${user.uid}/newBotQr`);
      onValue(msgRef, (snapshot) => {
        callback(snapshot.val());
        return () => {
          off(msgRef, "value");
        };
      });
    }
  } catch (e) {
    console.log("error in getting msg after scan:", e);
  }
}

async function addNewBot(newBot: Bot) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const db = getDatabase();
      const botsRef = ref(db, `users/${user.uid}/BotsList`);
      const key = newBot.id;
      await update(botsRef, { [key]: newBot });
      if (newBot.isChecker) {
        await update(ref(db, `users/${user.uid}/`), { checkerBot: newBot.id });
      }
    }
  } catch (e) {
    console.log("error try add new bot:", e);
  }
}

async function deleteBot(botId: string) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const db = getDatabase();
      const botsRef = ref(db, `users/${user.uid}/BotsList/${botId}`);
      await remove(botsRef);
    }
  } catch (e) {
    console.log("error try delete bot:", e);
  }
}

async function sendPhoneToGetQr(phone: string) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const db = getDatabase();
      const qrRef = ref(db, `users/${user.uid}/`);
      await update(qrRef, { newBotQr: phone });
    }
  } catch (e) {
    console.log("error try send phone number to get qr:", e);
  }
}

export {
  getQrCode,
  addNewBot,
  sendPhoneToGetQr,
  getMessage,
  firebaseApp,
  newUserUserName,
  getUserData,
  updtaeUserData,
  updtaeGroupsFrom,
  listenToChanges,
};
