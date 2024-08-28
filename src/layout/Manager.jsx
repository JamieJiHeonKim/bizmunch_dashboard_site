import { Toaster } from "react-hot-toast";
import SideBar from "../components/Manager/Sidebar";

function ManagerLayout({ children }) {
  return (
    <div className={`   w-full`}>
      <Toaster />
      <div className="flex h-screen overflow-hidden w-full">
        <SideBar />
        <div className="flex h-screen overflow-hidden right-0 w-full">
          <div className="w-full no-scrollbar relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden ">
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 ">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerLayout;
