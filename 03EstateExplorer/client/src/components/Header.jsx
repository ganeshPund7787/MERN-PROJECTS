import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-orange-500 shadow-md ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-700">estate</span>
          <span className="text-slate-500">Explorer</span>
        </h1>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="search..."
            className="bg-transparent outline-none focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-4 font-bold">
          <Link to={"/"}>
            <li className="hidden sm:inline hover:underline ">HOME</li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden sm:inline hover:underline">ABOUT</li>
          </Link>
          <Link to={"/sign-in"}>
            <li className=" hover:underline">SIGN IN</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
