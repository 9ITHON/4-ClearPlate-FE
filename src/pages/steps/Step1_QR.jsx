import { useEffect } from "react";
import { Scanner } from '@yudiel/react-qr-scanner';
import { useNavStore } from "../../stores/navStore";
import BottomNav from "../../components/BottomNav";

// 카드 사이즈
const CARD_RATIO = 9 / 19;
const MAX_W = 500;
const MIN_W = 300;

export default function Step1_QR({ onNext }) {
  const showNav = useNavStore((s) => s.showNav);
  const hideNav = useNavStore((s) => s.hideNav);

  useEffect(() => {
    showNav();
    return () => hideNav();
  }, [showNav, hideNav]);

  const handleMock = () => onNext?.("테스트-QR-결과");

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      <div
        className="relative mx-auto rounded-2xl shadow-xl flex flex-col overflow-hidden"
        style={{
          width: "100%",
          maxWidth: MAX_W,
          minWidth: MIN_W,
          aspectRatio: CARD_RATIO,
        }}
      >
        {/* 상단 '식사 인증' */}
        <div className="absolute top-6 right-6 z-30">
          <span className="text-white text-lg font-bold drop-shadow">식사 인증</span>
        </div>

        {/* 안내/진행바 */}
        <div className="absolute left-1/2 top-14 -translate-x-1/2 z-30 flex flex-col items-center w-[90%]">
          <div className="flex items-center w-[140px] h-3 mb-2">
            {[1, 2, 3, 4].map(i => (
              <span
                key={i}
                className={`block w-2 h-2 rounded-full mx-[10px] 
                  ${i === 1 ? "bg-white/90" : "bg-white/40"}
                `}
              />
            ))}
          </div>
          <span className="text-white text-lg font-bold drop-shadow mb-1 mt-1">
            QR코드를 스캔해주세요.
          </span>
          <span className="text-white/90 text-[15px] text-center drop-shadow mb-1">
            사각형에 QR코드를 맞춰주세요.<br />
            가게 정보가 자동으로 인식됩니다.
          </span>
        </div>

        {/* QR스캐너+마스킹+네모 */}
        <div className="absolute inset-0 z-10 rounded-2xl overflow-hidden">
          <Scanner
            onResult={(result, error) => {
              if (result?.text) onNext?.(result.text);
            }}
            constraints={{ facingMode: "environment" }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              background: "black"
            }}
            videoStyle={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            hideBorder={true} // 기본 빨간 라인 완전 OFF
            isShowScanningLine={false}
          />
          <OverlayWithHole />
        </div>

        {/* 하단: 버튼+네비바 */}
        <div className="absolute w-full left-0 bottom-0 flex flex-col items-center pb-4 z-40">
          <button
            onClick={handleMock}
            className="mb-30 px-8 py-3 bg-[#124534] text-white rounded-xl font-semibold shadow-lg"
          >
            확인(임의)
          </button>
          <div className="w-full">
            <BottomNav />
          </div>
        </div>
      </div>
    </div>
  );
}

function OverlayWithHole() {
  const holeW = 700, holeH = 700, border = 8, cornerLen = 40, radius = 22;
  const svgW = 1000, svgH = 1800; // 충분히 크게, but 실제 부모 크기에 맞게 설정!
  // (1000x1800은 예시. 실제 카드 컨테이너의 width/height 알아내서 대입 추천)

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        width="100%" height="100%"
        viewBox={`0 0 ${svgW} ${svgH}`}
        style={{ position: "absolute", inset: 0, zIndex: 2 }}
      >
        {/* 마스크 정의 */}
        <defs>
          <mask id="scan-mask">
            <rect width={svgW} height={svgH} fill="white" />
            {/* 중앙 구멍 (정확히 중앙!) */}
            <rect
              x={svgW/2 - holeW/2}
              y={svgH/2 - holeH/2}
              width={holeW} height={holeH}
              fill="black"
              rx={radius}
            />
          </mask>
        </defs>
        {/* 어두운 오버레이 */}
        <rect
          width={svgW} height={svgH}
          fill="black" fillOpacity="0.4"
          mask="url(#scan-mask)"
        />
        {/* 흰색 코너, 중앙에 맞춤 */}
        {/* 좌상 */}
        <rect x={svgW/2-holeW/2} y={svgH/2-holeH/2} width={cornerLen} height={border} fill="#fff" rx={border} />
        <rect x={svgW/2-holeW/2} y={svgH/2-holeH/2} width={border} height={cornerLen} fill="#fff" rx={border} />
        {/* 우상 */}
        <rect x={svgW/2+holeW/2-cornerLen} y={svgH/2-holeH/2} width={cornerLen} height={border} fill="#fff" rx={border} />
        <rect x={svgW/2+holeW/2-border} y={svgH/2-holeH/2} width={border} height={cornerLen} fill="#fff" rx={border} />
        {/* 좌하 */}
        <rect x={svgW/2-holeW/2} y={svgH/2+holeH/2-cornerLen} width={border} height={cornerLen} fill="#fff" rx={border} />
        <rect x={svgW/2-holeW/2} y={svgH/2+holeH/2-border} width={cornerLen} height={border} fill="#fff" rx={border} />
        {/* 우하 */}
        <rect x={svgW/2+holeW/2-cornerLen} y={svgH/2+holeH/2-border} width={cornerLen} height={border} fill="#fff" rx={border} />
        <rect x={svgW/2+holeW/2-border} y={svgH/2+holeH/2-cornerLen} width={border} height={cornerLen} fill="#fff" rx={border} />
      </svg>
    </div>
  );
}
