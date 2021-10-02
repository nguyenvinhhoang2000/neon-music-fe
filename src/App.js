import { Route } from "react-router";
import "./App.scss";
import PlayerController from "./feature/PlayerControl/pages/PlayerController";
import SideBar from "./feature/SideBar/pages/SideBar";
import Personal from "./feature/Container/pages/Personal";
import Discover from "./feature/Container/pages/Discover";

function App() {
  return (
    <div className='app'>
      <SideBar />
      <PlayerController />

      <Route path='/personal' component={Personal} />
      <Route path='/discover' component={Discover} />
    </div>
  );
}

export default App;
