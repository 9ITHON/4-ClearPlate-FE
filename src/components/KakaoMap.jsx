import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = () => {
  return (
    //판교 구름 스퀘어
    <Map
      center={{ lat: 37.4024068885376, lng: 127.101100614 }}
      style={{ width: "100%", height: "100%", zIndex: 0 }}
      level={5}
    ></Map>
  );
};

export default React.memo(KakaoMap);
