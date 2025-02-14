import React from "react";

const User = ({ userID, username, email, registrationDate, role }) => {
  return (
    <div
      id="userCard"
      className="h-[100px]  bg-[#ffffff79] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[7px]    rounded-[10px] border border-[rgba(255,255,255,0.18)]  text-black m-5 grid grid-cols-4 items-center px-5 "
    >
      <div className="flex flex-col">
        <div className="font-bold">{username}</div>
        <div>{userID}</div>
      </div>
      <div>
        <div className="font-bold">Email</div>
        <div>{email}</div>
      </div>
      <div>
        <div className="font-bold">Role</div>
        <div>{role}</div>
      </div>
      <div>
        <div className="font-bold ">Registration Date</div>
        <div>{new Date(registrationDate).toLocaleString()}</div>
      </div>
    </div>
  );
};

export default User;

// <div
//   id="userCard"
//   className="h-[100px] bg-black text-white m-5 grid grid-flow-col items-center justify-evenly"
// >
//   <div>
//     <div className="font-bold text">{username}</div>
//     <div>{userID}</div>
//   </div>
//   <div>{email}</div>
//   <div>{new Date(registrationDate).toLocaleString()}</div>
// </div>
