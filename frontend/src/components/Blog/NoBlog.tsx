import Image from "../../assets/images/carousel1.png";

const NoBlog = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <img src={Image} alt="404 Not Found" className="w-32 h-32 mb-4" />
      <h1 className="text-3xl font-semibold mb-2 text-gray-800">
        No Blog Found
      </h1>
      <p className="text-lg text-gray-600">
        Oops! It looks like the blog you're looking for doesn't exist.
      </p>
    </div>
  );
};

export default NoBlog;
