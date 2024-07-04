import React, { useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../request/URL';

const PayoutForm = () => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('NEFT');
  const [accountDetails, setAccountDetails] = useState({
    name: '',
    ifsc: '',
    account_number: '',
  });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BaseUrl}/pay/create-payout`, {
        amount,
        method,
        accountDetails,
      });
      setStatus(`Payout created: ${response.data.payout._id}`);
      console.log(response);
    } catch (error) {
      setStatus(`Error: ${error.response.data.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <select value={method} onChange={(e) => setMethod(e.target.value)} required>
        <option value="NEFT">NEFT</option>
        <option value="IMPS">IMPS</option>
        <option value="UPI">UPI</option>
        <option value="wallet">Wallet</option>
      </select>
      <input
        type="text"
        value={accountDetails.name}
        onChange={(e) => setAccountDetails({ ...accountDetails, name: e.target.value })}
        placeholder="Account Holder Name"
        required
      />
      <input
        type="text"
        value={accountDetails.ifsc}
        onChange={(e) => setAccountDetails({ ...accountDetails, ifsc: e.target.value })}
        placeholder="IFSC Code"
        required
      />
      <input
        type="text"
        value={accountDetails.account_number}
        onChange={(e) => setAccountDetails({ ...accountDetails, account_number: e.target.value })}
        placeholder="Account Number"
        required
      />
      <button type="submit">Send Money</button>
      {status && <p>{status}</p>}
    </form>
  );
};

export default PayoutForm;

