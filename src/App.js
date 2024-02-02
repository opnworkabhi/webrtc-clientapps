import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateScheduledRoom from "./pages/CreateScheduledRoom";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/createScheduledRoom" Component={CreateScheduledRoom} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
