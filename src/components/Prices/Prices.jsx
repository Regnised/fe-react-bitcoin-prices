import { useState, useEffect } from 'react';
import { formatter } from '../../util/price';
import ReactPaginate from 'react-paginate';

import './Prices.css';

export default function Prices() {
  const [priceState, setPriceState] = useState({
    prices: [],
    limit: 10,
    offset: 0,
    sortBy: 'createdAt',
    sortType: 'ASC',
    count: 0,
  });

  function getPrices(newOffset) {
    const { limit, offset, sortBy, sortType } = priceState;
    const query = `limit=${limit}&offset=${
      newOffset || offset
    }&sortBy=${sortBy}&sortType=${sortType}`;

    fetch(`https://lit-beach-53174-edbdac388006.herokuapp.com/prices?${query}`)
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        const prices = resData.data.prices.map((price) => ({
          ...price,
          date: new Date(price.createdAt).toLocaleString(),
        }));
        const count = resData.data.count;
        setPriceState((priceState) => {
          return { ...priceState, prices, count };
        });
      });
  }

  useEffect(() => {
    getPrices();
  }, []);

  function handlePageClick(event) {
    const newOffset = (event.selected * priceState.limit) % priceState.count;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    getPrices(newOffset);
  }

  return (
    <>
      <table id="result">
        <thead>
          <tr>
            <th
              onClick={() => {
                console.log('1');
              }}
            >
              Date
            </th>
            <th
              onClick={() => {
                console.log(`2`);
              }}
            >
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {priceState.prices &&
            priceState.prices.map((item) => (
              <tr key={`${item.createdAt}`}>
                <td>{item.date}</td>
                <td>{formatter.format(item.price_usd)}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={priceState.count / priceState.limit}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
