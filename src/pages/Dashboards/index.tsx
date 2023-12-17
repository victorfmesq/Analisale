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
