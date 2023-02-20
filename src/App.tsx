import reactLogo from "./assets/react.svg";
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
import Wrapper from "./wrapper";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Wrapper/>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
