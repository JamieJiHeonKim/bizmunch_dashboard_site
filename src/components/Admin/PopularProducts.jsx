import { Warning } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { PieChart, Legend, Pie, Cell } from "recharts";

const COLORS = ["#0D2535", "#5388D8", "#F4BE37", "#FF9F40", "#884401"];

function PopularProducts(props) {
  const [products, setproducts] = useState([]);
  useEffect(() => {
    let tem = props.data;
    tem.forEach((product) => {
      product.name = product._id;
    });
    setproducts(tem);
  }, [props.data]);
  return (
    <div className="bg-white rounded-md shadow-md flex items-center flex-col pb-3 px-3">
      <div className="w-full">
        <h1 className="text-[17px] font-medium my-3">Popular Products</h1>
      </div>
      {products.length === 0 ? (
        <div className="h-[300px] flex items-center justify-center font-medium text-lg  gap-4 ">
          <Warning />
          <h1>Not Enough Data</h1>
        </div>
      ) : (
        <PieChart width={400} height={300}>
          <Pie
            data={products}
            dataKey="totalQuantitySold"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={120}
            fill="#82ca9d"
            labelLine={false}
            label={renderCustomizedLabel}
            stroke="none"
            strokeWidth={0}
          >
            {products?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend wrapperStyle={{ fontSize: "12px" }} />
        </PieChart>
      )}
    </div>
  );
}

export default PopularProducts;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.25;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      fontWeight={"semi-bold"}
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
