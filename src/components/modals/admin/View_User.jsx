import MODAL_HEADER from "../../Modal_Header";
import INPUT from "../../input";

function VIEW_USER(props) {
  return (
    <dialog id="View_User" className="modal">
      <div className="modal-box p-12">
        <MODAL_HEADER heading={"User Details"} />

        <div className="grid gap-2 py-6">
          <INPUT
            n={"User Name"}
            p={"User Name"}
            v={props.user.name}
            f={() => {}}
            l={true}
          />
          <INPUT
            n={"Email"}
            p={"Email"}
            v={props.user.email}
            f={() => {}}
            l={true}
          />
          <INPUT
            n={"Password"}
            t={"Password"}
            v={props.user.password}
            f={() => {}}
            l={true}
          />
        </div>
      </div>
    </dialog>
  );
}

export default VIEW_USER;
