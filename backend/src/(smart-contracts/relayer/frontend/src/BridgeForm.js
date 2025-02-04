import React, { useState } from 'react';

const BridgeForm = () => {
  const [amount, setAmount] = useState('');
  const [destination, setDestination] = useState('');
  const [network, setNetwork] = useState('Ethereum');

  const handleBridge = async () => {
    const response = await fetch(`/bridge/${network.toLowerCase()}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, destination })
    });
    const data = await response.json();
    alert(`Transaction Hash: ${data.txHash}`);
  };

  return (
    <div>
      <h2>PiBridge</h2>
      <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <input type="text" placeholder="Destination Address" value={destination} onChange={e => setDestination(e.target.value)} />
      <select onChange={e => setNetwork(e.target.value)}>
        <option>Ethereum</option>
        <option>BSC</option>
      </select>
      <button onClick={handleBridge}>Bridge</button>
    </div>
  );
};

export default BridgeForm;


---
