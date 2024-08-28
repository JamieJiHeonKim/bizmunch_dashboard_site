import { useEffect, useState } from "react";
import { Manager_Get_Popularproducts } from "../../services/api";
import toast from "react-hot-toast";
import { PieChart, Legend, Pie, Cell } from "recharts";

const COLORS = ["#0D2535", "#5388D8", "#F4BE37", "#FF9F40", "#884401"];

function PopularProducts() {
  const [products, setproducts] = useState([]);

  async function getproducts() {
    try {
      const res = await Manager_Get_Popularproducts();
      res.data.forEach((element) => {
        element.name = element._id;
      });
      setproducts(res.data);
    } catch (e) {
      toast.error(e.message);
    }
  }
  useEffect(() => {
    getproducts();
  }, []);
  return (
    <div className="bg-white rounded-md shadow-md flex items-center flex-col pb-3 px-3">
      <div className="w-full">
        <h1 className="text-[17px] font-medium my-3">Popular Products</h1>
      </div>
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
          {products.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend wrapperStyle={{ fontSize: "12px" }} />
      </PieChart>
    </div>
  );
}

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

export default PopularProducts;
