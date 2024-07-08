import { useState } from 'react';
import Header from './components/Header';
import Table from './components/Table';
import Statistics from './components/Statistics';
import ChartUI from './components/Chart';

function App() {
  const [combinedata, setCombinedData] = useState('');
  const [tableData, setTableData] = useState('');
  const handleCombinedData = (data) => {
    setCombinedData(data);
  };
  const handleTableData = (data) => {
    setTableData(data);
  };
  return (
    <div className="bg-gray-100">
      <Header
        handleCombinedData={handleCombinedData}
        handleTableData={handleTableData}
      />
      {tableData?.result && <Table data={tableData.result} />}
      {combinedata?.data && (
        <>
          <Statistics data={combinedata.data.statisticsData.statistics} />
          <ChartUI data={combinedata.data.chartStatsData.chartData} />
        </>
      )}
    </div>
  );
}

export default App;
