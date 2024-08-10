import { useState, useEffect } from "react";

// const Carousel = () => {
//   return (
//     <div className="blogs-center relative lg:h-[100vmin] w-full p-[0.5vw] px-[0.5vw] md:leading-tight ">
//       {/* <section className="relative w-full h-[68vmin] md:h-[68vmin]  bg-gray-600 sm:bg-green-600 md:bg-red-400 lg:bg-purple-600">
//         <div className="blogs-center relative w-full lg:h-[100vmin] p-[0.5vw] px-[0.5vw] "> */}
//       <img
//         className="w-full h-full rounded-[15px] object-cover object-center"
//         src="https://img.freepik.com/free-vector/gradient-abstract-blurred-grainy-background_1188-712.jpg"
//         alt=""
//       />
//       <div className="absolute left-14 text-white bottom-[6%]">
//         <div className="text-[4vw] sm:text-[5vw] md:text-[6vw] w-[70%] sm:w-[90%] mix-blend-exclusion ">
//           How to improve your Ul design skills: Quickly develop an "eye" for
//           great design
//         </div>
//         <p className="text-[1.8vw] bg-white p-2 w-[70%] my-[1vw] text-black">
//           The design industry is constantly evolving, but good design is
//           timeless. Learn how to quickly develop an eye for IJI design and
//           improve your design skills in 2023.
//         </p>
//         <div className="border lg:border-2 border-white px-1 py-1 rounded-md lg:rounded-xl text-white max-w-fit">
//           <div className="flex justify-center items-center h-full">
//             <a
//               href="#blogs"
//               className="text-[1.8vw] lg:text-2xl md:px-2 md:py-1 font-medium transition-colors duration-300 ease-in-out hover:text-gray-300"
//             >
//               Browse Blogs
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const carouselItems = [
  {
    image: "/carousel1.png",
    title:
      'How to improve your UI design skills: Quickly develop an "eye" for great design',
    description:
      "The design industry is constantly evolving, but good design is timeless. Learn how to quickly develop an eye for IJI design and improve your design skills in 2023.",
  },
  {
    image: "/carousel2.png",
    title: "Design Tips for Beginners",
    description:
      "Get started with design basics and learn key principles that will enhance your skills.",
  },
  {
    image: "/carousel3.png",
    title: "Exploring Color Theory",
    description:
      "Dive into the world of color theory and understand how to use colors effectively in your designs.",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };
  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  const { image, title, description } = carouselItems[currentIndex];

  return (
    <div id="controls-carousel" className="relative w-full">
      {/* Carousel Content */}
      <div className="blogs-center relative lg:h-[100vmin] w-full p-[0.5vw] px-[0.5vw] md:leading-tight ">
        <img
          className="w-full h-full rounded-[15px] object-cover object-center"
          src={image}
          alt={title}
        />
        <div className="absolute left-14 text-white bottom-[6%]">
          <div className="text-[4vw] sm:text-[5vw] md:text-[6vw] w-[70%] sm:w-[90%] mix-blend-exclusion ">
            {title}
          </div>
          <p className="text-[1.8vw] bg-white p-2 w-[70%] my-[1vw] text-black">
            {description}
          </p>
          <div className="border lg:border-2 border-white px-1 py-1 rounded-md lg:rounded-xl text-white max-w-fit">
            <div className="flex justify-center items-center h-full">
              <a
                href="#blogs"
                className="text-[1.8vw] lg:text-2xl md:px-2 md:py-1 font-medium transition-colors duration-300 ease-in-out hover:text-gray-300"
              >
                Browse Blogs
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-500"
            }`}
            aria-current={index === currentIndex ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </div>

      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
        onClick={handlePrev}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
          <svg
            className="w-4 h-4 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
        onClick={handleNext}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
          <svg
            className="w-4 h-4 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousel;
