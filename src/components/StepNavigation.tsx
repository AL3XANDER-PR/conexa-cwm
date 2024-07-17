interface StepProps {
  pasos: any[];
  activeStep: number;
  handleStepClick: (index: number) => void;
}

export const StepNavigation = ({
  pasos,
  activeStep,
  handleStepClick,
}: StepProps) => {
  return (
    <>
      <div className=" pl-0 py-6 pr-6 hidden md:block">
        <div className="space-y-7 pr-6 border-r">
          {pasos.map((step, index) => (
            <div
              key={index}
              className={`flex items-center justify-end  gap-4 rounded-md px-4 py-2 transition-colors relative  ${
                activeStep === index ? "bg-gray-200  " : "hover:bg-blue-50 "
              } '${activeStep <= index ? "bg-red-200" : "bg-green-600"}'`}
              onClick={() => handleStepClick(index)}
            >
              <div className="text-end">
                <h3 className="text-base font-medium">{step.title}</h3>
                <p className="text-xs text-gray-500 ">{step.description}</p>
              </div>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  activeStep === index
                    ? "bg-blue-700 text-white "
                    : "bg-gray-200 text-gray-900  "
                }`}
              >
                {index + 1}
              </div>
              <div
                className={`absolute -right-[1.9rem] h-[12px] w-[12px] rounded-full  ${
                  activeStep === index ? "bg-blue-700" : "bg-gray-300"
                } `}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-3 md:hidden w-full mb-3">
        {pasos.map((_, index) => (
          <div
            key={index}
            className={`flex  items-center justify-end  gap-4 rounded-full transition-colors cursor-pointer ${
              activeStep === index ? "bg-gray-200  " : "hover:bg-blue-50 "
            } '${activeStep <= index ? "bg-red-200" : "bg-green-600"}'`}
            onClick={() => handleStepClick(index)}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                activeStep === index
                  ? "bg-blue-700 text-white "
                  : "bg-gray-200 text-gray-900  "
              }`}
            >
              {index + 1}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
