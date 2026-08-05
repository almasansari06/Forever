import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setShowFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice(0);

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    // Apply Sorting along with Filter
    switch (sortType) {
      case 'low-high':
        productsCopy.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        productsCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setShowFilterProducts(productsCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products, sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        {/* Categories Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2 cursor-pointer'>
              <input className='w-3 cursor-pointer' type="checkbox" value={"Men"} onChange={toggleCategory} />Men
            </p>
            <p className='flex gap-2 cursor-pointer'>
              <input className='w-3 cursor-pointer' type="checkbox" value={"Women"} onChange={toggleCategory} />Women
            </p>
            <p className='flex gap-2 cursor-pointer'>
              <input className='w-3 cursor-pointer' type="checkbox" value={"Kids"} onChange={toggleCategory} />Kids
            </p>
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2 cursor-pointer'>
              <input className='w-3 cursor-pointer' type="checkbox" value={"Topwear"} onChange={toggleSubCategory} />Topwear
            </p>
            <p className='flex gap-2 cursor-pointer'>
              <input className='w-3 cursor-pointer' type="checkbox" value={"Bottomwear"} onChange={toggleSubCategory} />Bottomwear
            </p>
            <p className='flex gap-2 cursor-pointer'>
              <input className='w-3 cursor-pointer' type="checkbox" value={"Winterwear"} onChange={toggleSubCategory} />Winterwear
            </p>
            <p className='flex gap-2 cursor-pointer'>
              <input className='w-3 cursor-pointer' type="checkbox" value={"Innerwear"} onChange={toggleSubCategory} />Innerwear
            </p>
            <p className='flex gap-2 cursor-pointer'>
              <input className='w-3 cursor-pointer' type="checkbox" value={"Footwear"} onChange={toggleSubCategory} />Footwear
            </p>
            <p className='flex gap-2 cursor-pointer'>
              <input className='w-3 cursor-pointer' type="checkbox" value={"Jewelry"} onChange={toggleSubCategory} />jewellery
            </p>
            <p className='flex gap-2 cursor-pointer'>
              <input className='w-3 cursor-pointer' type="checkbox" value={"MakeUp"} onChange={toggleSubCategory} />Makeup
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>

        <div className='flex justify-between items-center text-base sm:text-2xl mb-6'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          
          {/* Enhanced Product Sort Select Box */}
          <select 
            onChange={(e) => setSortType(e.target.value)} 
            className='border-2 border-gray-300 hover:border-black text-xs sm:text-sm px-3 py-2 rounded-md outline-none bg-white cursor-pointer transition-all shadow-sm'
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Price: Low to High</option>
            <option value="high-low">Sort by: Price: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
        </div>

      </div>
    </div>
  );
};

export default Collection;
