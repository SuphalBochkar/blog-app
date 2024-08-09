import Quote from "../components/Sign/Quote";
import LeftSignin from "../components/Sign/LeftSignin";

const Signin = () => {
  return (
    <>
      <div className="lg:grid lg:grid-cols-2">
        <LeftSignin />
        <div className="invisible lg:visible">
          <Quote />
        </div>
      </div>
    </>
  );
};

export default Signin;
