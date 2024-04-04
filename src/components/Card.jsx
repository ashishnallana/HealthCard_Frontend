import React from "react";

function Card({ data }) {
  return (
    <div className="bg-white flex justify-between w-[370px] p-3 rounded-md">
      <div className="flex flex-col space-y-3">
        <img
          className="h-[80px] w-[80px] rounded-md"
          src="https://i.pinimg.com/736x/83/3f/aa/833faaae7290747ea93a4c8b3f09b52b.jpg"
          alt=""
        />
        <div>
          <h1 className="text-lg font-semibold">{data.name}</h1>
          <h2 className="text-sm">({data.gender})</h2>
          <h2 className="text-sm">Mobile No : {data.mobileno}</h2>
          <h2 className="text-sm">Aadhar No : {data.mobileno}</h2>
          <h2 className="text-sm">{data.email}</h2>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${process.env.REACT_APP_ORG_PORTAL}/patient?id=${data._id}`}
            alt=""
          />
          <p className="text-[8px] mt-2">{data._id}</p>
        </div>
        <p>HealthCard.in</p>
      </div>
    </div>
  );
}

export default Card;
