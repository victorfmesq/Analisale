import { Outlet } from "react-router-dom";
import Menu from "../../components/Menu";
import TabPage from "../../components/Pages/TabPage";
import { ModalProvider } from "../../context/ModalContext";

const Home = () => {
  return (
    <ModalProvider>
      <Menu>
        <TabPage>
          <Outlet />
        </TabPage>
      </Menu>
    </ModalProvider>
  );
};

export default Home;
