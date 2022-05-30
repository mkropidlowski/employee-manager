const Pagination = ({ recordsPerPage, totalRecords, paginate }) => {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  return <div className={'pagination'}>
    <div className={'pagination__title'}>Pages:
      <ul className='pagination__list'>
        {pageNumbers.map(number => (
          <li key={number} className='pagination__list--item'>
            <a onClick={() => paginate(number)} href='/#' className='pagination__list--link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
  </div>
    </div>
}

export {Pagination}
