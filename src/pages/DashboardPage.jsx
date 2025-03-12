import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser.isAdmin) {
      navigate("/");
      return;
    }
  }, [navigate]);

  return (
    <div className="container mt-5">
      <>
        <h2 className="mb-4">Dashboard</h2>
       
      </>
    </div>
  );
};

export default DashboardPage;