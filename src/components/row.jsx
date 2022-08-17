import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Row({ rowData, columns }) {
  function getCellContent(col, index) {
    switch (col.type) {
      case 'icon':
        return (
          <td className='center' key={index + 1}>
            <i className={col.class} title='Edit this record' onClick={() => col.action(rowData)}></i>
          </td>
        );
      case 'link':
        return (
          <td key={index + 1}>
            <NavLink to={`${col.baseUrl}/${rowData.id}`}>{rowData[col.name.toLowerCase()]}</NavLink>
          </td>
        );
      default:
        return <td key={index + 1}>{rowData[col.name.toLowerCase()]}</td>;
    }
  }

  return <tr>{columns.map((col, index) => getCellContent(col, index))}</tr>;
}
