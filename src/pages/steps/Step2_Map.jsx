import React, { useEffect, useState } from "react";
import KakaoMap from "../../components/KakaoMap";
import SelectedLocationCard from "../../components/SelectedLocationCard";
import StampProgressBar from "../../components/StampProgressBar";
import dummyPlaces from "../../data/dummyPlaces";

export default function Step2_Map({ qrResult, onNext, onPrev }) {
  const [currentLocation, setCurrentLocation] = useState(location);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedSearchStoreIdx, setSelectedSearchStoreIdx] = useState(null);

  // QR로 받은 id(qrResult)로 매장 찾기
  useEffect(() => {
    if (qrResult) {
      const found = dummyPlaces.find((place) => place.id === qrResult);
      setSelectedLocation(found || null);
    }
  }, [qrResult]);

  return (
    <div className="h-screen w-full flex flex-col">
      <button className="mb-2 text-gray-500" onClick={onPrev}>
        &larr; 뒤로
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
          </div>
        )}
      </div>

      <div className="absolute bottom-0 w-full z-10 flex flex-col justify-center items-center gap-3">
        <div
          className="w-full rounded-t-2xl shadow-lg flex flex-col"
          style={{ height: `600px`, backgroundColor: "#f7f7f7" }}
        >
          <div className="overflow-auto flex-1 px-4">
            {selectedLocation ? (
              <>
                <div className="mt-6" />
                <SelectedLocationCard selectedLocation={selectedLocation} />
                <div className="mt-3 w-full textGrayColor text-sm">도장</div>
                {selectedSearchStoreIdx !== null ? (
                  <StampProgressBar selectedStoreIdx={selectedSearchStoreIdx} />
                ) : (
                  <div className="mt-3 w-full bg-white rounded-2xl shadow-md p-4 flex flex-col gap-1 h-30 justify-center">
                    <div className="w-full textGrayColor text-center text-sm">
                      매장을 방문한 적이 없어요!
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-10 text-center text-gray-400">
                매장 정보를 찾을 수 없습니다.
              </div>
            )}

            <button
              className="w-full h-12 rounded-lg mt-auto bg-green-700 text-white font-bold"
              onClick={() => onNext({ name: qrResult, review: "" })}
              disabled={!selectedLocation}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
