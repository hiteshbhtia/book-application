import React, { useEffect, useState } from "react";
import axios from "axios";
import img from "../pages/logo.png";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  // const [state, setState] = useState([]);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentpage, setCurrentpage] = useState(1);
  const [postperpage, setPostperpage] = useState(9);
  const pagenumbers = [];

  for (let index = 1; index <= Math.ceil(data.length / postperpage); index++) {
    pagenumbers.push(index);
  }

  const navigate = useNavigate();
  // const location = useLocation();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      const fetchData = async () => {
        setLoading(true);

        const response = await axios("http://localhost:2000/api/home");

        setData(response.data);
        setLoading(false);
      };
      fetchData();
    }
  }, [data.length]);
  const [query, setQuery] = useState("");

  const clickHandler = (id) => {
    navigate(`/cartpage/${id}`);
  };

  const indexoflastpost = postperpage * currentpage;
  const indexoffirstpost = indexoflastpost - postperpage;
  const currentpost = data.slice(indexoffirstpost, indexoflastpost);
  const paginate = (pagenumber) => {
    setCurrentpage(pagenumber);
  };

  return (
    <>
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
      <div className="p-10 grid grid-cols-1  sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {currentpost
          .filter((eachitem) => {
            if (query === "") {
              return eachitem;
            } else if (
              eachitem.title.toLowerCase().includes(query.toLowerCase())
            ) {
              return eachitem;
            }
          })
          .map((eachDataItem, index) => (
            <div key={index} className="rounded overflow-hidden shadow-lg   ">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  {eachDataItem.title}
                </div>
                <div className="font-bold text-xl mb-2">
                  Author:{eachDataItem.author}
                </div>

                <div className="font-bold text-xl mb-2">
                  Rs.{eachDataItem.price}
                </div>

                <p className="text-gray-700 text-base">
                  {eachDataItem.description}
                </p>
                <div className="md:flex md:justify-center ">
                  <div className=" mt-2 mb-2">
                    {!localStorage.getItem("admin") ? (
                      <button
                        onClick={() => clickHandler(eachDataItem._id)}
                        className="bg-slate-900 hover:bg-white hover:text-black text-teal-200 font-semibold py-1.5 px-1.5 border border-gray-400 rounded shadow"
                      >
                        Add To Cart
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #{eachDataItem.title}
                </span>

                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #{eachDataItem.author}
                </span>
              </div>
            </div>
          ))}
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

      <div>
        <footer className="text-center bg-gray-900 text-white">
          <div className="container px-6 pt-6">
            <div className="flex justify-center mb-6">
              <a
                target="_blank"
                rel="noreferrer"
                href="mailto:hiteshbhatiya787@gmail.com"
                type="button"
                className="rounded-full border-2 border-white text-white leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  className="w-3 h-full mx-auto"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  />
                </svg>
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/in/hitesh-bhatiya-939931182/"
                type="button"
                className="rounded-full border-2 border-white text-white leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="linkedin-in"
                  className="w-3 h-full mx-auto"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                  />
                </svg>
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/hiteshbhtia"
                type="button"
                className="rounded-full border-2 border-white text-white leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="github"
                  className="w-3 h-full mx-auto"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                >
                  <path
                    fill="currentColor"
                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div
            className="text-center p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            Gmail:hiteshbhatiya787@gmail.com
          </div>
        </footer>
      </div>
    </>
  );
};
export default Home;
