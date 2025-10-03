import { Link } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <nav className="sticky top-0 z-50 shadow-md bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          LMS
        </span>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex space-x-8 font-medium">
            <li>
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-2 dark:text-white md:dark:text-blue-500"
              >
                Home
              </Link>
            </li>
            <li>
              <a
                href="#about"
                onClick={() =>
                  window.scrollTo({ bottom: 0, behavior: "smooth" })
                }
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={() =>
                  window.scrollTo({ bottom: 0, behavior: "smooth" })
                }
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white"
              >
                Contact
              </a>
            </li>
            <div className="ml-auto flex items-center space-x-4">
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              >
                Register
              </Link>

              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              >
                Login
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
