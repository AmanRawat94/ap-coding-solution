import React, { useState } from "react";
import { Button, Checkbox, Label, Textarea, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Contact = () => {
  const navigate = useNavigate();
  const [contactData, setContactData] = useState({});
  const token = localStorage.getItem("access_token");

  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contactData.email || !contactData.content) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(contactData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        return;
      }
      if (res.ok) {
        toast.success("Request submitted successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="max-w-6xl min-h-screen mx-auto flex pt-12 justify-center px-7">
      <form
        onSubmit={handleSubmit}
        className="flex max-w-md w-full flex-col gap-4"
      >
        <div className="flex justify-center text-4xl mb-5 sm:text-5xl">
          Contact Us
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            autoComplete="off"
            onChange={handleChange}
            shadow
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="content" value="Your Query" />
          </div>
          <Textarea
            id="content"
            placeholder="Enter your query"
            onChange={handleChange}
            required
          />
        </div>

        <Button className="mt-7" gradientDuoTone="purpleToPink" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Contact;
