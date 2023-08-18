const getData = async () => {
  const data = await fetch(`${process.env.PROJECT_URL}api/queue`, {
    cache: "no-store",
  });

  if (!data.ok) {
    return new Promise((resolve, reject) => resolve([]));
  }
  return data.json();
};

const Queue = async () => {
  const data = await getData();

  return (
    <>
      <div className=" mb-96 mx-auto md:px-6 ">
        <section className="">
          <h2 className="mb-12 text-center text-3xl font-bold">Queue</h2>

          <div className="">
            <table className="w-full border bg-white dark:bg-gray-800">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-950">
                  <th className="py-2 px-4 border">Title</th>
                  <th className="py-2 px-4 border">Category</th>
                  <th className="py-2 px-4 border">Created</th>
                  <th className="py-2 px-4 border">Creator</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((dat: any) => {
                  return (
                    <tr key={data._id} className="border">
                      <td className="py-2 px-4 border">{dat.title}</td>
                      <td className="py-2 px-4 border">{dat.category}</td>
                      <td className="py-2 px-4 border">False</td>
                      <td className="py-2 px-4 border">{dat.author}</td>
                      <td className="py-2 px-4 border">
                        <button className="text-blue-500 hover:underline">
                          Edit
                        </button>
                        <button className="text-red-500 hover:underline ml-2">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
};

export default Queue;
