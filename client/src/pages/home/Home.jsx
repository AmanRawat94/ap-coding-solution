import React, { useEffect, useState } from "react";
import PostCard from "../../components/postCard/PostCard";
import CallToAction from "../../components/callToAction/CallToAction";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    toast(
      "Welcome to AP Coding Solution! If you encounter any issues, please try logging in again."
    );
    const fetchPosts = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/post/getPosts`
      );
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
        <h1 className="text-3xl font-bold lg:text-6xl">
          Welcome to AP Coding Solution
        </h1>
        <p className="text-gray-500 dark:text-white text-xs sm:text-sm">
          Welcome to AP Coding Solution, your ultimate destination for mastering
          the art of programming and development! Whether you're a beginner
          starting with HTML and CSS or an advanced coder diving into the depths
          of JavaScript, React.js, Node.js, Next.js, etc, we've got you covered.
          Explore our comprehensive notes, tutorials, and hands-on projects
          designed to empower you with the skills and knowledge to create
          amazing applications. Join our community of passionate developers and
          start your journey towards becoming a coding expert today!
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>
      <div className="p-3 bg-amber-100 max-w-6xl mx-auto dark:bg-slate-700">
        <CallToAction />
      </div>

      <div className="max-w-7xl justify-self-center mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col mx-auto justify-self-center gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {posts.map((post) => (
                <PostCard wid={"sm:w-[380px]"} key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
