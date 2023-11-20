import { useEffect, useState } from "react";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  return <>{user ? <Dashboard user={user} /> : <Login setUser={setUser} />}</>;
}

export default App;
