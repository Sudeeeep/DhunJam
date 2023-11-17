import { useEffect, useState } from "react";
import { Login } from "./components/Login";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  return <>{user ? <div>Dashboard</div> : <Login setUser={setUser} />}</>;
}

export default App;
