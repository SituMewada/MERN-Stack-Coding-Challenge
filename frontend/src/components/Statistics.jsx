function Statistics({ data }) {
  return (
    <section className="flex flex-col items-center justify-center mt-28 mb-4">
      <div className="bg-yellow-200 p-4 ">
        <div>
          <h1 className="font-semibold text-2xl">Statistics</h1>
        </div>
        <div className="mt-6 font-semibold">
          <p>Total sale - {data.amount}</p>
          <p>Total sold item - {data.sold}</p>
          <p>Total not sold item - {data.notSold}</p>
        </div>
      </div>
    </section>
  );
}

export default Statistics;
