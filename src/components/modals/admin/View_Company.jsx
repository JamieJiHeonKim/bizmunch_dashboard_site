import React from 'react';
import MODAL_HEADER from "../../Modal_Header";

function VIEW_COMPNY(props) {
  return (
    <dialog id="View_Company" className="modal">
      <div className="modal-box p-12">
        <MODAL_HEADER heading={"Company Info"} />

        <div>
          {[
            { label: "Company Name", value: props.company.name },
            { label: "Company Email Domain", value: props.company.domain },
            { label: "Location", value: props.company.location },
            { label: "Manager Name", value: props.company.managerName },
            { label: "Manager Email", value: props.company.managerEmail },
            { label: "Number of Employees", value: props.company.numberOfEmployees || 0 },
            { label: "Billing Cycle", value: props.company.billingCycle },
            { label: "Monthly Cost", value: props.company.monthlyCost },
            { label: "Status", value: props.company.status },
            { label: "Invitation Code", value: props.company.invitationCode }
          ].map((item, index) => (
            <div className="grid p-2" key={index}>
              <h1>{item.label}</h1>
              <input
                disabled
                value={item.value}
                className="p-2 border rounded-md my-2 bg-gray-200 cursor-not-allowed"
                style={{ color: '#6b7280', borderColor: '#d1d5db' }}
              />
            </div>
          ))}
        </div>
      </div>
    </dialog>
  );
}

export default VIEW_COMPNY;
