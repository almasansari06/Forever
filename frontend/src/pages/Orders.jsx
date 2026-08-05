import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext);
  const [ordersList, setOrdersList] = useState([]);

  const loadOrderData = async () => {
    try {
      const activeToken = token || localStorage.getItem('token');
      if (!activeToken) return;

      const response = await axios.post(
        backendUrl + '/api/order/userorders', 
        {}, 
        { headers: { token: activeToken } }
      );

      if (response.data.success) {
        setOrdersList(response.data.orders.reverse());
      }
    } catch (error) {
      console.log("Error loading orders:", error);
    }
  }

  // Cancel Order Handler
  const cancelOrderHandler = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      const activeToken = token || localStorage.getItem('token');
      const response = await axios.post(
        backendUrl + '/api/order/cancel',
        { orderId },
        { headers: { token: activeToken } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        loadOrderData(); // List refresh karein
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className='border-t pt-16 min-h-[60vh]'>

      <div className='text-2xl mb-6'>
        <Title text1={'MY '} text2={'ORDERS'} />
      </div>

      <div className='space-y-6'>
        {ordersList.map((order, orderIndex) => (
          <div key={orderIndex} className='border rounded-lg p-4 bg-gray-50/50 space-y-4 shadow-xs'>
            
            {/* Order Header Info */}
            <div className='flex flex-wrap justify-between items-center text-xs text-gray-500 pb-2 border-b gap-2'>
              <p><span className='font-semibold text-gray-700'>Order ID:</span> {order._id}</p>
              <p><span className='font-semibold text-gray-700'>Date:</span> {new Date(order.date).toDateString()}</p>
              <p><span className='font-semibold text-gray-700'>Payment:</span> <span className='uppercase'>{order.paymentMethod}</span></p>
            </div>

            {/* Items inside this Order */}
            {order.items.map((item, itemIndex) => (
              <div key={itemIndex} className='flex items-start gap-4 text-sm bg-white p-3 rounded-md border border-gray-100'>
                <img className='w-16 h-16 rounded-md object-cover border' src={item.image[0]} alt={item.name} />
                <div className='flex-1'>
                  <p className='font-medium text-gray-900'>{item.name}</p>
                  <p className='text-gray-600 mt-0.5'>{currency}{item.price} | Qty: {item.quantity} | Size: {item.size}</p>
                </div>
              </div>
            ))}

            {/* Footer with Status and Cancel Button */}
            <div className='flex flex-wrap justify-between items-center pt-2 gap-3'>
              
              {/* Order Status */}
              <div className='flex items-center gap-2'>
                <p className={`w-3 h-3 rounded-full ${
                  order.status === 'Order Cancelled' || order.status === 'Cancelled' ? 'bg-red-500' : 
                  order.status === 'Delivered' ? 'bg-green-500' : 'bg-amber-500'
                }`}></p>
                <p className='font-semibold text-gray-800 text-sm sm:text-base'>
                  Status: <span className={order.status === 'Order Cancelled' || order.status === 'Cancelled' ? 'text-red-600' : 'text-black'}>{order.status}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className='flex items-center gap-3'>
                <button 
                  onClick={loadOrderData} 
                  className='border border-gray-300 px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md hover:bg-gray-100 active:scale-95 transition-all cursor-pointer'
                >
                  Track Status
                </button>

                {/* Cancel Button - Shows if not Delivered or Cancelled */}
                {order.status !== 'Delivered' && order.status !== 'Order Cancelled' && order.status !== 'Cancelled' && (
                  <button
                    onClick={() => cancelOrderHandler(order._id)}
                    className='bg-red-600 text-white hover:bg-red-700 px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md active:scale-95 transition-all cursor-pointer shadow-xs'
                  >
                    Cancel Order
                  </button>
                )}
              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders;
