import RDatePicker from "react-datepicker";
import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";

import { format } from "date-fns";
import { DateRangeOutlined } from "@mui/icons-material";

function DATE_PICKER(props) {
  return (
    <div className="bg-white border p-2 rounded-md flex justify-between">
      <RDatePicker
        disabled={props.loading}
        className="border rounded-md pl-2  "
        selected={props.date}
        onChange={(date) => {
          props.set(format(date, "yyyy-MM-dd"));
        }}
        dateFormat="dd/MM/yyyy"
        todayButton="Today"
        customInput={
          <input
            className="w-80 border-none  outline-none"
            placeholder="DD/MM/YYYY"
          ></input>
        }
      />
      <DateRangeOutlined />
    </div>
  );
}

export default DATE_PICKER;
