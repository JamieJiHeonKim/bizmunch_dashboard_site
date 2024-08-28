import { Add } from "@mui/icons-material";
import AdminLayout from "../../layout/Admin";
import { useEffect, useState } from "react";
import CREATE_NOTIFICATION from "../../components/modals/admin/Create_Notification";
import { Admin_Get_All_Notifications } from "../../services/api";
import { timeAgo } from "../../services/function";
import ProfileButton from "../../components/Profile_Btn";

function Notifications() {
  const [loading, setLoading] = useState(true);
  const [notifications, setnotifications] = useState([]);

  async function fetchdata() {
    try {
      setLoading(true);
      const res = await Admin_Get_All_Notifications();
      res.data.forEach((element) => {
        element.timeago = timeAgo(element.createdAt);
      });
      setnotifications(res.data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <AdminLayout>
      <CREATE_NOTIFICATION refresh={fetchdata} />
      <div>
        <div className="flex justify-end">
          <ProfileButton name="Admin" redir="/admin/signin" />
        </div>
        <div className="flex justify-between my-4">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-[#F58549] text-2xl font-medium ">
              Notifications
            </h1>
            {loading && (
              <span className="loading loading-spinner loading-sm text-[#F58549]"></span>
            )}
          </div>
          <button
            onClick={() =>
              document.getElementById("create notification").showModal()
            }
            className="btn text-white bg-[#F58549] "
          >
            <Add /> New Notifications
          </button>
        </div>
        <div>
          {notifications.map((item) => (
            <Notification
              key={item._id}
              heading={item.text}
              sentTo={item?.companyDetails?.name}
              time={item.timeago}
            />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Notifications;

function Notification(props) {
  return (
    <div className="border-b p-2 flex justify-between ">
      <div>
        <h1>{props.heading}</h1>
        <p className="text-sm ">
          <span className="text-[#667085]">Sent To </span>
          <span className="text-[#F58549]">{props.sentTo}</span>
        </p>
      </div>
      <div className="flex items-top justify-center">
        <h1 className="text-[#667085] text-nowrap"> {props.time}</h1>
      </div>
    </div>
  );
}
