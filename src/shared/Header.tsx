import { useEffect, useState } from "react";
import logoConexa from "../assets/img/conexa.png";

export default function Header() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);
  return (
    <header
      className={`fixed top-0 w-full transition-transform duration-300 bg-white z-50 ${
        showNavbar ? "transform translate-y-0" : "transform -translate-y-full"
      } `}
    >
      <nav className="max-w-7xl mx-auto py-4 md:py-4 px-6 md:px-0 flex justify-between items-center z-40">
        <div className="flex items-center space-x-4">
          <img src={logoConexa} alt="Conexa" className="h-12 sm:h-12 md:h-14" />
        </div>
        <ul className="lg:flex items-center gap-5 hidden text-sm">
          <li>
            <a
              href="https://www.conexa.com.pe/nosotros/"
              target="_blank"
              className="text-gray-800 font-medium hover:text-blue-600"
            >
              Nosotros
            </a>
          </li>
          <li>
            <a
              href="https://www.conexa.com.pe/subsidiarias/"
              target="_blank"
              className="text-gray-800 font-medium hover:text-blue-600"
            >
              Subsidarias
            </a>
          </li>
          <li>
            <a
              href="https://www.conexa.com.pe/contactanos/"
              target="_blank"
              className="text-gray-800 font-medium hover:text-blue-600"
            >
              Contáctanos
            </a>
          </li>
          <li>
            <a
              href="https://forms.gle/3GS1gzjpKzkVQYpw5"
              target="_blank"
              className="text-gray-800 font-medium hover:text-blue-600"
            >
              Trabaja con nosotros
            </a>
          </li>
          <li>
            <a
              href="https://www.conexa.com.pe/quiero-invertir/"
              target="_blank"
              className="border-2 inline-block text-center font-medium border-blue-500 text-gray-800 py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white"
            >
              Quiero invertir
            </a>
          </li>
          <li>
            <a
              href="https://www.conexa.com.pe/busco-finaciamiento/"
              target="_blank"
              className="border-2 inline-block text-center font-medium border-blue-500 text-gray-800 py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white"
            >
              Busco financiamiento
            </a>
          </li>
          {/* <li className="relative group">
                <button className="flex items-center focus:outline-none">
                    <span className="text-gray-800">ES</span>
                    <svg className="ml-2 w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md hidden group-hover:block">
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">EN</a>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">FR</a>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">DE</a>
                </div>
            </li> */}
        </ul>
      </nav>
    </header>
  );
}
