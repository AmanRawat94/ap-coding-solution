import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Projects from "./pages/projects/Projects";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Footer from "./components/footer/Footer";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminPrivateRoute from "./components/privateRoute/AdminPrivateRoute";
import CreatePost from "./pages/createPost/CreatePost";
import UpdatePost from "./pages/updatePost/UpdatePost";
import PostPage from "./pages/postPage/PostPage";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import Search from "./pages/search/Search";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/post/:postSlug" element={<PostPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<AdminPrivateRoute />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:postId" element={<UpdatePost />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
