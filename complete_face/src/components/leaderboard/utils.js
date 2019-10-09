import React from "react";
import namor from "namor";
import "./leaderboard.css";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};


export function makeData(len,objects) {
  let i=-1;
  return range(len).map(d => {
    i+=1;
    return objects[i]
    });
}

