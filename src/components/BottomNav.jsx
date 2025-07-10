// src/components/BottomNav.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import House from "../assets/icons/House.svg";
import House2 from "../assets/icons/House2.svg";
import Ticket from "../assets/icons/Ticket.svg";
import Ticket2 from "../assets/icons/Ticket2.svg";
import PlusButton from "../assets/icons/PlusButton.svg";
import Notepad from "../assets/icons/Notepad.svg";
import Notepad2 from "../assets/icons/Notepad2.svg";
import UserCircle from "../assets/icons/UserCircle.svg";

// navItems (완식 확인으로 변경)
const navItems = [
  {
    label: "홈",
    icon: House,
    activeIcon: House2,
    route: "/main",
  },
  {
    label: "리워드",
    icon: Ticket,
    activeIcon: Ticket2,
    route: "/reward",
  },
  {
    label: "완식 확인", // 여기!
    icon: PlusButton,
    activeIcon: PlusButton,
    isPlus: true,
  },
  {
    label: "기록",
    icon: Notepad,
    activeIcon: Notepad2,
    route: "/record",
  },
  {
    label: "마이페이지",
    icon: UserCircle,
    activeIcon: UserCircle,
    route: "/mypage",
  },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const [selectedIdx, setSelectedIdx] = useState(0);
  useEffect(() => {
    if (selectedIdx >= 0 && selectedIdx < navItems.length) {
      const targetRoute = navItems[selectedIdx].route;
      if (targetRoute) {
        navigate(targetRoute);
      }
    }
  }, [selectedIdx, navigate]);

  return (
    <nav
      className="fixed bottom-0 left-0 w-full h-20 bg-white flex items-end justify-between z-50 px-2"
      style={{
        borderRadius: "22px 22px 0 0",
        boxShadow: "0 0 16px 0 #0001",
        padding: 0,
        margin: 0,
      }}
    >
      {navItems.map((item, idx) => {
        const isActive = selectedIdx === idx;

        if (item.isPlus) {
          return (
            <div
              key={item.label}
              className="relative flex flex-col items-center flex-1"
              style={{ minWidth: 0, margin: 0, padding: 0 }}
            >
              <button
                className="flex flex-col items-center justify-center"
                style={{
                  position: "relative",
                  top: "-30px",
                  width: 60,
                  height: 60,
                  border: "none",
                  background: "none",
                  zIndex: 10,
                  minWidth: 0,
                  margin: 0,
                  padding: 0,
                }}
                onClick={() => setSelectedIdx(idx)}
              >
                <img
                  src={isActive ? item.activeIcon : item.icon}
                  alt={item.label}
                  className="w-14 h-14"
                  style={{
                    background: "none",
                    borderRadius: 0,
                    border: "none",
                    margin: 0,
                  }}
                />
                <span
                  className={`text-[11px] transition-colors duration-150 ${
                    isActive
                      ? "text-black font-bold"
                      : "text-gray-400 font-normal"
                  }`}
                  style={{
                    marginTop: "20px", // 플러스와 글씨 사이 간격
                    letterSpacing: "0.02em",
                    paddingBottom: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </span>
              </button>
            </div>
          );
        }

        return (
          <button
            key={item.label}
            className="flex flex-col items-center justify-center flex-1 h-full outline-none active:opacity-90"
            style={{
              minWidth: 0,
              margin: 0,
              padding: 0,
              border: "none",
              background: "none",
            }}
            onClick={() => setSelectedIdx(idx)}
          >
            <img
              src={isActive ? item.activeIcon : item.icon}
              alt={item.label}
              className="w-7 h-7"
              style={{
                marginBottom: "2px",
                objectFit: "contain",
              }}
            />
            <span
              className={`text-[11px] mt-[2px] transition-colors duration-150 ${
                isActive ? "text-black font-bold" : "text-gray-400 font-normal"
              }`}
              style={{
                letterSpacing: "-0.02em",
                paddingBottom: 0,
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
