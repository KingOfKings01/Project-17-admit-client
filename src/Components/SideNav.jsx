import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function SideNav() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const linkClassNames = (path) =>
    `p-3 rounded-lg ${activeLink == path ? 'bg-white text-black w-[230px]' : 'text-white'} hover:bg-white hover:text-black  transition-all duration-300 ease-in-out`;

  return (
    <nav className="px-[20px] py-[15px] text-[#fff] h-[100vh] bg-blue-700">
      <div className="flex flex-col gap-3">
        <h3 className="text-xl">Side Navbar</h3>
        <Link
          to="/category"
          className={`w-[210px] ${linkClassNames('/category')}`}
          onClick={() => setActiveLink('/category')}
        >
          Category
        </Link>
        <Link
          to="/movies"
          className={`w-[210px] ${linkClassNames('/movies')}`}
          onClick={() => setActiveLink('/movies')}
        >
          Movies
        </Link>
        <Link
          to="/bookings"
          className={`w-[210px] ${linkClassNames('/bookings')}`}
          onClick={() => setActiveLink('/bookings')}
        >
          Bookings
        </Link>
        <Link
          to="/showtime"
          className={`w-[210px] ${linkClassNames('/showtime')}`}
          onClick={() => setActiveLink('/showtime')}
        >
          Showtime
        </Link>
      </div>
      <button
        className="w-[15vw] ml-2 mt-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
      >
        Logout
      </button>
    </nav>
  );
}