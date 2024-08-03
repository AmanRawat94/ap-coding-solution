import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../../components/dash/DashSidebar";
import DashProfile from "../../components/dash/DashProfile";
import DashPosts from "../../components/dash/DashPosts";
import DashUsers from "../../components/dash/DashUsers";
import DashComments from "../../components/dash/DashComments";
import DashboardComp from "../../components/dash/DashboardComp";
import DashContacts from "../../components/dash/DashContacts";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* sidebar */}
        <DashSidebar />
      </div>
      {/* profile */}
      {tab === "profile" && <DashProfile />}
      {/* posts */}
      {tab === "posts" && <DashPosts />}
      {/* users */}
      {tab === "users" && <DashUsers />}
      {/* comments */}
      {tab === "comments" && <DashComments />}
      {/* dashboard */}
      {tab === "dashboard" && <DashboardComp />}
      {/* contacts */}
      {tab === "contacts" && <DashContacts />}
    </div>
  );
};

export default Dashboard;
