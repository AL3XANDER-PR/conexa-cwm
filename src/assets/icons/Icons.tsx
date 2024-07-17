export const IconCompany = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
      />
    </svg>
  );
};
export const IconPerson = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
      />
    </svg>
  );
};

interface IconProps {
  tipo: string;
}

export const IconMoneda = ({ tipo }: IconProps) => {
  return (
    <>
      {tipo === "USD" && (
        <svg
          xmlns="http://www.w3.org/2000/ssvg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      )}
      {tipo === "PEN" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className="size-8"
          x="0"
          y="0"
          viewBox="0 0 220 220"
          xmlSpace="preserve"
          strokeWidth={1.5}
        >
          <g>
            <path
              d="M110 0C49.346 0 0 49.346 0 110s49.346 110 110 110 110-49.346 110-110S170.654 0 110 0zm0 210c-55.14 0-100-44.86-100-100S54.86 10 110 10s100 44.86 100 100-44.86 100-100 100z"
              fill="currentColor"
              opacity="1"
              data-original="#000000"
            ></path>
            <path
              d="M110.06 120.333c0-12.269-9.981-22.25-22.25-22.25-5.652 0-10.25-4.598-10.25-10.25s4.598-10.25 10.25-10.25 10.25 4.598 10.25 10.25h12c0-12.269-9.981-22.25-22.25-22.25s-22.25 9.981-22.25 22.25 9.981 22.25 22.25 22.25c5.652 0 10.25 4.598 10.25 10.25s-4.598 10.25-10.25 10.25-10.25-4.598-10.25-10.25h-12c0 12.269 9.981 22.25 22.25 22.25s22.25-9.981 22.25-22.25zM140.035 127.754a6.915 6.915 0 0 0-4.851 2.002 6.923 6.923 0 0 0-2.013 4.862c0 1.808.732 3.57 2.013 4.851 1.27 1.28 3.043 2.013 4.851 2.013s3.581-.733 4.862-2.013a6.939 6.939 0 0 0 2.002-4.851 6.964 6.964 0 0 0-2.002-4.862 6.96 6.96 0 0 0-4.862-2.002zM141.059 82.559l-34.256 59.858h11.522l34.257-59.858z"
              fill="currentColor"
              opacity="1"
              data-original="#000000"
            ></path>
          </g>
        </svg>
      )}
    </>
  );
};
