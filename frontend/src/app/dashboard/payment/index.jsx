import React, { useContext, useEffect, useState } from "react";

import DashboardLayout from "../../../components/DashboardLayout";
import { AuthContext } from "../../../context/AuthContext";
import http from "../../../util/HttpHelper";
import { toast } from "react-toastify";

const Payment = () => {
  const [paymentList, setPaymentList] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const handleFetchPayments = async () => {
    try {
      if (!user) return;
      console.log(user);
      const params = {};
      if (user?.empProfile === null) {
        params.client = user?.user?._id;
      } else {
        params.employee = user?.empProfile?._id;
      }
      setIsDataLoading(true);
      const res = await http.get("payment/get", {
        params,
      });
      setPaymentList(res.data.data);
      setIsDataLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleConfirmPayment = async (id) => {
    try {
      const res = await http.put(
        "payment/status",
        {},
        {
          params: {
            id,
          },
        }
      );
      handleFetchPayments();
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    handleFetchPayments();
  }, [user]);

  return (
    <DashboardLayout
      body={
        <>
          <nav
            className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 w-auto"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <a
                  href="/"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Home
                </a>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    Payment
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <h3 className="text-3xl font-bold text-gray-800 my-3">Payments</h3>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Client Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Remark
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Photo
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {isDataLoading ? (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      colSpan={7}
                      className="px-6 py-4 font-medium text-center text-red-600 whitespace-nowrap dark:text-white"
                    >
                      <div
                        role="status"
                        className="w-full flex justify-center items-center text-center"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </th>
                  </tr>
                ) : (
                  <>
                    {paymentList.length === 0 ? (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          colSpan={7}
                          className="px-6 py-4 font-medium text-center text-red-600 whitespace-nowrap dark:text-white"
                        >
                          No Data
                        </th>
                      </tr>
                    ) : (
                      <>
                        {paymentList.map((payment, index) => (
                          <tr
                            key={index}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            <td
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize"
                            >
                              {payment?.job?.client?.name}
                            </td>
                            <td className="px-6 py-4">{payment?.remark}</td>
                            <td className="px-6 py-4">
                              <img
                                className="w-8 h-8"
                                src={payment?.photo}
                                alt="payment photo"
                              />
                            </td>
                            <td className="px-6 py-4">
                              {payment?.job?.paymentStatus}
                            </td>
                            <td className="px-6 py-4 text-right">
                              {user?.empProfile !== null &&
                                payment?.job?.paymentStatus === "PAID" && (
                                  <div className="flex gap-3 justify-center">
                                    <span
                                      className="font-medium text-green-600 hover:underline cursor-pointer"
                                      onClick={() =>
                                        handleConfirmPayment(payment._id)
                                      }
                                    >
                                      Confirm Payment
                                    </span>
                                  </div>
                                )}
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </>
      }
    />
  );
};

export default Payment;
