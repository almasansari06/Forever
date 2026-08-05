import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query && !location.pathname.includes('collection')) {
      navigate('/collection');
    }
  };

  return (
    <AnimatePresence>
      {showSearch && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className='border-t border-b bg-gray-50/90 backdrop-blur-md text-center py-3 shadow-xs'
        >
          <div className='inline-flex items-center justify-center border border-gray-300 bg-white px-5 py-2 mx-3 rounded-full w-3/4 sm:w-1/2 shadow-xs focus-within:border-black focus-within:ring-2 focus-within:ring-black/10 transition-all'>
            <input
              value={search}
              onChange={handleSearchChange}
              className='flex-1 outline-none bg-transparent text-sm text-gray-800 placeholder-gray-400'
              type="text"
              placeholder='Search products, categories...'
              autoFocus
            />
            <img className='w-4 opacity-60 hover:opacity-100 transition-opacity' src={assets.search_icon} alt="Search Icon" />
          </div>

          <motion.img
            whileHover={{ rotate: 90, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setShowSearch(false);
              setSearch('');
            }}
            className='inline w-3.5 cursor-pointer opacity-60 hover:opacity-100 ml-2 transition-opacity'
            src={assets.cross_icon}
            alt="Close Icon"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;
