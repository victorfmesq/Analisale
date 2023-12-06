import { SessionProvider } from "./context/SessionContext";
import { TableDataProvider } from "./context/TableDataContext";
import RouteComponent from "./routes";
import "./styles/styles.css";

const App = () => {
  return (
    <SessionProvider>
      <TableDataProvider>
        <RouteComponent />
      </TableDataProvider>
    </SessionProvider>
  );
};

export default App;
