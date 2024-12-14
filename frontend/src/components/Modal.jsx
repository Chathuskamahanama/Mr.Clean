import React from "react";

const Modal = ({ isOpen, onClose, body, title }) => {
  return (
    <>
      {isOpen && (
        <div className="bg-black/25 absolute top-0 left-0 w-screen h-screen">
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none ">
            <div className="relative w-auto mx-auto my-auto">
              <div className="bg-white rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">{title}</h3>
                  <button className="" onClick={onClose}>
                    <span className="font-bold text-black text-3xl">×</span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">{body}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
