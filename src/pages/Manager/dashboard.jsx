import { useEffect, useState } from "react";
import ManagerLayout from "../../layout/Manager";
import {
  Add,
  ArrowDownward,
  ArrowDropDown,
  Logout,
  MoveDown,
  SwipeDown,
} from "@mui/icons-material";
import CreateTransaction from "../../components/modals/manager/Create_Transaction";
import { Manager_Get_Transactions } from "../../services/api";
import toast from "react-hot-toast";
import RecentTransaction from "../../components/Manager/Recent_Transaction";
import PopularProducts from "../../components/Manager/Popular_Products";
import ProfitChart from "../../components/Profit_Chart";
import { calculateProfits } from "../../services/profit_calculator";
import ProfileButton from "../../components/Profile_Btn";

function ManagerDash() {
  const [transactions, settransaction] = useState([]);
  const [loading, setloading] = useState(false);
  const [profit, setprofit] = useState([]);
  const [company] = useState(sessionStorage.getItem("company"));

  async function fetchdata() {
    try {
      setloading(true);
      const res = await Manager_Get_Transactions();

      if (!res.status === 200) {
        return toast.error("Transactions Get Error");
      }
      await settransaction(res.data.reverse());
      if (transactions.length > 0) {
        setprofit(calculateProfits(res.data));
      }
    } catch (err) {
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    fetchdata();
  }, []);
  
  return (
    <ManagerLayout>
      <CreateTransaction refresh={fetchdata} />
      <div className="flex justify-end">
        {loading && (
          <span className="loading loading-spinner loading-sm text-[#F58549]"></span>
        )}
        <ProfileButton name="Manager" redir="/manager/signin" />
      </div>
      <div className="flex justify-between my-4">
        <div className="flex items-center justify-center gap-2">
          <div className=" font-medium">
            <h1 className="text-[28px] text-[#F58549]">{company}</h1>
            <h1 className="text-[18px] text-[#979797]">
              Hey there, Hope your are having a Great Day!
            </h1>
          </div>
        </div>
        <div>
          <button
            onClick={() =>
              document.getElementById("Create Transaction").showModal()
            }
            className="btn text-white bg-[#F58549] outline-none"
          >
            <Add />
            Add Transaction
          </button>
        </div>
      </div>

      <div className=" w-full h-[40vh]">
        <ProfitChart data={profit} />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2">
          <RecentTransaction data={transactions} />
        </div>
        <PopularProducts />
      </div>
    </ManagerLayout>
  );
}

export default ManagerDash;
