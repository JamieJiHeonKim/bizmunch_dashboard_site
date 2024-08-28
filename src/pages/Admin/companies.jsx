import { useSelector } from "react-redux";
import { selectUser } from "../../redux/states/user";
import {
  Add,
  DeleteOutline,
  EditOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import AdminLayout from "../../layout/Admin";
import CREATE_COMPANY from "../../components/modals/admin/Create_Company";
import { useEffect, useState } from "react";
import { Admin_Get_Companies } from "../../services/api";
import DELETE_COMPANY from "../../components/modals/admin/Delete_Company";
import EDIT_COMPANY from "../../components/modals/admin/Edit_Company";
import VIEW_COMPNY from "../../components/modals/admin/View_Company";
import ProfileButton from "../../components/Profile_Btn";

function Companies() {
  const [loading, setlaoding] = useState(false);
  const [companies, setcompanies] = useState([]);
  const [company, setcompany] = useState({});
  const user = useSelector(selectUser);

  async function fetchdata() {
    try {
      setlaoding(true);
      const res = await Admin_Get_Companies();
      setcompanies(res);
    } catch (err) {
    } finally {
      setlaoding(false);
    }
  }

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <AdminLayout>
      <VIEW_COMPNY company={company} />
      <CREATE_COMPANY refresh={() => fetchdata()} />
      <DELETE_COMPANY refresh={() => fetchdata()} company={company} />
      <EDIT_COMPANY refresh={() => fetchdata()} company={company} />
      <div className=" w-full h-full ">
        <div className="flex justify-end">
          <ProfileButton name={user?.name} redir="/admin/signin" />
        </div>
        <div className="flex justify-between my-4">
          <div className="flex gap-2 items-center justify-center">
            <h1 className="text-[#F58549] text-2xl font-medium ">Companies</h1>
            {loading && (
              <span className="loading loading-spinner loading-sm text-[#F58549]"></span>
            )}
          </div>
          <button
            onClick={() =>
              document.getElementById("Create_Company").showModal()
            }
            className="btn text-white bg-[#F58549] "
          >
            <Add />New Company
          </button>
        </div>
      </div>

      <div>
        <Header />
        {companies.map((company, index) => (
          <Item
            setcompany={setcompany}
            company={company}
            companyEmail={company.email}
            companyName={company.name}
            companyManagers={company.managersCount || 0}
            companyEmployees={company.employeesCount || 0}
            key={index}
          />
        ))}
      </div>
    </AdminLayout>
  );
}

export default Companies;

function Header() {
  return (
    <div className="grid grid-cols-6 bg-[#FDECE2] text-[#667085] px-4 p-2 font-medium text-xs">
      <h1>Company Name</h1>
      <h1>Status</h1>
      <h1>Manager Name</h1>
      <h1>Manager Email</h1>
      <h1>Employees</h1>
      <h1>Actions</h1>
    </div>
  );
}

function Item(props) {
  return (
    <div className="grid grid-cols-6 border-b text-[#667085] px-4 p-2 font-medium text-xs">
      <a
        href={`/admin/company/${props.company._id}/${props.company.name}`}
        className=" text-[#101828]"
      >
        {props.companyName}
      </a>
      <h1>{props.company.status}</h1>
      <h1>{props.company.managerName}</h1>
      <h1>{props.company.managerEmail}</h1>
      <h1>{props.companyEmployees}</h1>
      <div
        className="text-xs text-[#F58549] flex gap-4"
        onClick={() => {
          props.setcompany(props.company);
        }}
      >
        <button
          className="outline-none"
          onClick={() => document.getElementById("View_Company").showModal()}
        >
          <VisibilityOutlined style={{ fontSize: "20px" }} />
        </button>
        <button
          className="outline-none"
          onClick={() => document.getElementById("Edit_Company").showModal()}
        >
          <EditOutlined style={{ fontSize: "20px" }} />
        </button>
        <button
          className="outline-none"
          onClick={() => document.getElementById("Delete_Company").showModal()}
        >
          <DeleteOutline style={{ fontSize: "20px" }} />
        </button>
      </div>
    </div>
  );
}
