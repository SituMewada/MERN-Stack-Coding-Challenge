function TableRow({ obj }) {
  return (
    <tr>
      <td>{obj.id}</td>
      <td>{obj.title}</td>
      <td>{obj.description}</td>
      <td>{obj.price}</td>
      <td>{obj.category}</td>
      <td>{obj.sold ? 'true' : 'false'}</td>
      <td>{obj.image}</td>
    </tr>
  );
}

export default TableRow;
