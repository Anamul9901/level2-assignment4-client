/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const images = [
  "https://picsum.photos/2000/3000",
  "https://picsum.photos/3000/3000",
  "https://picsum.photos/2000/1500",
  "https://picsum.photos/3000/1500",
  "https://picsum.photos/2000/2000",
  "https://picsum.photos/1500/1880",
];

const ImageGallery = () => {
  const [data, setData] = useState({ img: "", i: 0 });
  const viewPage = (img: string, i: number) => {
    console.log(img, i);
    console.log(data);
    setData({ img, i });
    (document as any).getElementById("my_modal_4").showModal()
  };
  return (
    <>
      {data.img && (
        //className="w-[100%] h-[100%] bg-black flex  justify-center items-center overflow-hidden"
        <div >
          {/* You can open the modal using document.getElementById('ID').showModal() method */}
          <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-[100%] h-[100%] bg-black flex  justify-center items-center overflow-hidden">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute text-white right-2 top-2">
                  ✕
                </button>
              </form>
          <img
            src={data.img}
            className="w-[200%] "
            alt=""
          />
            </div>
          </dialog>
        </div>
      )}
      <div className="p-1 pb-20">
        <h1 className="text-4xl font-bold text-center pb-10">Image Gallery</h1>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="10px">
            {images.map((image, i) => (
              <img
                className="rounded-md"
                key={i}
                src={image}
                style={{ width: "100%", display: "block" }}
                alt=""
                onClick={() => viewPage(image, i)}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
};

export default ImageGallery;
