import { Warning } from "@mui/icons-material";
import { formatDate } from "../../services/function";

function RecentTransaction(props) {
  return (
    <div>
      <h1 className="text-[17px] font-medium">Recent Transcation</h1>
      <Header />
      <div className="h-[280px] overflow-y-scroll scrollbar-custom ">
        {props.data.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center font-medium text-lg  gap-4 ">
            <Warning />
            <h1>Not Enough Data</h1>
          </div>
        ) : (
          props.data.map((item) => <Item key={item._id} data={item} />)
        )}
      </div>
    </div>
  );
}

export default RecentTransaction;

function Header() {
  return (
    <div className="grid grid-cols-5 font-medium text-[13px] my-3">
      <h1>Date</h1>
      <h1>Product Name</h1>
      <h1>Profit</h1>
      <h1>Quantity</h1>
      <h1>Discount</h1>
    </div>
  );
}

function Item(props) {
  return (
    <div className="grid grid-cols-5  font-medium text-[13px] my-3 text-[#979797]">
      <h1>{formatDate(props.data.date)}</h1>
      <h1>{props.data.productName}</h1>
      <h1>{props.data.profit}%</h1>
      <h1>{props.data.quantity}</h1>
      <h1>{props.data.discount}%</h1>
    </div>
  );
}
