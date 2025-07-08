import React from "react";
import KakaoIcon from "../assets/kakaoIcon.svg";
import { useNavigate } from "react-router-dom";
import bgVideo from "../assets/bg-video.mp4";

const Login = () => {
  const navigate = useNavigate();
  const loginBtnClicked = () => {
    // 추후 로그인 기능 추가
    navigate("/main");
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={bgVideo}
        autoPlay
        muted
        loop
      />{" "}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
      <div className="relative z-10 h-full w-full flex flex-col p-5 justify-between items-center text-white">
        <div className="w-auto flex flex-col justify-center mt-20">
          <span className="text-sm font-semibold mb-2">
            환경을 위한 작은 실천 시작하기
          </span>
          <div className="w-full h-auto flex flex-row justify-start items-center">
            <div
              className="text-5xl font-bold"
              style={{ fontFamily: "'Roboto Mono" }}
            >
              CLEAR PLATE
            </div>
          </div>
        </div>
        <div
          className="w-full left-0 h-10 mb-4 rounded-3xl flex flex-row justify-center items-center cursor-pointer"
          style={{ backgroundColor: "#F8DF02" }}
          onClick={loginBtnClicked}
        >
          <img src={KakaoIcon} alt="Kakao" className="absolute left-12" />
          <div className="font-bold text-sm text-black">카카오 로그인</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
