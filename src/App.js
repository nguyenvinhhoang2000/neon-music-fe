import { Route } from "react-router";
import "./App.scss";
import PlayerController from "./feature/PlayerControl";
import SideBar from "./feature/SideBar/pages/SideBar";
import Personal from "./feature/Container/pages/Personal";
import Discover from "./feature/Container/pages/Discover";
import Header from "./components/Header";

function App() {
  return (
    <div className='app'>
      <div className='main-layout'>
        <SideBar />

        <Header />

        <Route path='/personal' component={Personal} />
        <Route exact path='/' component={Discover} />
      </div>
      <PlayerController />
    </div>
  );
}

export default App;
