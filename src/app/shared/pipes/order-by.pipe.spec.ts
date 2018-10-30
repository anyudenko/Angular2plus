import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  const pipe = new OrderByPipe();

  const orderList = [
    {
      id: 1,
      name: "A name",
      price: 300,
      qty: 22,
      category: "test"
    },
    {
      id: 2,
      name: "C name",
      price: 200,
      qty: 11,
      category: "test"
    },
    {
      id: 3,
      name: "B name",
      price: 100,
      qty: 33,
      category: "test"
    }
  ];

  function getSortResultIds(sortBy, sortOrder) {
    const sortResult = pipe.transform(orderList, sortBy, sortOrder);

    return sortResult.map(function(i) {
      return i.id;
    });
  }

  it('Sort orderList by name (asc)', () => {
    const sortResultIds = getSortResultIds('name', true);
    expect(sortResultIds).toEqual([2, 3, 1]);
  });

  it('Sort orderList by name (desc)', () => {
    const sortResultIds = getSortResultIds('name', false);
    expect(sortResultIds).toEqual([1, 3, 2]);
  });

  it('Sort orderList by qty (asc)', () => {
    const sortResultIds = getSortResultIds('qty', true);
    expect(sortResultIds).toEqual([3, 1, 2]);
  });

  it('Sort orderList by qty (desc)', () => {
    const sortResultIds = getSortResultIds('qty', false);
    expect(sortResultIds).toEqual([2, 1, 3]);
  });

  it('Sort orderList by price (asc)', () => {
    const sortResultIds = getSortResultIds('price', true);
    expect(sortResultIds).toEqual([1, 2, 3]);
  });

  it('Sort orderList by price (desc)', () => {
    const sortResultIds = getSortResultIds('price', false);
    expect(sortResultIds).toEqual([3, 2, 1]);
  });
});
