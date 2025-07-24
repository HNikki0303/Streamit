import React, { useState } from "react";

const UpdateProfileForm = ({ userDetails, setUserDetails }) => {
  const [fullName, setFullName] = useState(userDetails?.fullName || "");
  const [avatar, setavatar] = useState(null);
  const [coverImage, setcoverImage] = useState(null);

  // Update UI immediately and send to DB
  const handleFullNameSubmit = async () => {
    setUserDetails((prev) => ({ ...prev, fullName })); // Show instantly
    try {
      const res = await fetch("VITE_BACKEND/api/v1/user/updateAccountDetails", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ fullName }),
      });
      const data = await res.json();
      if (!data?.data?.fullName) {
        throw new Error("Failed to update full name");
      }
    } catch (err) {
      console.error("Full name update failed", err);
    }
  };

  const handleAvatarSubmit = async () => {
    if (!avatar) return;
    const formData = new FormData();
    formData.append("avatar",avatar);
    try {
      const res = await fetch("VITE_BACKEND/api/v1/user/updateAvatar", {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (data?.data?.avatar) {
        setUserDetails((prev) => ({ ...prev, avatar: data.data.avatar }));
      }
    } catch (err) {
      console.error("Avatar upload failed", err);
    }
  };

  const handleCoverSubmit = async () => {
    if (!coverImage) return;
    const formData = new FormData();
    formData.append("coverImage",coverImage);
    try {
      const res = await fetch("VITE_BACKEND/api/v1/user/updateCoverImage", {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (data?.data?.coverImage) {
        setUserDetails((prev) => ({ ...prev, coverImage: data.data.coverImage }));
      }
    } catch (err) {
      console.error("Cover image upload failed", err);
    }
  };

  const handleCancel = () => {
    setFullName(userDetails?.fullName || "");
    setavatar(null);
    setcoverImage(null);
  };

  return (
    <div className="space-y-6 text-white w-full overflow-auto max-h-[70vh]">
      {/* Full Name */}
      <div>
        <label className="block mb-1">Full Name</label>
        <div className="flex gap-2">
          <input
            type="text"
            className="px-4 py-2 rounded bg-white/10 border border-white/20 text-white w-full"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <button
            onClick={handleFullNameSubmit}
            className="px-4 py-2 bg-pink-600 rounded hover:bg-pink-700 transition"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Avatar Upload */}
      <div>
        <label className="block mb-1">Avatar Image</label>
        <div className="flex gap-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setavatar(e.target.files[0])}
          />
          <button
            onClick={handleAvatarSubmit}
            className="px-4 py-2 bg-pink-600 rounded hover:bg-pink-700 transition"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Cover Upload */}
      <div>
        <label className="block mb-1">Cover Image</label>
        <div className="flex gap-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setcoverImage(e.target.files[0])}
          />
          <button
            onClick={handleCoverSubmit}
            className="px-4 py-2 bg-pink-600 rounded hover:bg-pink-700 transition"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-between pt-4">
        <button
          onClick={handleCancel}
          className="px-4 py-2 border border-white rounded hover:bg-white/10 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
