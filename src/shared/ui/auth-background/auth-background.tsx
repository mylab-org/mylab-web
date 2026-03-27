export const AuthBackground = () => (
  <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
    <svg
      className="h-full w-full"
      viewBox="0 0 400 800"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* 1. 색 농도를 높인 Radial Gradient (opacity 제거하고 stop 지점 조정) */}
        {/*<radialGradient id="labGrad" cx="20%" cy="30%" r="100%">*/}
        {/*  <stop offset="0%" stopColor="#2e75ff" />*/}
        {/*  <stop offset="45%" stopColor="#2562CD" />*/}
        {/*  <stop offset="100%" stopColor="#1a469a" />*/}
        {/*</radialGradient>*/}

        {/*<filter id="blurFilter">*/}
        {/*  <feGaussianBlur in="SourceGraphic" stdDeviation="3" />*/}
        {/*</filter>*/}
        <radialGradient id="labGrad" cx="20%" cy="30%" r="100%">
          <stop offset="0%" stopColor="#465366" /> {/* 약간 밝은 톤 */}
          <stop offset="50%" stopColor="#364153" /> {/* 요청하신 메인 컬러 */}
          <stop offset="100%" stopColor="#28313f" /> {/* 어두운 딥 톤 */}
        </radialGradient>

        <filter id="blurFilter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter>
      </defs>

      {/* 메인 배경 (전체 채도 유지) */}
      <rect width="400" height="800" fill="url(#labGrad)" />

      {/* 2. 늘어난 6개의 물방울 요소 (위치와 크기 다양화) */}

      {/* 우측 상단 메인 물방울 */}
      <g transform="translate(320, 250)">
        <path fill="white" fillOpacity="0.12" stroke="white" strokeOpacity="0.2" strokeWidth="1.5">
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="M-60,0 C-60,-33 -33,-60 0,-60 C33,-60 60,-33 60,0 C60,33 33,60 0,60 C-33,60 -60,33 -60,0;
                    M-55,-15 C-75,-45 -25,-75 15,-65 C55,-55 75,-15 55,25 C35,65 -25,65 -55,35 C-75,5 -25,15 -55,-15;
                    M-60,0 C-60,-33 -33,-60 0,-60 C33,-60 60,-33 60,0 C60,33 33,60 0,60 C-33,60 -60,33 -60,0"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="15s"
            repeatCount="indefinite"
          />
        </path>
      </g>

      {/* 좌측 중앙 물방울 */}
      <g transform="translate(60, 460)">
        <path fill="white" fillOpacity="0.08" stroke="white" strokeOpacity="0.15">
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="M-40,0 C-40,-22 -22,-40 0,-40 C22,-40 40,-22 40,0 C40,22 22,40 0,40 C-22,40 -40,22 -40,0;
                    M-30,-10 C-45,-30 -15,-45 15,-35 C45,-25 45,-5 30,20 C15,45 -15,45 -35,20 C-45,0 -15,5 -30,-10;
                    M-40,0 C-40,-22 -22,-40 0,-40 C22,-40 40,-22 40,0 C40,22 22,40 0,40 C-22,40 -40,22 -40,0"
          />
        </path>
      </g>

      {/* 중앙 하단 물방울 */}
      <g transform="translate(200, 500)">
        <path fill="white" fillOpacity="0.06" stroke="white" strokeOpacity="0.1">
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="M-50,0 C-50,-27 -27,-50 0,-50 C27,-50 50,-27 50,0 C50,27 27,50 0,50 C-27,50 -50,27 -50,0;
                    M-45,5 C-60,-20 -20,-60 20,-45 C60,-30 60,10 40,35 C20,60 -20,60 -45,30 C-65,5 -25,-10 -45,5;
                    M-50,0 C-50,-27 -27,-50 0,-50 C27,-50 50,-27 50,0 C50,27 27,50 0,50 C-27,50 -50,27 -50,0"
          />
        </path>
      </g>

      {/* 좌측 하단 물방울 */}
      <g transform="translate(200, 600)">
        <path fill="white" fillOpacity="0.1" stroke="white" strokeOpacity="0.2">
          <animate
            attributeName="d"
            dur="9s"
            repeatCount="indefinite"
            values="M-45,0 C-45,-25 -25,-45 0,-45 C25,-45 45,-25 45,0 C45,25 25,45 0,45 C-25,45 -45,25 -45,0;
                    M-40,-5 C-55,-30 -15,-55 15,-40 C45,-25 50,0 35,25 C20,55 -25,50 -40,20 C-50,0 -20,10 -40,-5;
                    M-45,0 C-45,-25 -25,-45 0,-45 C25,-45 45,-25 45,0 C45,25 25,45 0,45 C-25,45 -45,25 -45,0"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360"
            to="0"
            dur="18s"
            repeatCount="indefinite"
          />
        </path>
      </g>

      {/* 우측 하단 작은 노드 1 */}
      <circle cx="340" cy="650" r="15" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" />

      {/* 좌측 상단 작은 노드 2 */}
      <circle cx="50" cy="180" r="20" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.08" />

      {/* 데이터 연결 라인 (선명도 조정) */}
      <g stroke="white" strokeOpacity="0.2" strokeWidth="1" filter="url(#blurFilter)">
        <line x1="60" y1="320" x2="200" y2="500" />
        <line x1="200" y1="500" x2="320" y2="150" />
        <line x1="90" y1="700" x2="200" y2="500" />
      </g>

      {/* 펄스 노드 (System Online용) */}
      <g transform="translate(40, 40)">
        <circle r="3.5" fill="white" />
        <circle r="3.5" fill="white" fillOpacity="0.6">
          <animate attributeName="r" from="3.5" to="14" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  </div>
)
