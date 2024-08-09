import LeftSignup from "../components/Sign/LeftSignup";
import Quote from "../components/Sign/Quote";

const Signup = () => {
  return (
    <>
      <div className="lg:grid lg:grid-cols-2">
        <LeftSignup />
        <div className="invisible lg:visible">
          <Quote />
        </div>
      </div>
    </>
  );
};

export default Signup;
