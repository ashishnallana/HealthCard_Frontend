import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Card from "./Card";
import AccessGrant from "./AccessGrant";
import ReportsList from "./ReportsList";

function Dashboard() {
  const [auth, setAuth] = useAuth();
  const [userData, setUserData] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/user/get-user`,
        {
          _id: auth.user._id,
        }
      );
      console.log(res);
      if (res.data.success) {
        // toast.success(res.data.message);
        setUserData(res.data.user);
      }
      //  else {
      //   toast.error(res.data.message);
      // }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (auth.user) {
      fetchUser();
    }
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center">
      {userData && (
        <div className="flex flex-col space-y-5">
          <Card data={userData} />
          <AccessGrant uid={userData._id} />
          <ReportsList id={userData._id} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
