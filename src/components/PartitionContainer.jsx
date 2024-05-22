import React from 'react';
import ResizablePartition from './ResizablePartition';
import Partition from './Partition';
import './partitionContainer.css';

const PartitionContainer = ({ partitions, split, remove }) => {
  const renderPartitions = (partitions) => {
    return partitions.map((partition) => {
      if (partition.direction === null) {
        return (
          <ResizablePartition
            key={partition.id}
            width={partition.width}
            height={partition.height}
          >
            <Partition
              id={partition.id}
              color={partition.color}
              split={split}
              remove={remove}
            />
          </ResizablePartition>
        );
      } else {
        return (
          <div
            key={partition.id}
            className={`partition-container ${
              partition.direction === 'V' ? 'vertical' : 'horizontal'
            }`}
          >
            {renderPartitions(partition.children)}
          </div>
        );
      }
    });
  };

  return (
    <div className="partition-container">{renderPartitions(partitions)}</div>
  );
};

export default PartitionContainer;
