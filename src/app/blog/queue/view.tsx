import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { configCache } from "@/lib/api/helpers/connections";

const getdata = async () => {
  const data = await fetch(
    `${process.env.PROJECT_URL}api/queue`,
    configCache()
  );

  if (!data.ok) {
    return new Promise((resolve, reject) => resolve([]));
  }
  return data.json();
};

const Queue = async () => {
  const data = await getdata();

  return (
    <>
      <div className="w-full mb-96 mx-auto md:px-6 overflow-auto">
        <section className="">
          <h2 className="mb-12 text-center text-3xl font-bold">Queue</h2>

          <div className="">
            <Table className="w-full  text-base/3 border bg-white dark:bg-gray-800">
              <TableHeader>
                <TableRow className="bg-gray-200 dark:bg-gray-950">
                  <TableHead className="py-2 px-4 border">Title</TableHead>
                  <TableHead className="py-2 px-4 border">Category</TableHead>
                  <TableHead className="py-2 px-4 border">Created</TableHead>
                  <TableHead className="py-2 px-4 border">Creator</TableHead>
                  <TableHead className="py-2 px-4 border">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <tbody>
                {data.map((dat: any) => {
                  return (
                    <TableRow key={data._id} className="border">
                      <TableCell className="py-2 px-4 border">
                        {dat.title}
                      </TableCell>
                      <TableCell className="py-2 px-4 border">
                        {dat.category}
                      </TableCell>
                      <TableCell className="py-2 px-4 border">False</TableCell>
                      <TableCell className="py-2 px-4 border">
                        {dat.author}
                      </TableCell>
                      <TableCell className="py-2 px-4 border">
                        <button className="text-blue-500 hover:underline">
                          Edit
                        </button>
                        <button className="text-red-500 hover:underline ml-2">
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </section>
      </div>
    </>
  );
};

export default Queue;
