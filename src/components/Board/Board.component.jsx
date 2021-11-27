import React, { useState, useEffect, useCallback } from 'react';
import { Node } from '..';
import {
  dijkstra,
  getNodesInShortestPathOrder,
} from '../../algorithms/dijkstra';
import './Board.styles.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const Panel = () => {
  const [grid, setGrid] = useState([]);
  const [startNode, setStartNode] = useState({
    row: START_NODE_ROW,
    col: START_NODE_COL,
  });
  const [finishNode, setFinishNode] = useState({
    row: FINISH_NODE_ROW,
    col: FINISH_NODE_COL,
  });

  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === startNode.row && col === startNode.col,
      isFinish: row === finishNode.row && col === finishNode.col,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

  const getInitialGrid = useCallback(() => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        const node = createNode(col, row);
        currentRow.push(node);
      }
      grid.push(currentRow);
    }
    return grid;
  }, []);

  useEffect(() => {
    const newGrid = getInitialGrid();
    setGrid(() => newGrid);
  }, [getInitialGrid]);

  return (
    <>
      <button onClick={() => console.log()}>
        Visualize Dijkstra's Algorithm
      </button>
      <button onClick={() => console.log()}>Clear Panel</button>
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    row={row}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Panel;
