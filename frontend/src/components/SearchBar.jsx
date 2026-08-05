import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Agar user collection page par nahi hai aur search bar me type kar raha hai,
  // toh auto redirect karke Collection page par results dikhayega
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query && !location.pathname.includes('collection')) {
      navigate('/collection');
    }
  };

  return showSearch ? (
    <div className='border-t border-b bg-gray-50/80 backdrop-blur-sm text-center py-2 transition-all duration-300'>
      <div className='inline-flex items-center justify-center border border-gray-300 bg-white px-5 py-2 my-2 mx-3 rounded-full w-3/4 sm:w-1/2 shadow-xs focus-within:border-black transition-all'>
        <input
          value={search}
          onChange={handleSearchChange}
          className='flex-1 outline-none bg-transparent text-sm text-gray-800 placeholder-gray-400'
          type="text"
          placeholder='Search products, categories...'
          autoFocus
        />
        <img className='w-4 opacity-60' src={assets.search_icon} alt="Search Icon" />
      </div>
      
      <img
        onClick={() => {
          setShowSearch(false);
          setSearch('');
        }}
        className='inline w-3.5 cursor-pointer opacity-60 hover:opacity-100 transition-opacity ml-2'
        src={assets.cross_icon}
        alt="Close Icon"
      />
    </div>
  ) : null;
};

export default SearchBar;
