import AdminLayout from "../../layout/Admin";

function main() {
  return (
    <AdminLayout>
      <div className=" w-full h-full ">
        <div className="flex justify-between items-start">
          <div className=" font-medium">
            <h1 className="text-[28px] text-[#F58549]">Base Corporation</h1>
            <h1 className="text-[18px] text-[#979797]">
              Hey there, Hope your are having a Great Day!
            </h1>
          </div>
          <select className="border-[#D9D9D9] border rounded-md w-[135px] p-2 text-[#F58549] font-medium outline-none">
            <option>Admin</option>
            <option>User</option>
          </select>
        </div>
      </div>
    </AdminLayout>
  );
}

export default main;
