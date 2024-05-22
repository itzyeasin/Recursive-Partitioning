import React, { useState } from 'react';
import PartitionContainer from '../src/components/PartitionContainer';
import './App.css';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const RecursivePartitioning = () => {
  const [partitions, setPartitions] = useState([
    {
      id: 1,
      color: getRandomColor(),
      direction: null,
      children: [],
      width: window.innerWidth,
      height: window.innerHeight,
    },
  ]);

  const splitPartition = (id, direction) => {
    setPartitions((prevPartitions) => {
      const newPartitions = prevPartitions.map((partition) => {
        if (partition.id === id) {
          partition.direction = direction;
          const newPartition1 = {
            id: partition.id * 2,
            color: getRandomColor(),
            direction: null,
            children: [],
            width: direction === 'H' ? partition.width / 2 : partition.width,
            height: direction === 'V' ? partition.height / 2 : partition.height,
          };
          const newPartition2 = {
            id: partition.id * 2 + 1,
            color: getRandomColor(),
            direction: null,
            children: [],
            width: direction === 'H' ? partition.width / 2 : partition.width,
            height: direction === 'V' ? partition.height / 2 : partition.height,
          };
          partition.children = [newPartition1, newPartition2];
          return partition;
        } else if (partition.children.length > 0) {
          partition.children = splitChildPartitions(
            partition.children,
            id,
            direction
          );
          return partition;
        } else {
          return partition;
        }
      });
      return newPartitions;
    });
  };

  const splitChildPartitions = (children, id, direction) => {
    return children.map((child) => {
      if (child.id === id) {
        child.direction = direction;
        const newChild1 = {
          id: child.id * 2,
          color: getRandomColor(),
          direction: null,
          children: [],
          width: direction === 'H' ? child.width / 2 : child.width,
          height: direction === 'V' ? child.height / 2 : child.height,
        };
        const newChild2 = {
          id: child.id * 2 + 1,
          color: getRandomColor(),
          direction: null,
          children: [],
          width: direction === 'H' ? child.width / 2 : child.width,
          height: direction === 'V' ? child.height / 2 : child.height,
        };
        child.children = [newChild1, newChild2];
        return child;
      } else if (child.children.length > 0) {
        child.children = splitChildPartitions(child.children, id, direction);
        return child;
      } else {
        return child;
      }
    });
  };

  const removePartition = (id) => {
    const removePartitionRecursive = (partitions) => {
      return partitions.reduce((acc, partition) => {
        if (partition.id === id) {
          return acc;
        } else if (partition.children.length > 0) {
          partition.children = removePartitionRecursive(partition.children);
        }
        acc.push(partition);
        return acc;
      }, []);
    };

    setPartitions((prevPartitions) => removePartitionRecursive(prevPartitions));
  };

  return (
    <div className="App">
      <PartitionContainer
        partitions={partitions}
        split={splitPartition}
        remove={removePartition}
      />
    </div>
  );
};

export default RecursivePartitioning;
