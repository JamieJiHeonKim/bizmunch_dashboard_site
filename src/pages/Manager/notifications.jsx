import { useEffect, useState } from "react";
import { Manager_Get_Notifications } from "../../services/api";
import { timeAgo } from "../../services/function";
import ManagerLayout from "../../layout/Manager";
import { RestartAlt, Restore } from "@mui/icons-material";
import ProfileButton from "../../components/Profile_Btn";

function Notifications() {
  const [loading, setLoading] = useState(true);
  const [notifications, setnotifications] = useState([]);

  async function fetchdata() {
    try {
      setLoading(true);
      const res = await Manager_Get_Notifications();
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
    <ManagerLayout>
      <div>
        <div className="flex justify-end">
          <ProfileButton name="Manager" redir="/manager/signin" />
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
          <div>
            <button
              disabled={loading}
              onClick={fetchdata}
              className="btn btn-xs p-0 m-0 bg-slate-200"
            >
              <RestartAlt />
            </button>
          </div>
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
    </ManagerLayout>
  );
}

export default Notifications;

function Notification(props) {
  return (
    <div className="border-b p-2 flex justify-between ">
      <div>
        <h1>{props.heading}</h1>
      </div>
      <div className="flex items-top justify-center">
        <h1 className="text-[#667085] text-nowrap "> {props.time}</h1>
      </div>
    </div>
  );
}
