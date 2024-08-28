import { useEffect, useState } from "react";
import PopularProducts from "../../components/Admin/PopularProducts";
import AdminLayout from "../../layout/Admin";
import { useParams } from "react-router-dom";
import { Get_Company_Details } from "../../services/api";
import RecentTransaction from "../../components/Manager/Recent_Transaction";
import { calculateProfits } from "../../services/profit_calculator";
import ProfitChart from "../../components/Profit_Chart";
import ProfileButton from "../../components/Profile_Btn";
import { ArrowBack } from "@mui/icons-material";

function CompanyDetails() {
  const { id, name } = useParams();
  const [popularproducts, setpopularproducts] = useState([]);
  const [transactions, settransactions] = useState([]);
  const [profit, setprofit] = useState([]);

  async function fetchdata() {
    const res = await Get_Company_Details(id);
    if (res.data.transactions.length !== 0) {
      setprofit(calculateProfits(res.data.transactions));
    }
    setpopularproducts(res.data.popularProducts);
    settransactions(res.data.transactions);
  }

  useEffect(() => {
    fetchdata();
  }, [id]);

  return (
    <AdminLayout>
      <div className=" flex items-center justify-between">
        <div className=" font-medium  ">
          <div className="flex items-center gap-4">
            <a href="/admin/companies">
              <ArrowBack className=" text-[#F58549]" />
            </a>
            <h1 className="text-[28px] text-[#F58549]">{name}</h1>
          </div>
          <div>
            <h1 className="text-[18px] text-[#979797]">
              Hey there, Hope your are having a Great Day!
            </h1>
          </div>
        </div>

        <div>
          <ProfileButton name="Admin" redir="/admin/signin" />
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
    </AdminLayout>
  );
}

export default CompanyDetails;
