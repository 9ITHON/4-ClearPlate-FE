import React, { useEffect, useState } from "react";
import KakaoMap from "../../components/KakaoMap";
import SelectedLocationCard from "../../components/SelectedLocationCard";
import StampProgressBar from "../../components/StampProgressBar";
import dummyPlaces from "../../data/dummyPlaces";
import dummyStores from "../../data/dummyStores";

export default function Step2_Map({ qrResult, onNext, onPrev, onExit }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedSearchStoreIdx, setSelectedSearchStoreIdx] = useState(null);

  // qrResult로 매장/도장 데이터 찾기
  useEffect(() => {
    if (qrResult) {
      // 디버깅용 콘솔 로그
      console.log("=== Step2_Map 디버깅 ===");
      console.log("qrResult:", qrResult);
      console.log("dummyPlaces:", dummyPlaces);
      console.log("dummyStores:", dummyStores);

      // 1. 매장 정보
      const found = dummyPlaces.find((place) => place.id === qrResult);
      console.log("found place:", found);
      setSelectedLocation(found || null);

      // 2. 내가 방문한 매장(도장) 인덱스
      const idx = dummyStores.findIndex((s) => s.id === qrResult);
      console.log("store index:", idx);
      console.log("matching store:", idx !== -1 ? dummyStores[idx] : null);
      setSelectedSearchStoreIdx(idx !== -1 ? idx : null);
    }
  }, [qrResult]);

  const handleExit = () => {
    if (onExit) {
      onExit();
    }
  };

  return (
    <div className="h-screen w-full flex flex-col relative">
      {/* 디버깅 정보 표시 */}
      {/* <div className="absolute top-16 left-4 z-30 bg-black/70 text-white p-2 rounded text-xs">
        <div>QR: {qrResult}</div>
        <div>Store Index: {selectedSearchStoreIdx}</div>
        <div>Location: {selectedLocation?.place_name || "없음"}</div>
      </div> */}

      {/* 상단 뒤로가기 버튼 */}
      <button
        className="absolute top-4 left-4 z-20 flex items-center justify-center w-12 h-12 transition-transform hover:scale-110"
        onClick={onPrev}
      >
        <img src="src/assets/icons/BackBtn.svg" alt="뒤로가기" width="32" height="32" />
      </button>

      <div id="map" className="flex-1">
        {selectedLocation ? (
          <KakaoMap
            lat={Number(selectedLocation.y)}
            lng={Number(selectedLocation.x)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            매장 정보를 찾을 수 없습니다.
            <br />
            QR 결과: {qrResult}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 w-full z-10 flex flex-col justify-center items-center gap-3">
        <div
          className="w-full rounded-t-3xl shadow-lg flex flex-col"
          style={{ height: `520px`, backgroundColor: "#f7f7f7" }}
        >
          <div className="overflow-auto flex-1 px-4">
            {selectedLocation ? (
              <>
                <div className="mt-6" />
                <SelectedLocationCard selectedLocation={selectedLocation} />
                <div className="mt-3 w-full textGrayColor text-sm">도장</div>
                {selectedSearchStoreIdx !== null ? (
                  <>
                    <StampProgressBar selectedStoreIdx={selectedSearchStoreIdx} />
                  </>
                ) : (
                  <div className="mt-3 w-full bg-white rounded-3xl shadow-md p-4 flex flex-col gap-1 h-30 justify-center">
                    <div className="w-full textGrayColor text-center text-sm">
                      매장을 방문한 적이 없어요!
                      <br />
                      <span className="text-xs">QR: {qrResult}</span>
                      <br />
                      <span className="text-xs">Store 개수: {dummyStores.length}</span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-10 text-center text-gray-400">
                매장 정보를 찾을 수 없습니다.
                <br />
                QR 결과: {qrResult}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 하단 버튼 영역 - 화면 최하단에 고정 */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 flex gap-3 ">
        <button
          onClick={onPrev}
          className="flex-1 h-12 rounded-full bg-white font-bold"
          type="button"
        >
          뒤로가기
        </button>
        <button
          className={
            selectedLocation
              ? "flex-1 h-12 rounded-full text-white font-bold shadow"
              : "flex-1 h-12 rounded-full bg-gray-300 text-gray-500 font-bold"
          }
          style={selectedLocation ? { backgroundColor: '#003D28' } : undefined}
          onClick={() => onNext({ name: qrResult, review: "" })}
          disabled={!selectedLocation}
          type="button"
        >
          다음
        </button>
      </div>
    </div>
  );
}