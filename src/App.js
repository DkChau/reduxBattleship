import {Provider} from 'react-redux';
import Store from './store/Store';
import UserBoard from './containers/UserBoard'

function App() {
  return (
    <Provider store={Store}>
      <UserBoard></UserBoard>
    </Provider>
  );
}

export default App;
