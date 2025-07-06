import DragModal from "../components/DragModal";
import KakaoMap from "../components/KakaoMap";
const Main = () => {
  return (
    <div className=" bg-red-300 h-screen w-full flex flex-col">
      <div className="button" style={{ width: "100%" }}>
        <h1 className="text-red-500 text-3xl font-bold underline">Main</h1>
      </div>
      <div id="map" className="flex-1  bg-amber-100">
        <KakaoMap />
      </div>
      <div className="absolute bottom-0 w-full">
        <DragModal>
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
