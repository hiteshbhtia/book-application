import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import img from "../pages/logo.png";

const Editcart = () => {
  const params = useParams();
  // useEffect(() => {
  //   console.log(params);
  // }, []);

  const id = params.id;
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [para, setPara] = useState("");

  useEffect(() => {
    const findBookInCart = async () => {
      const res = await fetch("http://localhost:2000/api/bookcart", {
        method: "GET",
        headers: {
          "content-Type": "application/json",
          authtoken: token,
        },
      });
      const d = await res.json();
      console.log(d.userBooks);
      d.userBooks.forEach((eachItem) => {
        if (eachItem.book === id) {
          setPresent(true);
          setPara("Book is already present in cart checkout cart....");
        }
        
      });
    };

    const fetchData = async () => {
      const response = await axios(`http://localhost:2000/api/home/${id}`);

      setData(response.data);
    };
    fetchData();
    findBookInCart();
  }, [data.length]);

  const { title, description, author, price } = data;
  const [stock, setStock] = useState(1);
  const [present, setPresent] = useState(false);

  const clickHandler = async (id) => {
    // console.log(token);
    // console.log(id);

    if (present === false) {
      const response = await fetch(`http://localhost:2000/api/cart/${id}`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
          authtoken: token,
        },

        body: JSON.stringify({
          title,
          description,
          price,
          stock,
        }),
      });
      const data1 = await response.json();
      console.log(data1);
      if (data1.success === true) {
        // window.location.href = "/login";
        navigate("/cart");
      }
    }
  };

  return (
    <div>
      <>
        {present ? (
          <h5
            className=" mt-3
      text-center
      text-gray-900
        text-xl
        leading-tight
        font-medium
        mb-2"
          >
            Book is already present in the cart
          </h5>
        ) : (
          ""
        )}
      </>

      <div className="flex justify-center">
        <div className="block p-6 rounded-lg mt-10 shadow-lg  hover:text-black text-black max-w-sm">
          <h5 className="text-center text-black  text-xl leading-tight font-medium mb-2">
            {data.title}
          </h5>
          <p className="text-black text-base mb-4">{data.description}</p>

          <p className="text-black text-center text-base mb-4">
            Written By {data.author}
          </p>

          <h5 className="text-center text-slate-900 text-xl leading-tight font-medium mb-2">
            Rs.{data.price * stock}
          </h5>

          <div className="md:flex md:justify-center ">
            <button
              onClick={() => (stock <= 1 ? "" : setStock(stock - 1))}
              type="button"
              className="inline px-2 mr-3   bg-slate-900 hover:bg-white hover:text-black text-teal-200 font-medium text-lg leading-tight uppercase rounded shadow-md focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"
            >
              -
            </button>
            <h5 className="inline text-center text-slate-900 text-xl leading-tight font-medium mb-2">
              {stock}
            </h5>

            <button
              onClick={() => (stock > 100 ? "" : setStock(stock + 1))}
              type="button"
              className=" px-2  ml-3 bg-slate-900 hover:bg-white hover:text-black text-teal-200 font-medium text-lg leading-tight uppercase rounded shadow-md   focus:outline-none focus:ring-0  transition duration-150 ease-in-out"
            >
              +
            </button>
          </div>
          <div className="md:flex md:justify-center ">
            {present ? (
              <>
                <button
                  type="button"
                  className="block px-6 mt-3 py-2.5 bg-slate-900 hover:bg-white hover:text-black text-teal-200 font-medium text-xs leading-tight uppercase rounded shadow-md  focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                  onClick={() => navigate("/cart")}
                >
                  Checkout
                </button>
              </>
            ) : (
              <button
                type="button"
                className="inline-block px-6 mt-3 py-2.5 bg-slate-900 text-teal-200 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-white hover:text-black transition duration-150 ease-in-out"
                onClick={() => clickHandler(data._id)}
              >
                Add to cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editcart;
