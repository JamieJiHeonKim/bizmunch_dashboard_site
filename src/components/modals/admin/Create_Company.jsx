import React, { useEffect, useState, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MODAL_HEADER from '../../Modal_Header';
import { Admin_Create_Company } from '../../../services/api';
import toast from 'react-hot-toast';

const generateInvitationCode = () => {
  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';

  let code = '';
  for (let i = 0; i < 2; i++) {
    code += upperChars.charAt(Math.floor(Math.random() * upperChars.length));
  }
  for (let i = 0; i < 3; i++) {
    code += lowerChars.charAt(Math.floor(Math.random() * lowerChars.length));
  }
  for (let i = 0; i < 3; i++) {
    code += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  return code.split('').sort(() => 0.5 - Math.random()).join('');
};

function CREATE_COMPANY({ refresh }) {
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [managerName, setManagerName] = useState('');
  const [managerEmail, setManagerEmail] = useState('');
  const [numberOfEmployees, setNumberOfEmployees] = useState(0);
  const [billingCycle, setBillingCycle] = useState(new Date());
  const [monthlyCost, setMonthlyCost] = useState(0);
  const [invitationCode, setInvitationCode] = useState('');
  const [status, setStatus] = useState('active');

  const resetForm = useCallback(() => {
    setDomain('');
    setName('');
    setLocation('');
    setManagerName('');
    setManagerEmail('');
    setNumberOfEmployees(0);
    setBillingCycle(new Date());
    setMonthlyCost(0);
    setInvitationCode(generateInvitationCode());
    setStatus('active');
  }, []);

  useEffect(() => {
    setInvitationCode(generateInvitationCode());
  }, []);

  const handlePost = useCallback(async () => {
    const formData = {
      name,
      domain,
      location,
      managerName,
      managerEmail,
      numberOfEmployees,
      billingCycle,
      monthlyCost,
      invitationCode,
      status
    };

    setLoading(true);
    try {
      const response = await Admin_Create_Company(formData);
      if (response) {
        document.getElementById('Create_Company').close();
        toast.success('Company Created Successfully');
        refresh();
        resetForm();
      } else {
        toast.error('Creating a Company Failed.');
      }
    } catch (error) {
      console.error('Network or server error', error);
      toast.error('Network or server error');
    } finally {
      setLoading(false);
    }
  }, [name, domain, location, managerName, managerEmail, numberOfEmployees, billingCycle, monthlyCost, invitationCode, status, refresh, resetForm]);

  return (
    <dialog id="Create_Company" className="modal">
      <div className="modal-box p-12">
        <MODAL_HEADER heading="Company Info" />
        <div className="flex flex-col gap-6 mt-8">
          <div className="flex flex-col gap-2">
            <h1>Company Name</h1>
            <input
              disabled={loading}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md p-2 outline-sky-200"
              placeholder="Enter Company Name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1>Company Email Domain</h1>
            <input
              disabled={loading}
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              type="text"
              className="w-full border rounded-md p-2 outline-sky-200"
              placeholder="example.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1>Location</h1>
            <input
              disabled={loading}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              className="w-full border rounded-md p-2 outline-sky-200"
              placeholder="Enter Address"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1>Manager Name</h1>
            <input
              disabled={loading}
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
              type="text"
              className="w-full border rounded-md p-2 outline-sky-200"
              placeholder="Enter Manager Name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1>Manager Email</h1>
            <input
              disabled={loading}
              value={managerEmail}
              onChange={(e) => setManagerEmail(e.target.value)}
              type="email"
              className="w-full border rounded-md p-2 outline-sky-200"
              placeholder="Enter Manager Email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1>Number of Employees</h1>
            <input
              disabled={loading}
              value={numberOfEmployees}
              onChange={(e) => setNumberOfEmployees(e.target.value)}
              type="number"
              className="w-full border rounded-md p-2 outline-sky-200"
              placeholder="Enter Number of Employees"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1>Billing Cycle</h1>
            <DatePicker
              selected={billingCycle}
              onChange={(date) => setBillingCycle(date)}
              disabled={loading}
              className="w-full border rounded-md p-2 outline-sky-200"
              placeholderText="Select Billing Cycle Date"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1>Monthly Cost</h1>
            <input
              disabled={loading}
              value={monthlyCost}
              onChange={(e) => setMonthlyCost(e.target.value)}
              type="number"
              className="w-full border rounded-md p-2 outline-sky-200"
              placeholder="Enter Monthly Cost"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1>Status</h1>
            <select
              disabled={loading}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-md p-2 outline-sky-200"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="terminated">Terminated</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <h1>Invitation Code</h1>
            <input
              disabled
              value={invitationCode}
              className="w-full border rounded-md p-2 outline-sky-200"
              placeholder="Invitation Code"
            />
          </div>

          <button
            onClick={handlePost}
            disabled={loading || !name || !domain || !location || !managerName || !managerEmail || !numberOfEmployees || !billingCycle || !monthlyCost}
            className="btn text-white bg-[#F58549]"
          >
            Create
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default CREATE_COMPANY;
