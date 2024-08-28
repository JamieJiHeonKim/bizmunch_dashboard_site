import { useEffect, useState } from "react";
import { Get_Companies } from "../services/api";

function CompanyPicker(props) {
  const [loading, setloading] = useState(false);
  const [companies, setcompanies] = useState([]);

  async function fetchcompanies() {
    try {
      setloading(true);
      const res = await Get_Companies();
      setcompanies(res.data);
    } catch (err) {
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    fetchcompanies();
  }, []);

  return (
    <div className="grid">
      <h1>Comapny Name</h1>
      <select
        value={props.company}
        onChange={(e) => {
          props.set(e.target.value);
        }}
        disabled={loading}
        className="p-2 border rounded-md my-2 outline-sky-200"
      >
        <option value>none</option>
        {companies.map((company, index) => (
          <option key={index} value={company._id}>
            {company.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CompanyPicker;
