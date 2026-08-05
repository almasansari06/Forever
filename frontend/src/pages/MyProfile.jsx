import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
    const { token, backendUrl, navigate } = useContext(ShopContext);
    
    const [userData, setUserData] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    
    // Address & Phone State
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: 'India'
    });

    // Profile Data Fetch
    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/user/get-profile', {
                headers: { token }
            });

            if (response.data.success) {
                setUserData(response.data.user);
                if (response.data.user.phone) setPhone(response.data.user.phone);
                if (response.data.user.address) setAddress(response.data.user.address);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Update Profile Function
    const handleUpdateProfile = async () => {
        try {
            const response = await axios.post(
                backendUrl + '/api/user/update-profile',
                { phone, address },
                { headers: { token } }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                setIsEdit(false);
                fetchUserProfile();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (token) {
            fetchUserProfile();
        } else {
            navigate('/login');
        }
    }, [token]);

    if (!userData) {
        return <div className='text-center py-20 text-gray-500 font-medium'>Loading Profile...</div>;
    }

    return (
        <div className='max-w-2xl mx-auto pt-10 px-4'>
            <div className='inline-flex items-center gap-2 mb-6'>
                <p className='prata-regular text-2xl sm:text-3xl font-medium'>MY PROFILE</p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
            </div>

            <div className='bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm'>
                
                {/* User Header Info */}
                <div className='flex items-center gap-4 pb-6 border-b border-gray-100'>
                    <div className='w-16 h-16 bg-black text-white text-2xl font-bold flex items-center justify-center rounded-full uppercase'>
                        {userData.name ? userData.name.charAt(0) : 'U'}
                    </div>
                    <div>
                        <h2 className='text-xl font-bold text-gray-900'>{userData.name}</h2>
                        <p className='text-sm text-gray-500'>{userData.email}</p>
                    </div>
                </div>

                {/* Contact Info */}
                <div className='space-y-4'>
                    <p className='text-xs font-bold text-gray-900 uppercase tracking-wider'>Contact Information</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm'>
                        <div>
                            <p className='text-gray-400 font-medium text-xs mb-1'>Full Name / Username</p>
                            <p className='text-gray-800 font-medium'>{userData.name}</p>
                        </div>
                        <div>
                            <p className='text-gray-400 font-medium text-xs mb-1'>Email Address</p>
                            <p className='text-gray-800 font-medium'>{userData.email}</p>
                        </div>
                        <div>
                            <p className='text-gray-400 font-medium text-xs mb-1'>Phone Number</p>
                            {isEdit ? (
                                <input 
                                    type="text" 
                                    value={phone} 
                                    onChange={(e) => setPhone(e.target.value)} 
                                    placeholder="+91 9876543210"
                                    className='border border-gray-300 rounded-lg px-3 py-1.5 w-full outline-none focus:border-black text-sm'
                                />
                            ) : (
                                <p className='text-gray-800 font-medium'>{phone || 'Not provided'}</p>
                            )}
                        </div>
                    </div>
                </div>

                <hr className='border-gray-100' />

                {/* Address Section */}
                <div className='space-y-4'>
                    <p className='text-xs font-bold text-gray-900 uppercase tracking-wider'>Saved Delivery Address</p>

                    {isEdit ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm'>
                            <input 
                                type="text" 
                                placeholder="Street / House No." 
                                value={address.street || ''} 
                                onChange={(e) => setAddress({...address, street: e.target.value})} 
                                className='sm:col-span-2 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-black'
                            />
                            <input 
                                type="text" 
                                placeholder="City" 
                                value={address.city || ''} 
                                onChange={(e) => setAddress({...address, city: e.target.value})} 
                                className='border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-black'
                            />
                            <input 
                                type="text" 
                                placeholder="State" 
                                value={address.state || ''} 
                                onChange={(e) => setAddress({...address, state: e.target.value})} 
                                className='border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-black'
                            />
                            <input 
                                type="text" 
                                placeholder="Zipcode / Pincode" 
                                value={address.zipcode || ''} 
                                onChange={(e) => setAddress({...address, zipcode: e.target.value})} 
                                className='border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-black'
                            />
                            <input 
                                type="text" 
                                placeholder="Country" 
                                value={address.country || 'India'} 
                                onChange={(e) => setAddress({...address, country: e.target.value})} 
                                className='border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-black'
                            />
                        </div>
                    ) : (
                        <div className='bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm text-gray-700 space-y-1'>
                            {address && address.street ? (
                                <>
                                    <p className='font-medium text-gray-900'>{address.street}</p>
                                    <p>{address.city}, {address.state} - {address.zipcode}</p>
                                    <p>{address.country}</p>
                                </>
                            ) : (
                                <p className='text-gray-400 italic'>No default delivery address saved yet.</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Edit & Save Action Buttons */}
                <div className='pt-4 flex justify-end gap-3'>
                    {isEdit ? (
                        <>
                            <button 
                                onClick={() => setIsEdit(false)} 
                                className='px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer'
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleUpdateProfile} 
                                className='px-6 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer shadow-xs'
                            >
                                Save Changes
                            </button>
                        </>
                    ) : (
                        <button 
                            onClick={() => setIsEdit(true)} 
                            className='px-6 py-2 border border-black text-black hover:bg-black hover:text-white rounded-lg text-sm font-medium transition-all cursor-pointer'
                        >
                            Edit Profile & Address
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default MyProfile;
