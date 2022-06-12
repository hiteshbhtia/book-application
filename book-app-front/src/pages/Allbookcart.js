import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Allbookcart = () => {
  const [data, setData] = useState([]);
  // const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  let [TotalAmount, setTotalAmount] = useState(0);

  const fetchData = async () => {
    const response = await fetch("http://localhost:2000/api/bookcart", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        authtoken: localStorage.getItem("token"),
      },
    });
    const d = await response.json();
    //   console.log(d.userBooks);
    //   console.log(response.data);
    setData(d.userBooks);
    let Total = 0;
    data.forEach((eachitem) => {
      Total += eachitem.price * eachitem.stock;
    });
    setTotalAmount(Total);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    console.log(localStorage.getItem("token"));

    fetchData();
  }, [data.length]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are u sure do u want to perform this action?")) {
      const response = await fetch(`http://localhost:2000/api/bookcart/${id}`, {
        method: "DELETE",
        headers: {
          "content-Type": "application/json",
          authtoken: localStorage.getItem("token"),
        },
      });
      const d = await response.json();
      fetchData();

      console.log(d);
      // fetchData();
    }
  };
  const [success, setSuccess] = useState(true);
  const [stock, setStock] = useState("");
  const [click, setClick] = useState(false);
  const [findbook, setFindbook] = useState([]);
  const EditHandler = (stock, id, userid) => {
    setStock(stock);
    setClick(true);
    const fetchData = async () => {
      const response = await axios(`http://localhost:2000/api/home/${id}`);
      console.log(response.data);
      if (response.data === null) {
        deleteHandler(userid);
      } else {
        setFindbook(response.data);
      }
    };
    fetchData();
  };
  const Addhandler = async (id, userid) => {
    const state = {
      title: findbook.title,
      description: findbook.description,
      price: findbook.price,
      stock: stock,
      cartid: userid,
    };
    const response = await axios.put(
      `http://localhost:2000/api/bookcart/${id}`,
      state,
      {
        headers: {
          authtoken: localStorage.getItem("token"),
        },
      }
    );

    if (response.status === 200) {
      setClick(false);
      console.log(response);
      fetchData();
      // window.location.reload();
    }
  };
  const [query, setQuery] = useState("");
  return (
    <>
      <div className="md:flex md:justify-center mt-3">
        <h3 className="font-bold text-xl">Your Cart</h3>
        <h3 className="font-bold text-xl ml-3">TotalPrice:</h3>

        <h3 className="font-bold text-blue-800  text-xl ml-3">{TotalAmount}</h3>
      </div>
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
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {data
          .filter((eachitem) => {
            if (query === "") {
              return eachitem;
            } else if (
              eachitem.title.toLowerCase().includes(query.toLowerCase())
            ) {
              return eachitem;
            }
          })
          .map((eachitem, index) => (
            <div
              key={index}
              className="max-w-sm rounded overflow-hidden shadow-lg"
            >
              <div className="px-6 py-4">
                <div className="md:flex md:justify-center ">
                  <div className="font-bold text-xl mb-2 text-teal-700">
                    {click && findbook._id === eachitem.book
                      ? findbook.title
                      : eachitem.title}
                  </div>
                </div>
                <div className="md:flex md:justify-center ">
                  <p className="text-gray-700 text-base mb-3">
                    {click && findbook._id === eachitem.book
                      ? findbook.description
                      : eachitem.description}
                  </p>
                </div>
                <div className="md:flex md:justify-center ">
                  <p className="text-gray-700 text-base mb-3">
                    Rs.
                    {click && findbook._id === eachitem.book
                      ? findbook.price * stock
                      : eachitem.price * eachitem.stock}
                  </p>
                </div>
                <div className="md:flex md:justify-center ">
                  <p className="text-gray-700 text-base mb-3">
                    Quantity:
                    {click && findbook._id === eachitem.book
                      ? stock
                      : eachitem.stock}
                  </p>
                </div>
                {click && findbook._id === eachitem.book ? (
                  <div className="md:flex md:justify-center ">
                    <button
                      onClick={() => (stock <= 1 ? "" : setStock(stock - 1))}
                      type="button"
                      className="inline px-2 mr-3 hover:text-white  bg-blue-900 text-white font-medium text-lg leading-tight uppercase rounded shadow-md hover:bg-black hover:shadow-lg  focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    >
                      -
                    </button>
                    <h5 className="inline text-center text-gray-900 text-xl leading-tight font-medium mb-2">
                      {stock}
                    </h5>

                    <button
                      onClick={() => (stock > 100 ? "" : setStock(stock + 1))}
                      type="button"
                      className=" px-2  ml-3 bg-blue-900 text-white font-medium text-lg leading-tight uppercase rounded shadow-md  transition duration-150 ease-in-out"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  ""
                )}

                <div className="md:flex md:justify-center mt-3 ">
                  {click && findbook._id === eachitem.book ? (
                    <button
                      onClick={() => Addhandler(eachitem.book, eachitem._id)}
                      className="bg-blue-900 ml-3 hover:bg-red-50 hover:text-stone-800 text-white font-bold py-2 px-4 rounded"
                    >
                      Add
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        EditHandler(eachitem.stock, eachitem.book, eachitem._id)
                      }
                      className="bg-blue-900 ml-3 hover:bg-red-50 hover:text-stone-800 text-white font-bold py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => deleteHandler(eachitem._id)}
                    className="bg-red-700 ml-3 hover:bg-red-50 hover:text-stone-800 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Allbookcart;
