import './App.scss';
import LetrasSaida from './components/LetrasSaída';
import { Provider } from 'react-redux';
import store from './store';

function App() { 
  return (
    <div className="App"> 
      <Provider store={store}  >
        <div className="Board">
          <LetrasSaida/>
        </div>
      </Provider>
    </div>
  );
}
export default App;
