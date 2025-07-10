export default function Step2_Map({ qrResult, onNext, onPrev }) {
  return (
    <div className="p-6 flex flex-col h-[630px]">
      <button className="mb-2 text-gray-500" onClick={onPrev}>&larr; 뒤로</button>
      <div className="mb-4">
        <img src="/map-demo.png" alt="지도" className="w-full h-36 object-cover rounded-md" />
      </div>
      <div className="mb-4">
        <div className="font-bold text-lg">{qrResult || "매장명"}</div>
        <div className="text-sm text-gray-500 mt-1">서울특별시 마포구 ...</div>
      </div>
      <textarea
        className="w-full border rounded p-2 mb-4 text-sm"
        placeholder="한줄 리뷰를 남겨주세요 (선택)"
        rows={2}
      />
      <button
        className="w-full h-12 rounded-lg mt-auto bg-green-700 text-white font-bold"
        onClick={() => onNext({ name: qrResult, review: "" })}
      >다음</button>
    </div>
  );
}
