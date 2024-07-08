import TableRow from './TableRow';

function Table({ data }) {
  return (
    <div className="flex flex-col items-center mt-12">
      <table className="bg-yellow-50 w-1/2">
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Category</th>
          <th>Sold</th>
          <th>Image</th>
        </tr>
        {data.map((obj, ind) => (
          <TableRow obj={obj} key={ind} />
        ))}
      </table>
      <div className="font-semibold mt-4 w-1/2 flex justify-between">
        <div>
          <p>Page No: 1</p>
        </div>
        <div className="flex gap-4">
          <button>Next</button>
          <span>-</span>
          <button>Previous</button>
        </div>
        <div>
          <p>Per Page: 10</p>
        </div>
      </div>
    </div>
  );
}

export default Table;
