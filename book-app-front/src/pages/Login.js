import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginUser = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:2000/api/login", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);
    localStorage.setItem("token", data.authtoken);
    if (email === "admin@admin.com") {
      localStorage.setItem("admin", "admin");
    }

    if (data.status === "ok") {
      // window.location.href = "/home";
      // const token = data.;
      // localStorage.setItem("token", token);
      navigate("/home");
    } else {
      alert(data.message);
    }
  };
  return (
    <div>
      <div>
        <div className="flex flex-col justify-center items-center mt-20">
          <div className="w-full max-w-xs">
            <form
              onSubmit={loginUser}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="******************"
                />
              </div>
              <div className="flex items-center justify-between">
                <input
                  className="bg-slate-900 hover:bg-white hover:text-black text-teal-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  value="Signin"
                />
                <Link
                  to="/register"
                  className="inline-block align-baseline font-bold text-sm text-slate-900 hover:text-blue-800"
                >
                  Create An Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
