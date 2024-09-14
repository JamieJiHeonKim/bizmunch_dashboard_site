import React, { useEffect, useState } from 'react';
import MODAL_HEADER from "../../Modal_Header";
import { ClipLoader } from 'react-spinners';
import { get_image } from '../../../services/api';

function VIEW_RESTAURANT(props) {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchImages = async () => {
      try {
        const logoUrl = props.restaurant.logo ? await get_image(props.restaurant.logo) : "/path/to/default/or/error/image.png";
        setImageUrl(logoUrl);
      } catch (error) {
        console.error("Error fetching images:", error);
        setImageUrl("/path/to/default/or/error/image.png");
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [props.restaurant]);

  return (
    <dialog id="View_Restaurant" className="modal">
      <div className="modal-box p-12">
        <MODAL_HEADER heading={"Restaurant Info"} />

        <div>
          {[
            { label: "Restaurant Name", value: props.restaurant.name },
            { label: "Restaurant Email Domain", value: props.restaurant.domain },
            { label: "Manager Name", value: props.restaurant.managerName },
            { label: "Manager Email", value: props.restaurant.managerEmail },
            { label: "Location", value: props.restaurant.location },
            { label: "Number of Employees", value: props.restaurant.employeesCount || 0 },
            { label: "Number of Managers", value: props.restaurant.managersCount || 0 },
            { label: "Category", value: props.restaurant.category }
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
          <div className="grid p-2">
            {loading ? (
              <ClipLoader loading={loading} size={150} />
            ) : (
              <>
                <div>
                  <h1>Logo</h1>
                  <img src={imageUrl} alt="Restaurant Logo" style={{ width: '100%', display: 'block', margin: 'auto' }} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default VIEW_RESTAURANT;