import { useState } from "react";
import DATE_PICKER from "../../Date_Picker";
import MODAL_HEADER from "../../Modal_Header";
import INPUT from "../../input";
import { Manager_Create_Transaction } from "../../../services/api";
import toast from "react-hot-toast";

function CreateTransaction(props) {
  const [date, setdate] = useState(new Date());
  const [quantity, setquantity] = useState(0);
  const [profit, setprofit] = useState(0);
  const [discount, setdiscount] = useState(0);
  const [productCost, setproductCost] = useState(0);
  const [productName, setproductName] = useState("");
  const [loading, setloading] = useState(false);

  async function handlepost() {
    try {
      setloading(true);
      const res = await Manager_Create_Transaction({
        productName: productName.toLowerCase(),
        quantity,
        profit,
        productCost,
        discount,
        date: date.toString(),
      });
      if (res.status === 201) {
        document.getElementById("Create Transaction").close();
        toast.success("product created successfully");
        setdiscount(0);
        setprofit(0);
        setquantity(0);
        setproductCost(0);
        setproductName("");
        props.refresh();
      }
    } catch (error) {
    } finally {
      setloading(false);
    }
  }

  return (
    <dialog id="Create Transaction" className="modal">
      <div className="modal-box p-12">
        <MODAL_HEADER heading={"Input Product"} />
        <div className="flex flex-col gap-2 my-4">
          <INPUT
            v={productName}
            f={setproductName}
            n="Product Name"
            p="Enter product name"
          />
          <INPUT
            v={productCost}
            f={setproductCost}
            n="Product Cost"
            p="Enter Product Cost"
            t="number"
          />
          <INPUT
            v={quantity}
            f={setquantity}
            n="Quantity Solid"
            p="Enter Quantity"
            t="number"
          />
          <INPUT
            v={profit}
            f={setprofit}
            n="Profit"
            p="Enter propfit"
            t="number"
          />
          <div>
            <h1 className="mb-2">Date</h1>
            <DATE_PICKER date={date} set={setdate} loading={loading} />
          </div>
          <INPUT
            v={discount}
            f={setdiscount}
            t="number"
            n="Discount"
            p={"Amount in % or Fixed amount"}
          />
        </div>

        <button
          onClick={handlepost}
          disabled={
            productName === "" ||
            !quantity ||
            !profit ||
            !discount ||
            loading ||
            !productCost
          }
          className="btn text-white bg-[#F58549] w-full"
        >
          Submit
        </button>
      </div>
    </dialog>
  );
}

export default CreateTransaction;
