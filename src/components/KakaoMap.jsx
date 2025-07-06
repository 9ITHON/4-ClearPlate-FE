import React from "react";
import { Map } from "react-kakao-maps-sdk";

const KakaoMap = () => {
  return <Map center={{ lat: 33.450701, lng: 126.570667 }} level={3} />;
};

export default KakaoMap;
