import React from 'react';

const EwateLogo: React.FC<{ width?: number; height?: number }> = ({ width = 200, height = 200 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4CAF50" />
          <stop offset="100%" stopColor="#2196F3" />
        </linearGradient>
      </defs>

      <circle cx="100" cy="100" r="98" fill="#001f3f" />

      <g stroke="url(#circuitGradient)" strokeWidth="2">
        <path d="M20,100 H80 M120,100 H180" />
        <path d="M100,20 V80 M100,120 V180" />
        <path d="M40,40 L70,70 M130,130 L160,160" />
        <path d="M40,160 L70,130 M130,70 L160,40" />
        <circle cx="100" cy="100" r="30" fill="none" />
        <circle cx="100" cy="100" r="50" fill="none" />
      </g>

      <g transform="translate(100, 100) scale(0.4)">
        <path
          d="M0,-80 A80,80 0 0,1 69.28,-40 L40,-23.09 A46.45,46.45 0 0,0 0,-46.45 Z"
          fill="#4CAF50"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 0 0"
            to="120 0 0"
            dur="4s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M69.28,-40 A80,80 0 0,1 69.28,40 L40,23.09 A46.45,46.45 0 0,0 40,-23.09 Z"
          fill="#2196F3"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 0 0"
            to="120 0 0"
            dur="4s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M69.28,40 A80,80 0 0,1 -69.28,40 L-40,23.09 A46.45,46.45 0 0,0 40,23.09 Z"
          fill="#FFC107"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 0 0"
            to="120 0 0"
            dur="4s"
            repeatCount="indefinite"
          />
        </path>
      </g>


      <text
        x="100"
        y="178"
        fontFamily="Arial, sans-serif"
        fontSize="24"
        fontWeight="bold"
        fill="#ffffff"
        textAnchor="middle"
      >
        EWASTE
      </text>
    </svg>
  );
};

export default EwateLogo;

