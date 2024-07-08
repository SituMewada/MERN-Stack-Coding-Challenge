// import React from 'react';
// import {
//   ResponsiveContainer,
//   BarChart,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Bar,
// } from 'recharts';

// const data = [
//   {
//     name: '0-100',
//     sold: 4,
//   },
//   {
//     name: '101-200',
//     sold: 1,
//   },
//   {
//     name: '201-300',
//     sold: 8,
//   },
// ];
// const ChartUI = () => {
//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <BarChart
//         width={500}
//         height={300}
//         data={data}
//         margin={{
//           top: 5,
//           right: 30,
//           left: 20,
//           bottom: 5,
//         }}
//         style={{
//           background: '#fffF',
//         }}
//       >
//         {/* <CartesianGrid strokeDasharray="" stroke={style.gridColor} /> */}
//         <XAxis
//           axisLine={false}
//           tickLine={false}
//           dataKey="sec"
//           stroke="#caf726"
//         />
//         <YAxis
//           axisLine={false}
//           tickLine={false}
//           yAxisId="left"
//           orientation="left"
//           stroke="#b52525"
//         />

//         <Bar yAxisId="left" dataKey="sold" fill="#0887ff" />
//         {/* <Bar
//             yAxisId="left"
//             dataKey="raw"
//             fill={style.subColor}
//           />
//           <Bar
//             yAxisId="right"
//             dataKey="acc"
//             fill={style.errorColor}
//           /> */}
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

// export default ChartUI;

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from 'recharts';

const result = [];

const ChartUI = ({ data }) => {
  Object.entries(data).map(([range, count]) =>
    result.push({ name: range, sold: count })
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={600}
        height={300}
        data={result}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="sold" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartUI;
