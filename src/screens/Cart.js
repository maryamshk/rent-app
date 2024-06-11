import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  const [dateRanges, setDateRanges] = useState({});
  const [dateError, setDateError] = useState('');

  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-2' style={{ color: "#feb47b" }}>Your cart is empty</div>
      </div>
    );
  }

  const calculateDays = (start, end) => {
    if (!start || !end) return 0;

    const diffTime = Math.abs(end - start);    //difference of one object from another in milliseconds 
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;   //convert milliseconds difference into day difference
    return diffDays;
  };

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem('userEmail');
    try {
      let response = await fetch('http://localhost:5000/api/orderData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          total_price: totalPrice
        }),
      });
      dispatch({ type: 'DROP' });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleStartDateChange = (index, date) => {
    setDateRanges(prev => {
      const endDate = prev[index]?.endDate;
      if (endDate && date > endDate) {
        setDateError('Start date cannot be after end date.');
        return prev;
      } else {
        setDateError('');
        return { ...prev, [index]: { ...prev[index], startDate: date } };
      }
    });
  };

  const handleEndDateChange = (index, date) => {
    setDateRanges(prev => {
      const startDate = prev[index]?.startDate;
      if (startDate && date < startDate) {
        setDateError('End date cannot be before start date.');
        return prev;
      } else {
        setDateError('');
        return { ...prev, [index]: { ...prev[index], endDate: date } };
      }
    });
  };

  const rentalDays = data.reduce((total, _, index) => {
    const { startDate, endDate } = dateRanges[index] || {};
    return total + calculateDays(startDate, endDate);
  }, 0);

  const totalPrice = data.reduce((total, item, index) => {
    const { startDate, endDate } = dateRanges[index] || {};
    const days = calculateDays(startDate, endDate);
    return total + item.price * days;
  }, 0);

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
          <thead className='fs-4' style={{ color: "#feb47b" }}>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Amount</th>
              <th scope='col'>Start Date</th>
              <th scope='col'>End Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const { startDate, endDate } = dateRanges[index] || {};
              return (
                <tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => handleStartDateChange(index, date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      minDate={new Date()}
                    />
                  </td>
                  <td>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => handleEndDateChange(index, date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate || new Date()}
                    />
                  </td>
                  <td>
                    <button type='button' className='btn p-0'>
                      <DeleteIcon onClick={() => { dispatch({ type: 'REMOVE', index: index }); }} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {dateError && <div style={{ color: 'red' }}>{dateError}</div>}
        <div>
          <h1 className='fs-2'>Total Price: ${totalPrice}/-</h1>
        </div>
        <div>
          <button className='btn mt-5' style={{ backgroundColor: "#feb47b", color: 'white' }} onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
