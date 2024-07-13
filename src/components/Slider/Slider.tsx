const Slider = () => {
    return (
        <div className="pt-3 md:flex md:flex-row flex flex-col-reverse">
       

        <div className="carousel w-full md:h-[445px] h-[280px] pb-8 md:pb-0">
            <div id="slide1" className="carousel-item relative w-full">
                <img src={'https://i.ibb.co/4Z84n6w/tree-5.jpg'} className='w-full rounded-xl' />

               
                <div className="absolute flex justify-end gap-5 transform -translate-y-1/2 left-5 right-5 bottom-0">
                    <a href="#slide4" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>

            <div id="slide2" className="carousel-item relative w-full">
                <img src={'https://i.ibb.co/xgGYdjj/tree-3.jpg'} className='w-full rounded-xl' />

               


                <div className="absolute flex justify-end gap-5 transform -translate-y-1/2 left-5 right-5 bottom-0">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <img src={'https://i.ibb.co/fdR2zvF/tree-2.jpg'} className='w-full rounded-xl' />

               


                <div className="absolute flex justify-end gap-5 transform -translate-y-1/2 left-5 right-5 bottom-0">
                    <a href="#slide2" className="btn btn-circle">❮</a>
                    <a href="#slide4" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
                <img src={'https://i.ibb.co/p6FTcKs/tree-4.jpg'} className='w-full rounded-xl' />

              


                <div className="absolute flex justify-end gap-5 transform -translate-y-1/2 left-5 right-5 bottom-0">
                    <a href="#slide3" className="btn btn-circle">❮</a>
                    <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
            </div>


        </div>
    </div>
    );
};

export default Slider;