import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import * as TabPageStyle from "../../components/Pages/TabPage/styles";
import * as S from "./styles";
import useTableData from "../../context/TableDataContext/useTableData";
import { useEffect, useState } from "react";
import isNullOrUndefinedOrEmpty from "../../utils/isNullOrUndefinedOrEmpty";

interface ProductData {
  name: string;
  estoque: number;
  vendas: number;
  saleValue: number;
  purchaseValue: number;
  id?: string;
}

const data: ProductData[] = [
  {
    name: "Product 1",
    estoque: 40,
    vendas: 25,
    saleValue: 60,
    purchaseValue: 30,
  },
  {
    name: "Product 2",
    estoque: 15,
    vendas: 10,
    saleValue: 45,
    purchaseValue: 15,
  },
  {
    name: "Product 3",
    estoque: 35,
    vendas: 18,
    saleValue: 55,
    purchaseValue: 25,
  },
  {
    name: "Product 4",
    estoque: 25,
    vendas: 15,
    saleValue: 70,
    purchaseValue: 35,
  },
  {
    name: "Product 5",
    estoque: 30,
    vendas: 20,
    saleValue: 75,
    purchaseValue: 40,
  },
  {
    name: "Product 6",
    estoque: 22,
    vendas: 12,
    saleValue: 65,
    purchaseValue: 30,
  },
  {
    name: "Product 7",
    estoque: 18,
    vendas: 8,
    saleValue: 50,
    purchaseValue: 20,
  },
  {
    name: "Product 8",
    estoque: 28,
    vendas: 22,
    saleValue: 80,
    purchaseValue: 45,
  },
  {
    name: "Product 9",
    estoque: 32,
    vendas: 17,
    saleValue: 68,
    purchaseValue: 32,
  },
  {
    name: "Product 10",
    estoque: 19,
    vendas: 14,
    saleValue: 53,
    purchaseValue: 18,
  },
  {
    name: "Product 11",
    estoque: 21,
    vendas: 13,
    saleValue: 58,
    purchaseValue: 22,
  },
  {
    name: "Product 12",
    estoque: 26,
    vendas: 19,
    saleValue: 63,
    purchaseValue: 28,
  },
  {
    name: "Product 13",
    estoque: 33,
    vendas: 16,
    saleValue: 72,
    purchaseValue: 38,
  },
  {
    name: "Product 14",
    estoque: 24,
    vendas: 11,
    saleValue: 49,
    purchaseValue: 16,
  },
  {
    name: "Product 15",
    estoque: 29,
    vendas: 23,
    saleValue: 78,
    purchaseValue: 42,
  },
  {
    name: "Product 16",
    estoque: 37,
    vendas: 27,
    saleValue: 88,
    purchaseValue: 50,
  },
  {
    name: "Product 17",
    estoque: 31,
    vendas: 24,
    saleValue: 85,
    purchaseValue: 48,
  },
  {
    name: "Product 18",
    estoque: 23,
    vendas: 21,
    saleValue: 79,
    purchaseValue: 44,
  },
  {
    name: "Product 19",
    estoque: 36,
    vendas: 26,
    saleValue: 82,
    purchaseValue: 46,
  },
  {
    name: "Product 20",
    estoque: 34,
    vendas: 29,
    saleValue: 90,
    purchaseValue: 55,
  },
];

const pieData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string | number;
}

const Dashboard = () => {
  const [productData, setProductData] = useState<ProductData[]>([]);

  const { products, sales } = useTableData();

  useEffect(() => {
    // fillProductData
    let prodData: ProductData[] = [];

    sales.forEach((sale) => {
      sale.products.forEach((p) => {
        const soldProduct = products.find((pp) => pp.id === p.id);
        const soldProductAmount = p.amount;

        if (soldProduct) {
          if (prodData.map((i) => i.id).includes(p.id)) {
            prodData = prodData.map((pData) =>
              pData.id === p.id
                ? {
                    ...pData,
                    vendas: pData.vendas + soldProductAmount,
                  }
                : pData,
            );
          } else {
            const { name, purchaseValue, saleValue, id } = soldProduct;

            prodData.push({
              id,
              name,
              purchaseValue,
              saleValue,
              estoque: soldProduct.amount,
              vendas: soldProductAmount,
            });
          }
        }
      });
    });

    setProductData(prodData);
  }, []);

  const CustomBarChartTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      const productData = payload[0]?.payload;

      const totalSaleValue = productData.saleValue * productData.vendas;

      const totalPurchaseStorageValue =
        productData.purchaseValue * productData.estoque;

      const totalSalesStorageValue =
        productData.saleValue * productData.estoque;

      const totalPurchaseValue =
        productData.purchaseValue * (productData.estoque + productData.vendas);

      const result = totalSaleValue - totalPurchaseValue;

      return (
        <S.TooltipWrapper>
          <S.Label>{`${label}`}</S.Label>
          {/* <S.Intro>Insights for {productData.name}</S.Intro> */}
          <S.InsightsWrapper>
            <S.Insight color="#029dbc">Vendas: {productData.vendas}</S.Insight>
            <S.Insight color="#e1992d">
              Estoque: {productData.estoque}
            </S.Insight>
            <S.Insight>
              Valor unitário de venda: {productData.saleValue}
            </S.Insight>
            <S.Insight>
              Valor unitário de compra : {productData.purchaseValue}
            </S.Insight>
            <S.Insight color={"#48ab4e"}>
              Valor total de vendas: {totalSaleValue}
            </S.Insight>
            <S.Insight color={"#ab4848"}>
              Valor total de compras: {totalPurchaseValue}
            </S.Insight>
            <S.Insight>
              Valor investido em estoque: {totalPurchaseStorageValue}
            </S.Insight>
            <S.Insight>
              Valor para retorno em estoque: {totalSalesStorageValue}
            </S.Insight>
            <S.Insight color={result > 0 ? "#02bc0e" : "#bc0202"}>
              {"Retorno"} atual: {result}
            </S.Insight>
          </S.InsightsWrapper>
        </S.TooltipWrapper>
      );
    }

    return null;
  };

  return (
    <>
      <TabPageStyle.Body style={{ flexDirection: "column" }}>
        <S.Container column heigth="100%">
          <S.ChartTitle>Vendas e Estoques</S.ChartTitle>

          {!isNullOrUndefinedOrEmpty(productData) ? (
            <ResponsiveContainer>
              <BarChart data={productData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis dataKey="estoque" />
                <YAxis
                  dataKey="vendas"
                  yAxisId="left"
                  orientation="left"
                  stroke="#029dbc"
                />
                <YAxis
                  dataKey="estoque"
                  yAxisId="right"
                  orientation="right"
                  stroke="#e1992d"
                />
                <Tooltip content={<CustomBarChartTooltip />} />

                <Legend />
                <Bar dataKey="vendas" fill="#029dbc" />
                <Bar dataKey="estoque" fill="#e1992d" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ alignSelf: "center" }}>
              Não existem vendas cadastradas.
            </div>
          )}
        </S.Container>
        <div></div>
        {/*
        <div style={{ display: "flex", gap: "10px" }}>
          <S.Container width="50%">
            <ResponsiveContainer>
              <PieChart width={730} height={250}>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={50}
                  fill="#8884d8"
                />
              </PieChart>
            </ResponsiveContainer>
          </S.Container>
          <S.Container column width="50%">
            <S.ChartTitle>Encargos mais utilizados</S.ChartTitle>

            <ResponsiveContainer>
              <PieChart width={730} height={250}>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={50}
                  fill="#8884d8"
                />
              </PieChart>
            </ResponsiveContainer>
          </S.Container>
        </div> */}
      </TabPageStyle.Body>
    </>
  );
};

export default Dashboard;
