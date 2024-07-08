import { useEffect, useState } from 'react';

function Header({ handleCombinedData, handleTableData }) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const [searchText, setSearchText] = useState('');
  const [month, setMonth] = useState(3);

  const handleMonth = (e) => {
    let val = months.indexOf(e.target.value);

    val++;
    if (val > 0) setMonth(val);
  };
  useEffect(
    function () {
      const fetchData = async () => {
        const data = await fetch(
          `http://127.0.0.1:3000/combinedResult?month=${month}`
        )
          .then((res) => res.json())
          .catch((err) => console.log(err));

        handleCombinedData(data);
      };
      fetchData();

      return () => {
        fetchData();
      };
    },
    [month]
  );

  useEffect(
    function () {
      const fetchData = async () => {
        const data = await fetch(
          `http://127.0.0.1:3000/transcations?page=1&limit=10&month=${month}&search=${searchText}`
        )
          .then((res) => res.json())
          .catch((err) => console.log(err));

        handleTableData(data);
      };

      fetchData();
      return () => {
        fetchData();
      };
    },
    [month, searchText]
  );

  return (
    <div className="flex flex-col items-center mt-8">
      <div>
        <h1 className="text-2xl font-semibold">Transaction Dashboard</h1>
      </div>
      <div className="mt-8 flex gap-40">
        <input
          onChange={(e) => setSearchText(e.target.value)}
          className="bg-yellow-300 font-semibold text-gray-900 placeholder:text-gray-700 rounded-full text-center p-2"
          placeholder="Search transcation"
        ></input>
        <input
          onChange={handleMonth}
          className="bg-yellow-300 font-semibold text-gray-900 placeholder:text-gray-700 rounded-full text-center p-2"
          type="text"
          placeholder="Mar"
          list="field"
        />
        <datalist onClick={handleMonth} id="field">
          <option value="Jan"></option>
          <option value="Feb"></option>
          <option value="Mar"></option>
          <option value="Apr"></option>
          <option value="May"></option>
          <option value="Jun"></option>
          <option value="July"></option>
          <option value="Aug"></option>
          <option value="Sep"></option>
          <option value="Oct"></option>
          <option value="Nov"></option>
          <option value="Dec"></option>
        </datalist>
      </div>
    </div>
  );
}

export default Header;
