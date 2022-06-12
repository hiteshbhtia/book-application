import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import Login from "./Login";
function Addbook() {
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");

  // const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  const [author, setAuthor] = useState("");
  const navigate = useNavigate();
  const componentMounted = useRef(true); // (3) component is mounted

  const { id } = useParams();
  const getSingleUser = async (id) => {
    const response = await axios.get(`http://localhost:2000/api/home/${id}`);
    if (response.status === 200) {
      setPrice(response.data.price);
      setTitle(response.data.title);
      setAuthor(response.data.author);
      setDescription(response.data.description);
      // setStock(response.data.stock);
    }
  };
  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
    return () => {
      // This code runs when component is unmounted
      componentMounted.current = false; // (4) set it to false when we leave the page
    };
  }, [id]);

  const state = {
    title: title,
    author: author,
    description: description,
    price: price,
    //  stock:stock,
  };

  const Addbooktodb = async (e) => {
    e.preventDefault();
    if (!price || !description || !author || !title) {
      // toast.error("please provide value to each field")
      alert("please fill out each field");
    } else {
      if (!id) {
        const response = await fetch("http://localhost:2000/api/addbook", {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({ title, author, price, description }),
        });

        const data = await response.json();
        console.log(data);
        if (data.status === "ok") {
          alert("Book added successfully");
          navigate("/editproduct");
        }
      } else {
        const response = await axios.patch(
          `http://localhost:2000/api/updatebook/${id}`,
          state
        );
        if (response.status === 200) {
          alert("Book updated successfully");
          navigate("/editproduct");
          console.log(response);
        }
      }
    }
  };
  return (
    <div>
      <div className="md:flex mt-3 md:justify-center mb-6">
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-title"
              >
                Title
              </label>
              <input
                value={title}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-title"
                type="text"
                placeholder="c++"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-author"
              >
                Author
              </label>
              <input
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-author"
                type="text"
                placeholder="balaguruswami"
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-price"
              >
                Price
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-price"
                type="text"
                placeholder="1000"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-description"
              >
                description
              </label>
              <input
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-description"
                type="text"
                placeholder="Practical book for c++ programmers"
              />
            </div>
          </div>
        </form>
      </div>

      <div className="md:flex md:justify-center mb-6">
        <input
          type="button"
          value={id ? "Update Book" : "AddBook"}
          onClick={Addbooktodb}
          className="bg-slate-900 hover:bg-white hover:text-black text-teal-200 font-semibold py-2 px-2  rounded shadow"
        />
      </div>
    </div>
  );
}

export default Addbook;
