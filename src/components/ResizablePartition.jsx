import React from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const ResizablePartition = ({ children, width, height }) => {
  return (
    <ResizableBox
      width={width}
      height={height}
      minConstraints={[100, 100]}
      maxConstraints={[Infinity, Infinity]}
      className="resizable-partition"
    >
      {children}
    </ResizableBox>
  );
};

export default ResizablePartition;
