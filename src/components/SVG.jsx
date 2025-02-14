export function Down({ size, color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      strokeWidth={2}
    >
      {" "}
      <path d="M6 9l6 6l6 -6"></path>{" "}
    </svg>
  );
}

export function Right({ size, color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      strokeWidth={2}
    >
      {" "}
      <path d="M7 7l5 5l-5 5"></path> <path d="M13 7l5 5l-5 5"></path>{" "}
    </svg>
  );
}

export function Left({ size, color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      strokeWidth={2}
    >
      {" "}
      <path d="M11 7l-5 5l5 5"></path> <path d="M17 7l-5 5l5 5"></path>{" "}
    </svg>
  );
}
export function Close({ size, color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      strokeWidth={2}
    >
      {" "}
      <path d="M18 6l-12 12"></path> <path d="M6 6l12 12"></path>{" "}
    </svg>
  );
}
export function Cart({ size }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokelinecap="round"
      strokelinejoin="round"
      width={size}
      height={size}
      strokeWidth={2}
    >
      {" "}
      <path d="M17.5 17.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0"></path>{" "}
      <path d="M6 8v11a1 1 0 0 0 1.806 .591l3.694 -5.091v.055"></path>{" "}
      <path d="M6 8h15l-3.5 7l-7.1 -.747a4 4 0 0 1 -3.296 -2.493l-2.853 -7.13a1 1 0 0 0 -.928 -.63h-1.323"></path>{" "}
    </svg>
  );
}
export function CartHeading({ size }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokelinecap="round"
      strokelinejoin="round"
      width={size}
      height={size}
      strokeWidth={2}
    >
      {" "}
      <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>{" "}
      <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>{" "}
      <path d="M17 17h-11v-14h-2"></path> <path d="M6 5l14 1l-1 7h-13"></path>{" "}
    </svg>
  );
}
export function Trash({ size }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokelinecap="round"
      strokelinejoin="round"
      width={size}
      height={size}
      strokeWidth={2}
    >
      {" "}
      <path d="M4 7l16 0"></path> <path d="M10 11l0 6"></path>{" "}
      <path d="M14 11l0 6"></path>{" "}
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>{" "}
      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>{" "}
    </svg>
  );
}
export function House({ size }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokelinecap="round"
      strokelinejoin="round"
      width={size}
      height={size}
      strokeWidth={2}
    >
      {" "}
      <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>{" "}
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>{" "}
      <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>{" "}
    </svg>
  );
}
