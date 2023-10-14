import { Outlet } from "react-router-dom";
import Menu from "../../components/Menu";
import TabPage from "../../components/Pages/TabPage";

const Home = () => {
  return (
    <Menu>
      <TabPage>
        <Outlet />
      </TabPage>
    </Menu>
  );
};

export default Home;
