import React from "react";
import ProfileForm from "../../components/ProfileFom/UserProfileform.js";

function Profile() {
  return (
    <div className="w-full px-2">
      <div className="p-6 rounded-md bg-slate-300 max-h-svh">
        <ProfileForm />
      </div>
    </div>
  );
}

export default Profile;
