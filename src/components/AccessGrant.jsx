import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function AccessGrant({ uid }) {
  const [orgId, setOrgId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/user/give-access`,
        {
          _id: uid,
          org_id: orgId,
        }
      );
      if (res.data.success) {
        console.log(res);
        toast.success(res.data.message);
        setOrgId("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
      // if (error.response && error.response.data) {
      //   toast.error(error.response.data.message);
      // } else {
      //   toast.error("Something went wrong");
      // }
    }
  };

  return (
    <div>
      <form className="flex justify-around" onSubmit={handleSubmit}>
        <input
          value={orgId}
          onChange={(e) => setOrgId(e.target.value)}
          type="text"
          placeholder="Enter organisation ID"
          className="bg-transparent outline-none text-white placeholder:text-white text-xl py-2 border-b-2 my-2"
        />
        <button
          type="submit"
          className="bg-[#1a1635] text-white px-3 py-2 rounded-md mt-5 mb-3 hover:bg-blue-600"
        >
          Give Access
        </button>
      </form>
    </div>
  );
}

export default AccessGrant;
