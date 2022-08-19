import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.scss";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import {LocationContextProvider} from './store/location-context'

ReactDOM.render(
  <LocationContextProvider>
      <AuthContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </AuthContextProvider>
  </LocationContextProvider>,
  document.getElementById("root")
);
