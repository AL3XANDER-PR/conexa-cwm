export default function Hero() {
  return (
    <section className="mx-auto bg-cover bg-center bg-no-repeat bg-[url('./assets/img/fondo_conexa.jpg')] w-full">
      <section className="py-8  md:py-16  inset-0  bg-gradient-to-r from-[#243f67] via-[#0c2e60] to-[#033278] opacity-75">
        <div className="relative z-10 text-center mx-5 md:mx-0 text-white">
          <h1 className="text-2xl md:text-4xl font-bold">
            Ficha de Datos Nuevo Inversionista
          </h1>
          <p className="text-xs md:text-lg  md:block mt-1">
            Registra tu datos para ser parte de Conexa
          </p>
        </div>
      </section>
    </section>
  );
}
