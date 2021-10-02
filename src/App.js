import "./App.scss";
import PlayerController from "./feature/PlayerControl/pages/PlayerController";
import SideBar from "./feature/SideBar/pages/SideBar";

function App() {
  return (
    <div className='app'>
      <SideBar />
      <PlayerController />
    </div>
  );
}

export default App;
