import { SessionProvider } from "./context/SessionContext";
import RouteComponent from "./routes";
import "./styles/styles.css";

const App = () => {
  return (
    <SessionProvider>
      <RouteComponent />
    </SessionProvider>
  );
};

export default App;
