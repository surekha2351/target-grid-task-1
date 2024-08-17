import React, { useState } from 'react';

function LabelManager({ labels, setLabels }) {
  const [newLabel, setNewLabel] = useState('');

  const addLabel = () => {
    const label = { id: Date.now(), name: newLabel };
    setLabels([...labels, label]);
    setNewLabel('');
  };

  return (
    <div>
      <input
        type="text"
        value={newLabel}
        onChange={(e) => setNewLabel(e.target.value)}
        placeholder="New Label"
      />
      <button onClick={addLabel}>Add Label</button>
      <ul>
        {labels.map(label => (
          <li key={label.id}>{label.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default LabelManager;
