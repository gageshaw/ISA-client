import * as React from "react";

// This is the data fetching library we will use
import axios from "axios";

export const DummyComponent = () => {
  const [message, setMessage] = React.useState("fetching data...");
  React.useEffect(() => {
    // Fetch our data from our local backend (localhost:3000)
    axios

      // Ping the backend server at the /scheduler route
      .get("http://localhost:3000/scheduler")

      // Set the state variable to the message from the backend
      .then((response) => setMessage(response.data));
  }, []);
  return (
    <div>
      This is data fetched from the backend:<h1>{message}</h1>{" "}
    </div>
  );
};
