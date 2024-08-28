import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ProfitChart(props) {
  const [filter, setfilter] = useState("weekly");
  const [profit_amount, setprofit_amount] = useState("");
  const [profit_perctage, setprofit_perctage] = useState("");
  const [preformance, setpreformance] = useState({});

  useEffect(() => {
    if (filter === "weekly" && props.data && props.data["weekly"]) {
      const performanceData = calculateWeeklyPerformance(props.data["weekly"]);
      setpreformance(performanceData);
      setprofit_perctage(performanceData.percentageDifference);
      setprofit_amount(performanceData.latestWeek.totalProfit);
    } else if (filter === "daily") {
      const performanceData = calculateTotalDailyProfit(props.data["daily"]);
      setprofit_amount(performanceData.totalProfit.toString());
      setprofit_perctage(
        performanceData.betterThanLastDayPercentage.toString()
      );
    } else if (filter === "monthly") {
      const performanceData = calculateMonthlyprofit(props.data["monthly"]);
      setprofit_amount(performanceData.profit.toString());
      setprofit_perctage(performanceData.precentage.toString());
    } else if (filter === "yearly") {
      const performanceData = calculateYearlyprofit(props.data["yearly"]);
      setprofit_amount(performanceData.profit.toString());
      setprofit_perctage(performanceData.precentage.toString());
    } else {
      // If data is empty or not available, reset state values
      setpreformance({});
      setprofit_amount("~");
      setprofit_perctage("~");
    }
  }, [props.data, filter]);

  return (
    <div className="w-full h-[35vh]">
      <h1 className="my-2  text-gray-400">Profit</h1>
      <div className="w-full h-[35vh] rounded-md p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-black font-medium text-2xl">
              ${profit_amount}
            </h1>
            <p>
              <span
                className={`${
                  profit_perctage.includes("-")
                    ? "text-red-500"
                    : "text-green-500"
                } font-medium`}
              >
                {!profit_perctage.includes("-") && <span>+</span>}
                {profit_perctage}%
              </span>
              <span className="text-gray-400"> from last period</span>
            </p>
          </div>
          <div className="flex gap-4 font-medium text-gray-400 text-sm">
            <button
              className={`${filter === "daily" ? "text-[#F58549]" : ""}`}
              onClick={() => {
                setfilter("daily");
              }}
            >
              Day
            </button>
            <button
              className={`${filter === "weekly" ? "text-[#F58549]" : ""}`}
              onClick={() => {
                setfilter("weekly");
              }}
            >
              Week
            </button>
            <button
              className={`${filter === "monthly" ? "text-[#F58549]" : ""}`}
              onClick={() => {
                setfilter("monthly");
              }}
            >
              Month
            </button>
            <button
              className={`${filter === "yearly" ? "text-[#F58549]" : ""}`}
              onClick={() => {
                setfilter("yearly");
              }}
            >
              Year
            </button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={
              filter === "weekly" && props.data["weekly"]
                ? props.data["weekly"][props.data["weekly"].length - 1]["days"]
                : props.data[filter]
            }
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 40,
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F58549" stopOpacity={0.6} />
                <stop offset="60%" stopColor="#F58549" stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="period"
              className="font-medium text-xs text-black "
            />
            <YAxis
              dataKey="profit"
              className="font-medium text-xs text-gray-100"
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="linear"
              dataKey="profit"
              stroke="#F58549"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ProfitChart;

function calculateWeeklyPerformance(data) {
  // Sort the weeks by date

  data.sort((a, b) => new Date(a.week) - new Date(b.week));

  // Calculate the total profit for each week
  const totalProfit = (week) =>
    week.days.reduce((acc, day) => acc + day.profit, 0);

  // Get the latest week and the previous week
  const latestWeek = data[data.length - 1];
  const previousWeek = data[data.length - 2];

  const latestWeekProfit = totalProfit(latestWeek);
  const previousWeekProfit = totalProfit(previousWeek);

  // Calculate the percentage difference
  let percentageDifference;
  if (previousWeekProfit === 0) {
    percentageDifference = latestWeekProfit > 0 ? 100 : 0;
  } else {
    percentageDifference =
      ((latestWeekProfit - previousWeekProfit) / previousWeekProfit) * 100;
  }

  return {
    latestWeek: {
      week: latestWeek.week,
      totalProfit: latestWeekProfit,
    },
    previousWeek: {
      week: previousWeek.week,
      totalProfit: previousWeekProfit,
    },
    percentageDifference: percentageDifference.toFixed(2),
  };
}
function calculateTotalDailyProfit(dailyData) {
  if (!dailyData || dailyData.length === 0) {
    return {
      totalProfit: "0.00",
      betterThanLastDayPercentage: "0.00%",
    };
  }
  dailyData.sort((a, b) => new Date(a.period) - new Date(b.period));

  // Find the last day's profit
  const Profit = dailyData[dailyData.length - 1].profit;
  const Lastprofit = dailyData[dailyData.length - 2].profit;

  // Calculate how much today's profit is better than the last day's profit in percentage
  const betterThanLastDayPercentage = (
    ((Profit - Lastprofit) / Lastprofit) *
    100
  ).toFixed(2);

  return {
    totalProfit: dailyData[dailyData.length - 1].profit.toString(),
    betterThanLastDayPercentage: betterThanLastDayPercentage.toString() + "%",
  };
}

function calculateMonthlyprofit(data) {
  if (!data || data.length === 0) {
    return {
      profit: "0.00",
      precentage: "0.00%",
    };
  }
  const currentMonthIndex = new Date().getMonth();
  const lastMonthIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;

  const currentMonthProfit = data[currentMonthIndex].profit;
  const lastMonthProfit = data[lastMonthIndex].profit;

  const betterThanLastDayPercentage = (
    ((currentMonthProfit - lastMonthProfit) / lastMonthProfit) *
    100
  ).toFixed(2);

  return {
    profit: currentMonthProfit.toString(),
    precentage: betterThanLastDayPercentage.toString(),
  };
}

function calculateYearlyprofit(data) {
  if (!data || data.length === 0) {
    return {
      profit: "0.00",
      precentage: "0.00%",
    };
  }
  const currentYearIndex = data.length - 1;
  const lastYearIndex = currentYearIndex - 1;
  const currentYearProfit = data[currentYearIndex].profit;
  const lastYearProfit = data[lastYearIndex].profit;
  const betterThanLastDayPercentage = (
    ((currentYearProfit - lastYearProfit) / lastYearProfit) *
    100
  ).toFixed(2);
  return {
    profit: currentYearProfit.toString(),
    precentage: betterThanLastDayPercentage.toString(),
  };
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white rounded-md p-4 shadow-md text-sm min-w-[80px]">
        <p className="font-medium text-black">Profit</p>
        <p className="text-[#F58549]">${`${payload[0].value}`}</p>
        <p className="text-gray-600 text-xs">{label}</p>
      </div>
    );
  }

  return null;
};
