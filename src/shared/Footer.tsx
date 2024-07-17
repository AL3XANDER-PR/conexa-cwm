import logoConexaBlanco from "../assets/img/conexa-b.png";

export default function Footer() {
  return (
    <footer className=" bg-[#001431] w-full">
      <section className="text-white py-8 md:py-8 max-w-7xl    mx-auto  flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
        <img src={logoConexaBlanco} alt="Conexa" className="h-16" />
        <div className="flex flex-col md:flex-row md:gap-10 text-center md:text-start">
          <ul className="">
            <li className="mb-3">
              <a
                href="https://www.conexa.com.pe/nosotros/"
                target="_blank"
                className="font-medium hover:text-blue-600 transition-colors"
              >
                Nosotros
              </a>
            </li>
            <li className="mb-3">
              <a
                href="https://www.conexa.com.pe/subsidiarias/"
                target="_blank"
                className="font-medium hover:text-blue-600 transition-colors"
              >
                Subsidiarias
              </a>
            </li>
            <li className="mb-3">
              <a
                href="https://www.conexa.com.pe/blog/"
                target="_blank"
                className="font-medium hover:text-blue-600 transition-colors"
              >
                Blog
              </a>
            </li>
          </ul>
          <ul>
            <li className="mb-3">
              <a
                href="https://www.conexa.com.pe/contactanos/"
                target="_blank"
                className="font-medium hover:text-blue-600"
              >
                Contáctanos
              </a>
            </li>
            <li className="mb-3">
              <a
                href="https://forms.gle/3GS1gzjpKzkVQYpw5"
                target="_blank"
                className="font-medium hover:text-blue-600"
              >
                Trabaja con nosotros
              </a>
            </li>
            <li className="mb-3">
              <a
                href="https://www.conexa.com.pe/politicas-de-privacidad/"
                target="_blank"
                className="font-medium hover:text-blue-600"
              >
                Políticas de Privacidad
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 w-10/12 md:w-auto">
          <a
            href="#invertir"
            className="border-2 md:w-72 text-center font-medium border-white text-white py-2 px-4 rounded-full hover:bg-white hover:text-black"
          >
            Quiero invertir
          </a>
          <a
            href="#financiamiento"
            className="border-2 md:w-72 text-center font-medium border-white text-white py-2 px-4 rounded-full hover:bg-white hover:text-black"
          >
            Busco financiamiento
          </a>
        </div>
      </section>
    </footer>
  );
}
