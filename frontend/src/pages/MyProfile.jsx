import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(ShopContext);
  const [isEdit, setIsEdit] = useState(false);

  // Profile update API call
  const updateUserProfileData = async () => {
    try {
      const response = await axios.post(
        backendUrl + '/api/user/update-profile',
        {
          name: userData.name,
          phone: userData.phone,
          address: userData.address,
          gender: userData.gender,
          dob: userData.dob,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await loadUserProfileData();
        setIsEdit(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // 1. Loading Guard: 'undefined' properties read karne se pehle wait karta hai
  if (!userData) {
    return (
      <div className='min-h-[50vh] flex items-center justify-center text-gray-500 font-medium'>
        Loading profile data...
      </div>
    );
  }

  return (
    <div className='max-w-lg flex flex-col gap-4 text-sm pt-5'>
      {/* Name Section */}
      <div className='flex flex-col gap-1'>
        {isEdit ? (
          <input
            className='bg-gray-100 text-3xl font-medium max-w-60 p-1 rounded border'
            type="text"
            value={userData.name || ''}
            onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
          />
        ) : (
          <p className='font-medium text-3xl text-neutral-800 border-b pb-2'>
            {userData.name}
          </p>
        )}
      </div>

      <hr className='bg-zinc-200 h-[1px] border-none' />

      {/* Contact Info */}
      <div>
        <p className='text-zinc-500 underline mt-3 font-semibold uppercase'>Contact Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userData.email}</p>

          <p className='font-medium'>Phone:</p>
          {isEdit ? (
            <input
              className='bg-gray-100 max-w-52 p-1 rounded border'
              type="text"
              value={userData.phone || ''}
              onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
            />
          ) : (
            <p className='text-blue-400'>{userData.phone || "0000000000"}</p>
          )}

          <p className='font-medium'>Address:</p>
          {isEdit ? (
            <div className='flex flex-col gap-1'>
              <input
                className='bg-gray-100 p-1 rounded border'
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...(prev.address || {}), line1: e.target.value }
                  }))
                }
                value={userData.address?.line1 || ''}
                type="text"
                placeholder="Address Line 1"
              />
              <input
                className='bg-gray-100 p-1 rounded border'
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...(prev.address || {}), line2: e.target.value }
                  }))
                }
                value={userData.address?.line2 || ''}
                type="text"
                placeholder="Address Line 2"
              />
            </div>
          ) : (
            <p className='text-gray-500'>
              {userData.address?.line1 || "No address added"}
              <br />
              {userData.address?.line2 || ""}
            </p>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div>
        <p className='text-zinc-500 underline mt-3 font-semibold uppercase'>Basic Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {isEdit ? (
            <select
              className='max-w-28 bg-gray-100 p-1 rounded border'
              onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
              value={userData.gender || 'Not Selected'}
            >
              <option value="Not Selected">Not Selected</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className='text-gray-500'>{userData.gender || "Not Selected"}</p>
          )}

          <p className='font-medium'>Birthday:</p>
          {isEdit ? (
            <input
              className='max-w-36 bg-gray-100 p-1 rounded border'
              type="date"
              onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
              value={userData.dob || ''}
            />
          ) : (
            <p className='text-gray-500'>{userData.dob || "Not Selected"}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className='mt-6'>
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className='border border-black px-8 py-2 rounded-full hover:bg-black hover:text-white transition-all'
          >
            Save information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className='border border-black px-8 py-2 rounded-full hover:bg-black hover:text-white transition-all'
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
