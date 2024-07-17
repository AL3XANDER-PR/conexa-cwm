import { useState } from "react";

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
      type="button"
        className="p2  rounded hover:bg-gray-200"
        onClick={handleOpenModal}
      >
        <svg
          className="w-5 h-5 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>

      {isModalOpen && (
        <div className="fixed flex bg-black bg-opacity-50 px-4 overflow-x-hidden overflow-hidden  top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full ">
          <div className="relative  w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow ">
              <div className="flex items-center justify-between p-2 md:py-2 md:px-4  rounded-t ">
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                  onClick={handleCloseModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close</span>
                </button>
              </div>

              <div className="p-4 md:p-5 flex gap-3 flex-col md:flex-row">
                <div className="py-2 w-full bg-white border border-gray-200 rounded-lg shadow ">
                  <img
                    src="https://img.icons8.com/dotty/80/228BE6/stocks-growth.png"
                    alt="stocks-growth"
                    className="mx-auto h-16"
                  />
                  <div className="px-5 py-2">
                    <div>
                      <h5 className="text-xl font-semibold tracking-tight text-gray-700 text-center">
                        Participe Clase A
                      </h5>
                      <p className="mb-3 text-xs font-normal text-gray-700 text-center">
                        Mayor rendimiento proyectado
                      </p>
                    </div>
                    <div className="mb-3 text-xs font-normal text-gray-700 ">
                      <p className="mb-2 ">
                        - El Pago de Rendimientos al cierre de cada trimestre
                        calendario <br />
                      </p>
                      <p className="mb-2 ">
                        - No aplica penalidad de Rescate. <br />
                      </p>
                      <p className="mb-2 ">
                        - El rescate es al cierre de cada semestre calendario,
                        de 12 meses. de inversión <br />
                      </p>
                      <p className="mb-2 ">
                        - Los documentos que se emiten son Contrato y Certificado
                        de Partición
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-2 w-full bg-white border border-gray-200 rounded-lg shadow ">
                  <img
                    src="https://img.icons8.com/dotty/80/228BE6/neutral-trading.png"
                    alt="neutral-trading"
                    className="mx-auto h-16"
                  />
                  <div className="px-5 py-2">
                    <div>
                      <h5 className="text-xl font-semibold tracking-tight text-gray-700 text-center">
                        Participe Clase B
                      </h5>
                      <p className="mb-3 text-xs font-normal text-gray-700 text-center">
                        Rendimiento fijo garantizado
                      </p>
                    </div>
                    <div className="mb-3 text-xs font-normal text-gray-700 ">
                      <p className="mb-2 ">
                        - El Pago de Rendimientos es de acuerdo al cronogruna de
                        pagos (Mensual, Trimestral, Anual)
                        <br />
                      </p>
                      <p className="mb-2 ">
                        - Aplica penalidad para rescates anticipados. Entre 2% y
                        4% dependiendo del plazo.
                        <br />
                      </p>
                      <p className="mb-2 ">
                        - El rescate es Mensual, luego de 12 meses de inversión
                        <br />
                      </p>
                      <p className="mb-2 ">
                        - Los Documentos que se emiten son Contrato y Cetificado
                        de Participación + cronograma de pagos
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center py-2 px-4 md:p-5 border-t border-gray-200 rounded-b">
                <button
                  data-modal-hide="static-modal"
                  type="button"
                  className="py-2.5 px-5 ms-auto text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                  onClick={handleCloseModal}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
        // </div>
      )}
    </>
  );
};

export default Modal;
