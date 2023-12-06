import { PieChart, Pie, ResponsiveContainer } from "recharts";
import * as TabPageStyle from "../../components/Pages/TabPage/styles";
import * as S from "./styles";

const data01 = [
  {
    name: "Group A",
    value: 400,
  },
  {
    name: "Group B",
    value: 300,
  },
  {
    name: "Group C",
    value: 300,
  },
  {
    name: "Group D",
    value: 200,
  },
  {
    name: "Group E",
    value: 278,
  },
  {
    name: "Group F",
    value: 189,
  },
];
const data02 = [
  {
    name: "Group A",
    value: 2400,
  },
  {
    name: "Group B",
    value: 4567,
  },
  {
    name: "Group C",
    value: 1398,
  },
  {
    name: "Group D",
    value: 9800,
  },
  {
    name: "Group E",
    value: 3908,
  },
  {
    name: "Group F",
    value: 4800,
  },
];

const Dashboard = () => {
  return (
    <>
      <TabPageStyle.Body>
        <S.Container width="50%">
          <ResponsiveContainer width={700} height="80%">
            <PieChart>
              <Pie
                data={data02}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={80}
                fill="#caae82"
                label
              />
            </PieChart>
          </ResponsiveContainer>
        </S.Container>
      </TabPageStyle.Body>
    </>
  );
};

export default Dashboard;
