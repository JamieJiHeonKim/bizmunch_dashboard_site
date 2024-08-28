import { useEffect, useState } from "react";
import ProfileButton from "../../components/Profile_Btn";
import EmployeeLayout from "../../layout/Employee";
import { Get_Company_Details } from "../../services/api";
import { calculateProfits } from "../../services/profit_calculator";
import ProfitChart from "../../components/Profit_Chart";
import RecentTransaction from "../../components/Manager/Recent_Transaction";
import PopularProducts from "../../components/Admin/PopularProducts";

function Dashboard() {
  const [loading, setloading] = useState(false);
  const [company] = useState(sessionStorage.getItem("company"));
  const [companyId] = useState(sessionStorage.getItem("companyid"));

  const [popularproducts, setpopularproducts] = useState([]);
  const [transactions, settransactions] = useState([]);
  const [profit, setprofit] = useState([]);

  async function fetchdata() {
    try {
      setloading(true);
      const res = await Get_Company_Details(companyId);
      if (res.data.transactions.length !== 0) {
        setprofit(calculateProfits(res.data.transactions));
      }
      setpopularproducts(res.data.popularProducts);
      settransactions(res.data.transactions);
    } catch (err) {
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    fetchdata();
  }, [companyId]);

  return (
    <EmployeeLayout>
      <div className="flex justify-end">
        <ProfileButton name="Employee" redir="/employee/signin" />
      </div>
      <div className="flex justify-between my-4">
        <div className="flex items-center justify-center gap-2">
          <div className=" font-medium">
            <div className="flex gap-2 items-center">
              <h1 className="text-[28px] text-[#F58549]">{company}</h1>
              {loading && (
                <span className="loading loading-spinner loading-sm text-[#F58549]"></span>
              )}
            </div>
            <h1 className="text-[18px] text-[#979797]">
              Hey there, Hope your are having a Great Day!
            </h1>
          </div>
        </div>
      </div>
      <div className=" w-full h-[40vh]">
        <ProfitChart data={profit} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <RecentTransaction data={transactions} />
        </div>
        <div>
          <PopularProducts data={popularproducts} />
        </div>
      </div>
    </EmployeeLayout>
  );
}

export default Dashboard;
