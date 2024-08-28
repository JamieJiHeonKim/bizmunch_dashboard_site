import { useEffect, useState } from 'react';
import MODAL_HEADER from '../../Modal_Header';
import { Admin_Edit_Company } from '../../../services/api';
import toast from 'react-hot-toast';

function EDIT_COMPANY({ company, refresh }) {
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [managerName, setManagerName] = useState('');
  const [managerEmail, setManagerEmail] = useState('');
  const [numberOfEmployees, setNumberOfEmployees] = useState(0);
  const [billingCycle, setBillingCycle] = useState('');
  const [monthlyCost, setMonthlyCost] = useState(0);
  const [status, setStatus] = useState(company.status || 'active');

  useEffect(() => {
    if (company) {
      setName(company.name || '');
      setDomain(company.domain || '');
      setLocation(company.location || '');
      setManagerName(company.managerName || '');
      setManagerEmail(company.managerEmail || '');
      setNumberOfEmployees(company.numberOfEmployees || 0);
      setBillingCycle(company.billingCycle || '');
      setMonthlyCost(company.monthlyCost || 0);
      setStatus(company.status || 'active');
    }
  }, [company]);

  const resetForm = () => {
    setName('');
    setDomain('');
    setLocation('');
    setManagerName('');
    setManagerEmail('');
    setNumberOfEmployees(0);
    setBillingCycle('');
    setMonthlyCost(0);
    setStatus(company.status || 'active');
  };

  const handlePost = async () => {
    const formData = {
      name,
      domain,
      location,
      managerName,
      managerEmail,
      numberOfEmployees,
      billingCycle,
      monthlyCost,
      status,
    };

    setLoading(true);
    try {
      const response = await Admin_Edit_Company(company._id, formData);
      if (response) {
        document.getElementById('Edit_Company').close();
        toast.success('Company Edited Successfully');
        refresh();
        resetForm();
      } else {
        toast.error('Editing Company Failed.');
      }
    } catch (error) {
      console.error('Network or server error', error);
      toast.error('Network or server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="Edit_Company" className="modal">
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
            <input
              disabled={loading}
              value={billingCycle}
              onChange={(e) => setBillingCycle(e.target.value)}
              type="text"
              className="w-full border rounded-md p-2 outline-sky-200"
              placeholder="Enter Billing Cycle"
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

          <button
            onClick={handlePost}
            disabled={loading}
            className="btn text-white bg-[#F58549]"
          >
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default EDIT_COMPANY;
