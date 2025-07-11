import React, { useState } from "react";
import DragModal from "../../components/DragModal";
import KakaoMap from "../../components/KakaoMap";
// ... 이하 생략


export default function Step2_Map({
  store,           // { name, address, imageUrl, visits, goal, description }
  onNext,
  onPrev,
  currentLocation, // { latitude, longitude }
}) {
  const [review, setReview] = useState("");
  const [modalHeight, setModalHeight] = useState(370);

  // 더미 예시 (props 없으면 fallback)
  const dummy = {
    name: "티엔미미 홍대점",
    address: "서울특별시 마포구 어쩌구...",
    imageUrl: "/store-demo.jpg",
    visits: 4,
    goal: 15,
    description: "홍대에서 소문난 티엔미미는 다양한 딤섬과 중화요리를 맛볼 수 있는 곳입니다.",
    category: "중식",
  };

  const info = store || dummy;

  return (
    <div className="h-screen w-full flex flex-col relative bg-[#F5F5F5]">
      {/* 지도 (KakaoMap) */}
      <div className="w-full h-[220px] relative">
        <KakaoMap
          lat={currentLocation?.latitude || 37.5572}
          lng={currentLocation?.longitude || 126.9245}
          markerLat={currentLocation?.latitude || 37.5572}
          markerLng={currentLocation?.longitude || 126.9245}
          // 옵션에 맞춰서 지도 컨트롤 추가 등 필요시 넣기
        />
      </div>
      {/* DragModal (모달 하단 띄움) */}
      <div className="absolute left-0 bottom-0 w-full z-10">
        <DragModal
          minHeight={170}
          maxHeight={580}
          initialHeight={modalHeight}
          height={modalHeight}
          setHeight={setModalHeight}
        >
          <div className="flex flex-col gap-2 px-6 pt-3 pb-4">
            {/* 썸네일+상호+설명 */}
            <div className="flex gap-4 items-center -mt-8">
              <img
                src={info.imageUrl}
                alt={info.name}
                className="w-16 h-16 rounded-xl object-cover border shadow-md"
              />
              <div className="flex-1">
                <div className="text-green-700 text-xs font-bold mb-1">{info.category || "중식"}</div>
                <div className="text-xl font-bold">{info.name}</div>
                <div className="text-gray-500 text-sm mt-1">{info.description}</div>
              </div>
            </div>

            {/* 도장 현황 */}
            <div className="mt-2 flex items-center justify-between">
              <div className="text-gray-500 text-xs">도장</div>
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">오늘 완료</div>
            </div>
            {/* 스탬프 Progress Bar */}
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 h-3 bg-gray-200 rounded-full relative overflow-hidden">
                <div
                  className="h-full bg-green-600 rounded-full"
                  style={{ width: `${(info.visits / info.goal) * 100}%`, transition: "width 0.5s" }}
                />
              </div>
              <div className="text-xs text-gray-500 font-bold pl-1">
                {info.visits}회
              </div>
              <span className="text-xs text-gray-400 pl-1">/ {info.goal}회</span>
            </div>
            <div className="text-xs text-gray-500 mb-1">
              현재 1회 방문 중 <span className="font-bold text-green-600">{info.visits}회</span> 더 방문하면 쿠폰 지급!
            </div>

            {/* 한줄리뷰 */}
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 text-sm resize-none bg-white focus:outline-green-600 mt-1"
              placeholder="한줄 리뷰를 남겨주세요 (선택)"
              rows={2}
              value={review}
              onChange={e => setReview(e.target.value)}
            />

            {/* 하단 버튼 */}
            <div className="flex gap-2 pt-2">
              <button
                className="flex-1 h-12 rounded-full border bg-white font-bold text-gray-700"
                onClick={onPrev}
              >
                뒤로가기
              </button>
              <button
                className="flex-1 h-12 rounded-full bg-green-700 text-white font-bold"
                onClick={() => onNext({ name: info.name, review })}
              >
                다음
              </button>
            </div>
          </div>
        </DragModal>
      </div>
    </div>
  );
}
