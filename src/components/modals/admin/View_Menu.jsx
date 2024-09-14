import React, { useState, useEffect } from 'react';
import MODAL_HEADER from '../../Modal_Header';
import { get_image } from '../../../services/api';

function VIEW_MENU({ menu }) {
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchImages = async () => {
            try {
                const barcodeUrl = menu.barcode ? await get_image(menu.barcode) : '/path/to/default/or/error/image.png';
                setImageUrl(barcodeUrl);
            } catch (error) {
                console.error('Error fetching images:', error);
                setImageUrl('/path/to/default/or/error/image.png');
            } finally {
                setLoading(false);
            }
        };

        if (menu) {
            fetchImages();
        }
    }, [menu]);

    return (
        <dialog id="View_Menu" className="modal">
            <div className="modal-box p-12">
                <MODAL_HEADER heading="View Menu Item" />

                <div className="flex flex-col gap-6 mt-8">
                    {[
                        { label: 'Menu Name', value: menu.name },
                        { label: 'Type of Menu', value: menu.type },
                        { label: 'Price', value: menu.price },
                        { label: 'Calories', value: menu.calories },
                        { label: 'Description', value: menu.description },
                        { label: 'Discount Status', value: menu.discount ? 'Yes' : 'No' },
                    ].map((item, index) => (
                        <div className="flex flex-col gap-2" key={index}>
                            <h1>{item.label}</h1>
                            <input
                                disabled
                                value={item.value}
                                className="w-full border rounded-md p-2 outline-sky-200 bg-gray-200 cursor-not-allowed"
                            />
                        </div>
                    ))}

                    <div className="flex flex-col gap-2">
                        <h1>Menu Discount Barcode</h1>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <>
                                {imageUrl && (
                                    <img src={imageUrl} alt="Menu Barcode" className="mt-4 w-full h-auto" />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </dialog>
    );
}

export default VIEW_MENU;