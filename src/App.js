import {Provider} from 'react-redux';
import Store from './store/Store';
import UserBoard from './containers/UserBoard'
import CpuBoard from './containers/CpuBoard'
import ShipsRemainingPlayer from './containers/ShipsRemainingPlayer';
import ShipsRemainingCpu from './containers/ShipsRemainingCpu';
import Announcements from './containers/Announcements';
import GameEnd from './containers/GameEnd'

function App() {
  return (
    <Provider store={Store}>
      <Announcements></Announcements>
      <div id='boardContainers'>
        <ShipsRemainingPlayer/>
        <UserBoard></UserBoard>
        <ShipsRemainingCpu/>
        <CpuBoard></CpuBoard>
      </div>
      <GameEnd/>
    </Provider>
  );
}

export default App;
