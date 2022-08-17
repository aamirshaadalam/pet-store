import React from 'react';
import Row from './row';
import Toolbar from './toolbar';
import Pagination from './pagination';
import HeaderRow from './headerRow';
import '../styles/table.scss';

export default function Table({ data, columns, toolbarConfig, paginationConfig }) {
  const hasData = data && data.length > 0;

  function getBodyContent() {
    return data.map((d) => <Row key={d.id} rowData={d} columns={columns} />);
  }

  function getContent() {
    if (hasData) {
      return (
        <table>
          <thead>
            <HeaderRow columns={columns} />
          </thead>
          <tbody>{getBodyContent()}</tbody>
        </table>
      );
    } else {
      return <h3 className='no-data-table'>No Data!</h3>;
    }
  }

  return (
    <>
      <Toolbar icons={toolbarConfig} />
      <div className='table-container'>{getContent()}</div>
      <Pagination {...paginationConfig} />
    </>
  );
}
