interface Props {
  message: string;
}

import Conexa from "../assets/icons/icono-conexa.svg";
const Loading = ({ message }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75 blu">
      <div className="flex flex-col items-center justify-center">
        <img
          src={Conexa}
          alt="conexa-logo"
          className="h-20 mb-4 left-4 relative"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3.5em"
          height="3.5em"
          viewBox="0 0 26 26"
          className="text-blue-500"
        >
          <g stroke="currentColor">
            <circle
              cx={12}
              cy={12}
              r={9.5}
              fill="none"
              strokeLinecap="round"
              strokeWidth={2}
            >
              <animate
                attributeName="stroke-dasharray"
                calcMode="spline"
                dur="1.5s"
                keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                keyTimes="0;0.475;0.95;1"
                repeatCount="indefinite"
                values="0 150;42 150;42 150;42 150"
              ></animate>
              <animate
                attributeName="stroke-dashoffset"
                calcMode="spline"
                dur="1.5s"
                keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                keyTimes="0;0.475;0.95;1"
                repeatCount="indefinite"
                values="0;-16;-59;-59"
              ></animate>
            </circle>
            <animateTransform
              attributeName="transform"
              dur="2s"
              repeatCount="indefinite"
              type="rotate"
              values="0 12 12;360 12 12"
            ></animateTransform>
          </g>
        </svg>
        <p className="text-white text-sm mt-4">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
