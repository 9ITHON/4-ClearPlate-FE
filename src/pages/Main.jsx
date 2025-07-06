import React from "react";
import DragModal from "../components/DragModal";
import KakaoMap from "../components/KakaoMap";
import Search from "../assets/icons/Search.svg";
import Notification from "../assets/icons/Notification.svg";
import Coupon from "../assets/icons/Coupon.svg";
import { useUserStore } from "../stores/userStore";

//맛집리스트 오브젝트를 받기 위한 콘솔로그용
//import Test from "../components/test";

const Main = () => {
  const name = useUserStore((state) => state.name);
  const point = useUserStore((state) => state.point);
  return (
    <div className="  h-screen w-full flex flex-col">
      <button className="absolute w-26 top-15 left-4 z-2 bg-white rounded-2xl h-9 px-4 flex flex-row justify-between items-center shadow-md">
        <div className=" relative -left-2 bg-black rounded-4xl w-6 h-6 text-white flex justify-center items-center font-bold">
          P
        </div>
        <span className="text-xs font-bold">{point} p</span>
      </button>
      <button className="absolute w-10 top-15 right-18 z-2 bg-white rounded-4xl h-9 flex flex-row justify-center items-center shadow-md">
        <img src={Coupon} alt="Search" className="w-5 h-5" />
      </button>
      <button className="absolute w-10 top-15 right-4 z-2 bg-white rounded-4xl h-9 flex flex-row justify-center items-center shadow-md">
        <img src={Notification} alt="Search" className="w-5 h-5" />
      </button>

      <div id="map" className="flex-1">
        <KakaoMap />
      </div>
      <div className="absolute bottom-0 w-full z-10 flex flex-col justify-center items-center gap-3">
        <div className="w-80 flex flex-col gap-2">
          <div className="text-lg text-black font-extrabold">
            {name}님, 반가워요!
          </div>
          <div className="w-full bg-white rounded-2xl h-9 px-4 flex flex-row justify-between items-center shadow-md">
            <input
              className="w-63 h-[70%]
               text-sm
               focus:outline-none 
               focus:placeholder-transparent
          
               "
              placeholder="식당을 검색해주세요"
            />

            <img src={Search} alt="Search" className="w-5 h-auto" />
          </div>
        </div>
        <DragModal minHeight={130} maxHeight={350} initialHeight={130}>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatum, libero? Dolore nostrum, voluptatum obcaecati ad dolor
            tempora ducimus impedit quibusdam quisquam, eveniet neque est cum
            beatae magni mollitia ea harum. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Recusandae quam accusamus impedit
            eaque ut saepe! Voluptate autem magnam iusto quam doloremque
            repellat illo totam incidunt quis aspernatur. Consequuntur, eos
            ipsam.
          </span>
        </DragModal>
      </div>
    </div>
  );
};

export default Main;
