import "./App.css";
import Login from "./components/Login";
import * as React from "react";
import { BrowserRouter, Route, useHistory, useLocation } from "react-router-dom";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import axios from "axios";

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app();
}

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  //  signInSuccessUrl: "/signedIn",

  // We will display Google and Email as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

const SignedInPage = () => {
  const [isQuickbooks, setIsQuickbooks] = React.useState(false);
  const [data, setData] = React.useState("");
  const [isTsheets, setIsTsheets] = React.useState(false);
  const[companyData, setCompanyData] = React.useState(false);
  const[customerData, setCustomerData] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setData(location.search)
    // 1st render => data = "/"
    // 2nd after button => data = "search"
  }, [location])


  const handleQuickbooksIntegration =  () => {
     axios.get("http://localhost:3000/auth/uri").then((response) => {
      // setData(response.data);

      window.open(response.data, "_self");
      
    });

       // 2. check to make sure user is authenticated
    // 3. set aproppriate state variables (could make own hook)
  };



  // setData(window.location.href)
//  console.log(window.location.href);

  const handleTsheetsIntegration = () => {
    console.log("handling Tsheets");
  };

  const runQuickbooks = () => {
    // 1. We have the token +     
    // 2. POST to our localhost:3000
    axios.post("http://localhost:3000/auth/QBToken", {
      token: data,
    })
  }

  const queryCompanyInfo =  () => {
    axios.get("http://localhost:3000/query/companyInfo").then((response) => {
     setCompanyData(response.data);

     console.log(response.data);
     
   });

      // 2. check to make sure user is authenticated
   // 3. set aproppriate state variables (could make own hook)
 };

 const queryCustomer =  () => {
  axios.get("http://localhost:3000/query/customers").then((response) => {
   setCustomerData(response.data);

   console.log(response.data);
   
 });

    // 2. check to make sure user is authenticated
 // 3. set aproppriate state variables (could make own hook)
};


  return (
    <div>
      <h1>Integrations</h1>
      <button onClick={() => handleQuickbooksIntegration()}>
        Integrate with Quickbooks
      </button>
      <button onClick={() => handleTsheetsIntegration()}>
        Integrate with Tsheets
      </button>
      <h2>Quickbooks:</h2>
      <h2>
        Tsheets:
        {isTsheets ? "✅ " : "❌"}
      </h2>
      <button onClick={() => runQuickbooks()}>run qb</button>
      <button onClick={() => queryCompanyInfo()}>Get company Info</button>
      <button onClick={() => queryCustomer()}>Get customers</button>
      <div>{companyData}</div>
      <div>{customerData}</div>
      {/* <div>{customerData}</div> */}
    </div>
  );
};

const App: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  React.useEffect(() => {
    // This is a quick way of demo-ing sing-in at the top-level
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });

    return () => unsubscribe();
  });

  return (
    <BrowserRouter>
   <SignedInPage/>
    </BrowserRouter>

  );
};

export default App;
