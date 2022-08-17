import React from 'react';

export default function HeaderRow({ columns }) {
  function getCellContent(col, index) {
    switch (col.type) {
      case 'editable':
        return <th key={index + 1}></th>;
      default:
        return <th key={index + 1}>{col.name}</th>;
    }
  }

  return <tr>{columns.map((col, index) => getCellContent(col, index))}</tr>;
}
