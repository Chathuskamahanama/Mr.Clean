import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const DashboardLayout = (props) => {
  const { body } = props;

  const { user, signout } = useContext(AuthContext);
  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="#" className="flex ms-2 md:me-24">
                <img
                  src="/assets/logo192.png"
                  className="h-8 me-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Mr. Clean
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div className="flex gap-3 items-center">
                  <div className="text-white capitalize font-bold">
                    {user?.user?.name}
                  </div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src={
                        user?.user?.photo
                          ? user?.user?.photo
                          : "https://i.stack.imgur.com/l60Hf.png"
                      }
                      alt="user photo"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.5315 11.5857L20.75 10.9605V21.25H22C22.4142 21.25 22.75 21.5858 22.75 22C22.75 22.4143 22.4142 22.75 22 22.75H2.00003C1.58581 22.75 1.25003 22.4143 1.25003 22C1.25003 21.5858 1.58581 21.25 2.00003 21.25H3.25003V10.9605L2.46855 11.5857C2.1451 11.8445 1.67313 11.792 1.41438 11.4686C1.15562 11.1451 1.20806 10.6731 1.53151 10.4144L9.65742 3.91366C11.027 2.818 12.9731 2.818 14.3426 3.91366L22.4685 10.4144C22.792 10.6731 22.8444 11.1451 22.5857 11.4686C22.3269 11.792 21.855 11.8445 21.5315 11.5857ZM12 6.75004C10.4812 6.75004 9.25003 7.98126 9.25003 9.50004C9.25003 11.0188 10.4812 12.25 12 12.25C13.5188 12.25 14.75 11.0188 14.75 9.50004C14.75 7.98126 13.5188 6.75004 12 6.75004ZM13.7459 13.3116C13.2871 13.25 12.7143 13.25 12.0494 13.25H11.9507C11.2858 13.25 10.7129 13.25 10.2542 13.3116C9.76255 13.3777 9.29128 13.5268 8.90904 13.9091C8.52679 14.2913 8.37773 14.7626 8.31163 15.2542C8.24996 15.7129 8.24999 16.2858 8.25003 16.9507L8.25003 21.25H9.75003H14.25H15.75L15.75 16.9507L15.75 16.8271C15.7498 16.2146 15.7462 15.6843 15.6884 15.2542C15.6223 14.7626 15.4733 14.2913 15.091 13.9091C14.7088 13.5268 14.2375 13.3777 13.7459 13.3116Z"
                    fill="currentColor"
                  />
                  <g opacity="0.5">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.75 9.5C10.75 8.80964 11.3096 8.25 12 8.25C12.6904 8.25 13.25 8.80964 13.25 9.5C13.25 10.1904 12.6904 10.75 12 10.75C11.3096 10.75 10.75 10.1904 10.75 9.5Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.75 9.5C10.75 8.80964 11.3096 8.25 12 8.25C12.6904 8.25 13.25 8.80964 13.25 9.5C13.25 10.1904 12.6904 10.75 12 10.75C11.3096 10.75 10.75 10.1904 10.75 9.5Z"
                      fill="currentColor"
                    />
                  </g>
                  <path
                    opacity="0.5"
                    d="M12.0494 13.25C12.7142 13.25 13.2871 13.2499 13.7458 13.3116C14.2375 13.3777 14.7087 13.5268 15.091 13.909C15.4732 14.2913 15.6223 14.7625 15.6884 15.2542C15.7462 15.6842 15.7498 16.2146 15.75 16.827L15.75 21.25H8.25L8.25 16.9506C8.24997 16.2858 8.24993 15.7129 8.31161 15.2542C8.37771 14.7625 8.52677 14.2913 8.90901 13.909C9.29126 13.5268 9.76252 13.3777 10.2542 13.3116C10.7129 13.2499 11.2858 13.25 11.9506 13.25H12.0494Z"
                    fill="currentColor"
                  />
                  <path
                    opacity="0.5"
                    d="M16 3H18.5C18.7761 3 19 3.22386 19 3.5L19 7.63955L15.5 4.83955V3.5C15.5 3.22386 15.7239 3 16 3Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="ms-3">Home</span>
              </a>
            </li>

            {user?.empProfile === null && (
              <li>
                <a
                  href="service"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3 6.75C3 6.33579 3.33579 6 3.75 6H20.75C21.1642 6 21.5 6.33579 21.5 6.75C21.5 7.16421 21.1642 7.5 20.75 7.5H3.75C3.33579 7.5 3 7.16421 3 6.75ZM21.2113 11.1586C21.5379 11.4134 21.5961 11.8847 21.3414 12.2113L17.4414 17.2113C17.3022 17.3897 17.0899 17.4958 16.8636 17.4999C16.6373 17.504 16.4213 17.4057 16.2757 17.2324L14.1757 14.7324C13.9093 14.4152 13.9504 13.9421 14.2676 13.6757C14.5848 13.4093 15.0579 13.4504 15.3243 13.7676L16.8284 15.5582L20.1586 11.2887C20.4134 10.9621 20.8847 10.9039 21.2113 11.1586ZM3 11.75C3 11.3358 3.33579 11 3.75 11H10.75C11.1642 11 11.5 11.3358 11.5 11.75C11.5 12.1642 11.1642 12.5 10.75 12.5H3.75C3.33579 12.5 3 12.1642 3 11.75ZM3 16.75C3 16.3358 3.33579 16 3.75 16H10.75C11.1642 16 11.5 16.3358 11.5 16.75C11.5 17.1642 11.1642 17.5 10.75 17.5H3.75C3.33579 17.5 3 17.1642 3 16.75Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="ms-3">Services</span>
                </a>
              </li>
            )}

            {user?.empProfile?.isAdmin && (
              <li>
                <a
                  href="employee"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5 9.5C5 7.01472 7.01472 5 9.5 5C11.9853 5 14 7.01472 14 9.5C14 11.9853 11.9853 14 9.5 14C7.01472 14 5 11.9853 5 9.5Z"
                      fill="currentColor"
                    />
                    <path
                      d="M14.3675 12.0632C14.322 12.1494 14.3413 12.2569 14.4196 12.3149C15.0012 12.7454 15.7209 13 16.5 13C18.433 13 20 11.433 20 9.5C20 7.567 18.433 6 16.5 6C15.7209 6 15.0012 6.2546 14.4196 6.68513C14.3413 6.74313 14.322 6.85058 14.3675 6.93679C14.7714 7.70219 15 8.5744 15 9.5C15 10.4256 14.7714 11.2978 14.3675 12.0632Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.64115 15.6993C5.87351 15.1644 7.49045 15 9.49995 15C11.5112 15 13.1293 15.1647 14.3621 15.7008C15.705 16.2847 16.5212 17.2793 16.949 18.6836C17.1495 19.3418 16.6551 20 15.9738 20H3.02801C2.34589 20 1.85045 19.3408 2.05157 18.6814C2.47994 17.2769 3.29738 16.2826 4.64115 15.6993Z"
                      fill="currentColor"
                    />
                    <path
                      d="M14.8185 14.0364C14.4045 14.0621 14.3802 14.6183 14.7606 14.7837V14.7837C15.803 15.237 16.5879 15.9043 17.1508 16.756C17.6127 17.4549 18.33 18 19.1677 18H20.9483C21.6555 18 22.1715 17.2973 21.9227 16.6108C21.9084 16.5713 21.8935 16.5321 21.8781 16.4932C21.5357 15.6286 20.9488 14.9921 20.0798 14.5864C19.2639 14.2055 18.2425 14.0483 17.0392 14.0008L17.0194 14H16.9997C16.2909 14 15.5506 13.9909 14.8185 14.0364Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="ms-3">Employees</span>
                </a>
              </li>
            )}

            {!user?.empProfile?.isAdmin && (
              <li>
                <a
                  href="job"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    fill="none"
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      fill="currentColor"
                      d="m74 42a2 2 0 0 1 2 1.85v28.15a6 6 0 0 1 -5.78 6h-40.22a6 6 0 0 1 -6-5.78v-28.22a2 2 0 0 1 1.85-2zm-15.5 8.34-.12.1-11.45 12.41-5.2-5a1.51 1.51 0 0 0 -2-.1l-.11.1-2.14 1.92a1.2 1.2 0 0 0 -.1 1.81l.1.11 7.33 6.94a3.07 3.07 0 0 0 2.14.89 2.81 2.81 0 0 0 2.13-.89l5.92-6.29.43-.44.42-.45.55-.58.21-.22.42-.44 5.62-5.93a1.54 1.54 0 0 0 .08-1.82l-.08-.1-2.14-1.92a1.51 1.51 0 0 0 -2.01-.1zm15.5-28.34a6 6 0 0 1 6 6v6a2 2 0 0 1 -2 2h-56a2 2 0 0 1 -2-2v-6a6 6 0 0 1 6-6z"
                    />
                  </svg>
                  <span className="ms-3">Jobs</span>
                </a>
              </li>
            )}

            {!user?.empProfile?.isAdmin && (
              <li>
                <a
                  href="payment"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22 12.9342C22 12.956 22 12.978 22 13L22 15C22 15.022 22 15.044 22 15.0658C22 15.9523 22.0001 16.7161 21.9179 17.3278C21.8297 17.9833 21.631 18.6117 21.1213 19.1213C20.6117 19.631 19.9833 19.8297 19.3278 19.9179C18.7161 20.0001 17.9523 20.0001 17.0658 20L10.9342 20C10.0477 20.0001 9.28386 20.0001 8.6722 19.9179C8.01669 19.8297 7.38834 19.631 6.87867 19.1213C6.36901 18.6117 6.17027 17.9833 6.08214 17.3278C5.9999 16.7161 5.99994 15.9523 5.99999 15.0658L5.99999 12.9342C5.99994 12.0477 5.9999 11.2839 6.08214 10.6722C6.17027 10.0167 6.36901 9.38835 6.87867 8.87868C7.38834 8.36902 8.01669 8.17028 8.6722 8.08214C9.28386 7.99991 10.0477 7.99995 10.9342 8L17 8C17.022 8 17.044 8 17.0658 8C17.9523 7.99995 18.7161 7.99991 19.3278 8.08215C19.9833 8.17028 20.6117 8.36902 21.1213 8.87868C21.631 9.38835 21.8297 10.0167 21.9179 10.6722C22.0001 11.2839 22 12.0477 22 12.9342ZM11 14C11 12.3431 12.3432 11 14 11C15.6569 11 17 12.3431 17 14C17 15.6569 15.6569 17 14 17C12.3432 17 11 15.6569 11 14Z"
                      fill="currentColor"
                    />
                    <path
                      d="M17.9965 7.00391C17.7103 6.99994 17.4161 6.99997 17.1189 7.00001L10.8813 7.00001C10.0376 6.99992 9.21767 6.99983 8.53906 7.09107C7.77331 7.19402 6.89841 7.44484 6.17167 8.17158C5.44493 8.89832 5.19411 9.77323 5.09116 10.539C4.99992 11.2176 5 12.0375 5.00009 12.8813V15.1187C5.00006 15.4118 5.00003 15.702 5.00383 15.9844C4.93907 15.9812 4.87645 15.9774 4.81603 15.9727C4.44281 15.9439 4.07084 15.8804 3.70949 15.7082C3.08831 15.4122 2.58777 14.9117 2.29177 14.2905C2.11957 13.9291 2.05608 13.5572 2.02728 13.184C1.99998 12.8301 1.99999 12.4011 2.00001 11.9039L2 8.93415C1.99995 8.04768 1.99991 7.28385 2.08215 6.67219C2.17028 6.01668 2.36902 5.38833 2.87869 4.87866C3.38835 4.369 4.0167 4.17026 4.67221 4.08213C5.28387 3.99989 6.04769 3.99993 6.93418 3.99998L14.539 3.99993C14.9608 3.99956 15.3242 3.99924 15.6475 4.07069C16.7872 4.32262 17.6774 5.21276 17.9293 6.35249C17.9736 6.55277 17.9903 6.76846 17.9965 7.00391Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="ms-3">Payments</span>
                </a>
              </li>
            )}

            <li>
              <div
                onClick={() => signout()}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    fill="currentColor"
                    d="M3.5 9.56757V14.4324C3.5 16.7258 3.5 17.8724 4.22161 18.5849C4.87719 19.2321 5.89578 19.2913 7.81846 19.2968C7.71686 18.6224 7.69563 17.8168 7.69029 16.8689C7.68802 16.4659 8.01709 16.1374 8.42529 16.1351C8.83348 16.1329 9.16624 16.4578 9.16851 16.8608C9.17451 17.9247 9.20249 18.6789 9.30898 19.2512C9.41158 19.8027 9.57634 20.1219 9.81626 20.3588C10.089 20.6281 10.4719 20.8037 11.1951 20.8996C11.9395 20.9985 12.9261 21 14.3407 21H15.3262C16.7407 21 17.7273 20.9985 18.4717 20.8996C19.1949 20.8037 19.5778 20.6281 19.8505 20.3588C20.1233 20.0895 20.3011 19.7114 20.3983 18.9975C20.4984 18.2626 20.5 17.2885 20.5 15.8919V8.10811C20.5 6.71149 20.4984 5.73743 20.3983 5.0025C20.3011 4.28855 20.1233 3.91048 19.8505 3.6412C19.5778 3.37192 19.1949 3.19635 18.4717 3.10036C17.7273 3.00155 16.7407 3 15.3262 3H14.3407C12.9261 3 11.9395 3.00155 11.1951 3.10036C10.4719 3.19635 10.089 3.37192 9.81626 3.6412C9.57634 3.87807 9.41158 4.19728 9.30898 4.74877C9.20249 5.32112 9.17451 6.07525 9.16851 7.1392C9.16624 7.54221 8.83348 7.8671 8.42529 7.86485C8.01709 7.86261 7.68802 7.53409 7.69029 7.13107C7.69563 6.18322 7.71686 5.37758 7.81846 4.70325C5.89578 4.70867 4.87719 4.76789 4.22161 5.41515C3.5 6.12759 3.5 7.27425 3.5 9.56757ZM5.93385 12.516C5.6452 12.231 5.6452 11.769 5.93385 11.484L7.90484 9.53806C8.19348 9.25308 8.66147 9.25308 8.95011 9.53806C9.23876 9.82304 9.23876 10.2851 8.95011 10.5701L8.24088 11.2703L15.3259 11.2703C15.7341 11.2703 16.0651 11.597 16.0651 12C16.0651 12.403 15.7341 12.7297 15.3259 12.7297L8.24088 12.7297L8.95011 13.4299C9.23876 13.7149 9.23876 14.177 8.95011 14.4619C8.66147 14.7469 8.19348 14.7469 7.90484 14.4619L5.93385 12.516Z"
                  />
                </svg>

                <span className="ms-3">Sign out</span>
              </div>
            </li>
          </ul>
        </div>
      </aside>
      <div className="pt-16 px-6 sm:ml-64">{body}</div>
    </div>
  );
};

export default DashboardLayout;
