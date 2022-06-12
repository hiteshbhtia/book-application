import React from "react";

const AboutProject = () => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="block rounded-lg mt-3 shadow-lg bg-white max-w-sm text-center">
          <div className="py-3 px-6 border-b border-gray-300">
            About Project
          </div>
          <div className="p-6">
            <h5 className="text-gray-900 text-xl font-medium mb-2"></h5>
            <p className="text-gray-700 text-base mb-4">
              This is library Management project for managing books of different
              users and have admin rights so that admin can Add,update,delete
              books
            </p>
            <p className="text-gray-700 text-base mb-4"></p>

            <button
              type="button"
              className=" inline-block px-6 py-2.5 bg-slate-900 text-teal-200 font-medium text-xs leading-tight uppercase rounded shadow-md focus:outline-none focus:ring-0  transition duration-150 ease-in-out"
            >
              Github Project Link
            </button>
          </div>
          <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
            Built By Hitesh Bhatia
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutProject;
