import {Provider} from 'react-redux';
import Store from './store/Store';
import UserBoard from './containers/UserBoard'
import CpuBoard from './containers/CpuBoard'

function App() {
  return (
    <Provider store={Store}>
      <UserBoard></UserBoard>
      <CpuBoard></CpuBoard>
    </Provider>
  );
}

export default App;
