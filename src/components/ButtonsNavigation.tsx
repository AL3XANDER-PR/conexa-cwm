interface ButtonsNavigationType {
  activeStep: number;
  pasos: number;
  handleBack: () => void;
  handleNext: () => void;
  handleConfirm: () => void;
}
export const ButtonsNavigation = ({
  activeStep,
  pasos,
  handleBack,
  handleNext,
  handleConfirm,
}: ButtonsNavigationType) => {
  return (
    <div className="flex justify-between mt-4">
      {activeStep !== 0 && (
        <button
          type="button"
          onClick={handleBack}
          className="text-white bg-gray-400 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  "
        >
          <svg
            className="w-5 h-5 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m15 19-7-7 7-7"
            />
          </svg>
          Atras
        </button>
      )}
      {activeStep + 1 < pasos && (
        <button
          type="button"
          onClick={handleNext}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center   ms-auto"
        >
          Siguiente
          <svg
            className="w-5 h-5 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m9 5 7 7-7 7"
            />
          </svg>
        </button>
      )}
      {activeStep + 1 === pasos && (
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center   ms-auto"
          onClick={handleConfirm}
        >
          Siguiente
        </button>
      )}
    </div>
  );
};
