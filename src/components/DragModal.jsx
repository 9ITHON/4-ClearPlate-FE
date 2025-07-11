import React, { useState, useRef } from "react";

const DragModal = ({
  children,
  minHeight = 350,
  maxHeight = 600,
  height,
  setHeight,
  backgroundColor,
}) => {
  //초기 높이를 동적으로 변화시키기위해 부모의 status를 사용합니다!!
  //const [height, setHeight] = useState(initialHeight); // 초기 높이 (px)
  const [isDragging, setIsDragging] = useState(false);

  const startY = useRef(null);
  const startHeight = useRef(null);
  const startTime = useRef(null);

  // 마우스 부분 (가속도 구현 x)
  const onMouseDown = (e) => {
    startY.current = e.clientY;
    startHeight.current = height;
    setIsDragging(true);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    const diff = startY.current - e.clientY;
    const newHeight = Math.min(
      Math.max(startHeight.current + diff, minHeight),
      maxHeight
    );
    setHeight(newHeight);
  };
  const onMouseUp = () => {
    setIsDragging(false);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  // 터치 부분(가속도 구현)
  const onTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    startHeight.current = height;
    startTime.current = Date.now();
    setIsDragging(true);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
  };

  const onTouchMove = (e) => {
    const diff = startY.current - e.touches[0].clientY;
    const newHeight = Math.min(
      Math.max(startHeight.current + diff, minHeight),
      maxHeight
    );
    setHeight(newHeight);
  };

  const onTouchEnd = (e) => {
    const endY = e.changedTouches[0].clientY;
    const diffY = startY.current - endY;
    const timeElapsed = Date.now() - startTime.current;
    //가속도
    const velocity = diffY / timeElapsed; // px/ms

    if (velocity > 0.3) {
      setHeight(maxHeight);
    } else if (velocity < -0.3) {
      setHeight(minHeight);
    }
    setIsDragging(false);

    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", onTouchEnd);
  };

  return (
    <div
      className={`w-full rounded-t-2xl shadow-lg flex flex-col ${
        !isDragging ? "transition-[height] duration-500 ease-in-out" : ""
      }`}
      style={{ height: `${height}px`, backgroundColor: backgroundColor }}
    >
      {/* 드래그 핸들 */}
      <div onMouseDown={onMouseDown} onTouchStart={onTouchStart}>
        <div className="w-12 h-1.5 mainGrayColor rounded-full mx-auto my-2 cursor-ns-resize"></div>
      </div>

      {/* 콘텐츠 */}
      <div className="overflow-auto flex-1 px-4">{children}</div>
    </div>
  );
};

export default DragModal;
