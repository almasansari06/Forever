import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

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
        let allOrdersItem = [];
        
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            // New clean object for state stability
            allOrdersItem.push({
              ...item,
              orderId: order._id,
              status: order.status || 'Order Placed',
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date
            });
          });
        });

        setOrderData(allOrdersItem.reverse());
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

      <div className='space-y-4'>
        {orderData.map((item, index) => {
          // Flexible status check
          const currentStatus = (item.status || '').toLowerCase();
          const isCancelled = currentStatus.includes('cancel');
          const isDelivered = currentStatus.includes('deliver');
          const canCancel = !isCancelled && !isDelivered;

          return (
            <div key={index} className='py-4 border-t border-b border-gray-200 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              
              {/* Product Info */}
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20 rounded-md object-cover border' src={item.image[0]} alt={item.name} />
                <div>
                  <p className='sm:text-base font-medium text-gray-900'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                    <p className='font-semibold'>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-1 text-xs text-gray-500'>
                    Date: <span className='text-gray-600'>{new Date(item.date).toDateString()}</span>
                  </p>
                  <p className='mt-1 text-xs text-gray-500'>
                    Payment: <span className='text-gray-600 uppercase font-medium'>{item.paymentMethod}</span>
                  </p>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className='md:w-1/2 flex justify-between items-center gap-3'>
                
                {/* Status Indicator */}
                <div className='flex items-center gap-2 min-w-[120px]'>
                  <p className={`w-2.5 h-2.5 rounded-full ${isCancelled ? 'bg-red-500' : isDelivered ? 'bg-green-500' : 'bg-amber-500'}`}></p>
                  <p className={`text-sm sm:text-base font-medium ${isCancelled ? 'text-red-600' : 'text-gray-800'}`}>
                    {item.status}
                  </p>
                </div>

                {/* Buttons */}
                <div className='flex gap-2 items-center'>
                  <button 
                    onClick={loadOrderData} 
                    className='border border-gray-300 px-4 py-2 text-xs sm:text-sm font-medium rounded-md hover:bg-gray-50 active:scale-95 transition-all cursor-pointer'
                  >
                    Track Order
                  </button>

                  {/* Cancel Button */}
                  {canCancel && (
                    <button
                      onClick={() => cancelOrderHandler(item.orderId)}
                      className='border border-red-500 text-red-600 hover:bg-red-600 hover:text-white px-3 py-2 text-xs sm:text-sm font-medium rounded-md active:scale-95 transition-all cursor-pointer shadow-xs'
                    >
                      Cancel Order
                    </button>
                  )}
                </div>

              </div>

            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Orders;
