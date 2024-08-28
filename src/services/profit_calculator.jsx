// Helper function to parse date
const parseDate = (dateStr) => new Date(dateStr);

// Helper function to format date to YYYY-MM-DD
const formatDate = (date) => date.toISOString().split("T")[0];

// Function to add days to a date
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
const getWeekDayName = (date) =>
  date.toLocaleDateString("en-US", { weekday: "long" });

// Function to get all dates in a range
const getAllDatesInRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    dates.push(formatDate(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  return dates;
};
// Helper function to get the start of the week (Sunday)
const getStartOfWeek = (date) => {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay());
  return start;
};

// Function to calculate profits
export const calculateProfits = (data) => {
  // Sort data by date
  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Find the date range
  const startDate = parseDate(data[0].date);
  const endDate = parseDate(data[data.length - 1].date);
  const allDates = getAllDatesInRange(startDate, endDate);

  // Initialize profit objects with all dates set to 0
  let dailyProfits = {};
  let weeklyProfits = {};
  let yearlyProfits = {};

  let currentDate = new Date(startDate);

  let monthlyProfits = {};
  const currentYear = startDate.getFullYear();
  for (let month = 0; month < 12; month++) {
    const currentDate = new Date(currentYear, month, 1);
    const monthName = currentDate.toLocaleString("default", { month: "short" });
    monthlyProfits[`${monthName}`] = 0;
  }

  allDates.forEach((date) => {
    dailyProfits[date] = 0;
    const weekDay = getWeekDayName(new Date(date));
    if (!weeklyProfits[weekDay]) weeklyProfits[weekDay] = 0;
    const [year, month, day] = date.split("-");
    if (!yearlyProfits[year]) yearlyProfits[year] = 0;
  });

  // Calculate profits months
  data.forEach((record) => {
    const date = parseDate(record.date);
    const year = date.getFullYear();
    const monthName = date.toLocaleString("default", { month: "short" });
    const monthKey = `${monthName}`;
    const totalRevenue = record.productCost * record.quantity;
    const profitAmount = (record.profit / 100) * totalRevenue;
    if (monthlyProfits[monthKey] !== undefined) {
      monthlyProfits[monthKey] += profitAmount;
    }
  });

  // Add last 5 years to yearly profits
  const lastYear = endDate.getFullYear();
  for (let i = 0; i < 5; i++) {
    const year = lastYear - i;
    if (!yearlyProfits[year.toString()]) yearlyProfits[year.toString()] = 0;
  }

  // Initialize weekly profits with all weeks and days set to 0
  const weeks = {};
  let currentWeekStart = getStartOfWeek(startDate);
  while (currentWeekStart <= endDate) {
    const weekKey = formatDate(currentWeekStart);
    weeks[weekKey] = {};
    for (let i = 0; i < 7; i++) {
      const day = addDays(currentWeekStart, i);
      weeks[weekKey][getWeekDayName(day)] = 0;
    }
    currentWeekStart = addDays(currentWeekStart, 7);
  }

  // Calculate profits
  data.forEach((record) => {
    const date = formatDate(parseDate(record.date));
    const weekDay = getWeekDayName(new Date(date));
    const weekKey = formatDate(getStartOfWeek(parseDate(record.date)));
    const [year, month, day] = date.split("-");

    const totalRevenue = record.productCost * record.quantity;
    const profitAmount = (record.profit / 100) * totalRevenue;

    dailyProfits[date] += profitAmount;
    weeks[weekKey][weekDay] += profitAmount;
    yearlyProfits[year] += profitAmount;
  });

  // Convert objects to arrays for the final result
  const dailyResult = Object.entries(dailyProfits).map(([period, profit]) => ({
    period,
    profit,
  }));
  const weeklyResult = Object.entries(weeks).map(([week, days]) => ({
    week,
    days: Object.entries(days).map(([day, profit]) => ({
      period: day,
      profit,
    })),
  }));
  const monthlyResult = Object.entries(monthlyProfits).map(
    ([period, profit]) => ({ period, profit })
  );
  const yearlyResult = Object.entries(yearlyProfits).map(
    ([period, profit]) => ({ period, profit })
  );

  return {
    daily: dailyResult,
    weekly: weeklyResult,
    monthly: monthlyResult,
    yearly: yearlyResult,
  };
};

// Function to calculate weekly profits
export const calculateWeeklyProfits = (data) => {
  // Sort data by date
  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Find the date range
  const startDate = parseDate(data[0].date);
  const endDate = parseDate(data[data.length - 1].date);
  const allDates = getAllDatesInRange(startDate, endDate);

  // Initialize weekly profits with all weeks and days set to 0
  const weeks = {};
  let currentWeekStart = getStartOfWeek(startDate);
  while (currentWeekStart <= endDate) {
    const weekKey = formatDate(currentWeekStart);
    weeks[weekKey] = {};
    for (let i = 0; i < 7; i++) {
      const day = addDays(currentWeekStart, i);
      weeks[weekKey][formatDate(day)] = 0;
    }
    currentWeekStart = addDays(currentWeekStart, 7);
  }

  // Calculate profits
  data.forEach((record) => {
    const date = formatDate(parseDate(record.date));
    const weekKey = formatDate(getStartOfWeek(parseDate(record.date)));

    const totalRevenue = record.productCost * record.quantity;
    const profitAmount = (record.profit / 100) * totalRevenue;

    weeks[weekKey][date] += profitAmount;
  });

  return weeks;
};

export const calculateLatestAndPreviousWeekProfits = (weeklyProfits) => {
  const weekKeys = Object.keys(weeklyProfits).sort(
    (a, b) => new Date(b) - new Date(a)
  );
  const latestWeekKey = weekKeys[0];
  const previousWeekKey = weekKeys[1];

  const latestWeek = weeklyProfits[latestWeekKey];
  const previousWeek = weeklyProfits[previousWeekKey];

  const totalLatestWeekProfit = Object.values(latestWeek).reduce(
    (acc, profit) => acc + profit,
    0
  );
  const totalPreviousWeekProfit = Object.values(previousWeek).reduce(
    (acc, profit) => acc + profit,
    0
  );

  const percentageChange =
    ((totalLatestWeekProfit - totalPreviousWeekProfit) /
      totalPreviousWeekProfit) *
    100;

  return {
    latestWeek: {
      week: latestWeekKey,
      days: Object.entries(latestWeek).map(([day, profit]) => ({
        day,
        profit,
      })),
      totalProfit: totalLatestWeekProfit,
    },
    previousWeek: {
      week: previousWeekKey,
      days: Object.entries(previousWeek).map(([day, profit]) => ({
        day,
        profit,
      })),
      totalProfit: totalPreviousWeekProfit,
    },
    percentageChange,
  };
};
