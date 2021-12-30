import { Route } from "react-router";
import "./App.scss";
import PlayerController from "./feature/PlayerControl";
import SideBar from "./feature/SideBar/pages/SideBar";
import Personal from "./feature/Container/pages/Personal";
import Discover from "./feature/Container/pages/Discover";
import Header from "./components/Header";
import Songs from "feature/Container/pages/Songs";
import CommingSoon from "feature/Container/pages/CommingSoon";
import { useSelector } from "react-redux";

function App() {
  const showPlayerControl = useSelector((state) => state.playingList);

  return (
    <div className='app'>
      <div
        style={
          showPlayerControl.length == 0
            ? { height: "100vh" }
            : { height: "calc(100vh - 90px)" }
        }
        className='main-layout'
      >
        <SideBar />

        <Header />

        <Route exact path='/' component={Songs} />
        <Route path='/discover' component={Discover} />
        <Route path='/personal' component={Personal} />
        <Route path='/1' component={CommingSoon} />
        <Route path='/2' component={CommingSoon} />
      </div>
      {showPlayerControl.length == 0 ? <></> : <PlayerController />}
    </div>
  );
}

export default App;
