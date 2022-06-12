import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Editbook = () => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [currentpage, setCurrentpage] = useState(1);
  const [postperpage, setPostperpage] = useState(9);
  const pagenumbers = [];

  for (let index = 1; index <= Math.ceil(data.length / postperpage); index++) {
    pagenumbers.push(index);
  }

  const fetchData = async () => {
    setLoading(true);

    const response = await axios("http://localhost:2000/api/home");

    setData(response.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [data]);
  const deleteBook = async (id) => {
    if (window.confirm("Are u sure that you want to delete book?")) {
      const response = await axios.delete(
        `http://localhost:2000/api/deletebook/${id}`
      );
      if (response.status === "ok") {
        alert("Book deleted successfully");

        // fetchData();
      } else if (response.status === "error") {
        alert("book is not deleted");
      }
    }
  };
  const [query, setQuery] = useState("");

  // const editBookHandler=async(id)=>{
  //   const response=await axios.patch(`http://localhost:2000/api/updatebook/${id}`);

  // }

  const indexoflastpost = postperpage * currentpage;
  const indexoffirstpost = indexoflastpost - postperpage;
  const currentpost = data.slice(indexoffirstpost, indexoflastpost);
  const paginate = (pagenumber) => {
    setCurrentpage(pagenumber);
  };

  return (
    <div>
      <div className="md:flex md:justify-center mt-5">
        <input
          className="appearance-none block  bg-white text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          type="text"
          placeholder="Search title"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      #
                    </th>

                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Author
                    </th>

                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Edit
                    </th>

                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentpost
                    .filter((eachitem) => {
                      if (query === "") {
                        return eachitem;
                      } else if (
                        eachitem.title
                          .toLowerCase()
                          .includes(query.toLowerCase())
                      ) {
                        return eachitem;
                      }
                    })
                    .map((eachItem, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                      >
                        <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {eachItem.title}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {eachItem.author}
                        </td>

                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {eachItem.price}
                        </td>

                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <Link to={`/update/${eachItem._id}`}>
                            <button
                              // onClick={() =>editBookHandler(eachItem._id)}
                              className="bg-blue-900 text-white  font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                            >
                              Edit
                            </button>
                          </Link>
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => deleteBook(eachItem._id)}
                            className="bg-red-700 text-white font-semibold py-2 px-4 l rounded shadow"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex md:justify-center mb-10">
        <nav aria-label="Page navigation">
          <ul class="inline-flex">
            {pagenumbers.map((number) => (
              <li>
                <button
                  onClick={() => paginate(number)}
                  className="h-10 px-5 text-teal-200 transition-colors duration-150 bg-slate-900 focus:shadow-outline"
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Editbook;
