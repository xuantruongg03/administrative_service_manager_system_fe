import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

function SliderImages(props: { images: string[] }) {
    return (
        <div className="slider-container w-[400px]">
            {props.images.length === 1 ? (
                <img
                    src={props.images[0]}
                    alt="Image"
                    className="rounded-lg border shadow-sm w-full h-60 object-fill"
                />
            ) : (
                <Slider {...settings}>
                    {props.images.map((image, index) => (
                        <div key={index}>
                            <img
                                src={image}
                                alt={`Image ${index}`}
                                className={`rounded-lg border shadow-sm w-full h-60 object-fill`}
                            />
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
}

export default SliderImages;
