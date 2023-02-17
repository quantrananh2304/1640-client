import reactLogo from "./assets/react.svg";
import "./App.css";
import { Provider } from "react-redux";
import store, {
  Counteractions,
  dispatch,
  persistor,
  useSelector,
} from "./reduxs";
import { PersistGate } from "redux-persist/integration/react";
import { RESETTABLE_REDUCER, RootState } from "./types/reduxs";
import { useEffect } from "react";

function AppContent() {
  const counter = useSelector((state: RootState) => state.counter.counter);

  useEffect(() => {
    const get = async () => {
      const res = await fetch("https://server-1640.herokuapp.com/api/test");
      const body = await res.json();
      console.log("body", body);
    };

    get();
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => dispatch(Counteractions.increment())}>
          count is {counter}
        </button>
      </div>

      <div className="card">
        <button
          onClick={() => dispatch({ type: RESETTABLE_REDUCER.COUNTER_RESET })}
        >
          Reset
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}

export default App;
