import React from 'react';
import './partition.css';

const Partition = ({ id, color, split }) => {
  return (
    <div className="partition" style={{ backgroundColor: color }}>
      <div className="button-container">
        <button onClick={() => split(id, 'V')} className="split-button">
          V
        </button>
        <button onClick={() => split(id, 'H')} className="split-button">
          H
        </button>
      </div>
    </div>
  );
};

export default Partition;
