import { Close } from "@mui/icons-material";

function MODAL_HEADER(props) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="font-bold text-[28px]">{props.heading}</h1>
      <CLOSE />
    </div>
  );
}

export default MODAL_HEADER;

function CLOSE() {
  return (
    <form method="dialog">
      <button className="btn btn-xs p-0 m-0 font-bold text-lg outline-none">
        <Close />
      </button>
    </form>
  );
}
