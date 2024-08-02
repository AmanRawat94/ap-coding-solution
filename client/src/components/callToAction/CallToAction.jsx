import { Button } from "flowbite-react";
import React from "react";

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn programming!</h2>
        <p className="text-gray-500 dark:text-white my-2">
          Check out these fantastic free resources that let you work on
          unlimited projects!
        </p>
        <Button gradientDuoTone="tealToLime">Learn more</Button>
      </div>

      <div className="p-7 flex-1">
        <img src="https://cyberhoot.com/wp-content/uploads/2020/07/Free-Courses-to-learn-JavaScript.jpg" />
      </div>
    </div>
  );
};

export default CallToAction;
