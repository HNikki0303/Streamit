import React, { useEffect, useState } from "react";
import CommonA from "./CommonA";
import UpdateProfileForm from "./UpdateProfileForm";

const UpdateProfile = () => {
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    username: "",
    avatar: null,
    coverImage: null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/user/currentUser", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok && data?.data) {
          setUserDetails(data.data);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <CommonA userDetails={userDetails}>
      <UpdateProfileForm
        userDetails={userDetails}
        setUserDetails={setUserDetails}
      />
    </CommonA>
  );
};

export default UpdateProfile;
