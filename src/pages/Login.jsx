import React from "react";
import KakaoIcon from "../assets/kakaoIcon.svg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const loginBtnClicked = () => {
    //추후 로그인 기능 추가
    navigate("/main");
  };
  return (
    <div className="h-screen w-full flex flex-col p-8 justify-between">
      <div className="w-full flex flex-col justify-center mt-20">
        <span className=" text-sm font-semibold">
          환경을 위한 작은 실천 시작하기
        </span>
        <div className="w-full h-auto flex flex-row justify-center items-center">
          <div className=" text-5xl">CLEAR PLATE</div>
        </div>
      </div>
      <div
        className=" w-full left-0 h-10 mb-4 rounded-3xl flex flex-row justify-center items-center cursor-pointer"
        style={{ backgroundColor: "#F8DF02" }}
        onClick={loginBtnClicked}
      >
        <img src={KakaoIcon} alt="Kakao" className=" absolute left-12" />
        <div className="font-bold text-sm">카카오 로그인</div>
      </div>
    </div>
  );
};
export default Login;
