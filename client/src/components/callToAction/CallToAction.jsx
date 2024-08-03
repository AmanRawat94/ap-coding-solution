import { Button } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../../assets/coding-banner.jpg";

const CallToAction = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn programming!</h2>
        <p className="text-gray-500 dark:text-white my-2">
          Check out these fantastic free resources that let you work on
          unlimited projects!
        </p>
        <Button
          onClick={() => navigate("/search?searchTerm=&sort=desc&category=")}
          gradientDuoTone="tealToLime"
        >
          Learn more
        </Button>
      </div>

      <div className="p-7 flex-1">
        <img src={img} />
      </div>
    </div>
  );
};

export default CallToAction;
