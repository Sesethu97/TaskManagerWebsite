import UserProfile from "../../components/UserProfileForm/UserProfile";

function UserProfilePage() {
  return (
    <div className="w-full px-2">
      <div className="p-6 rounded-md bg-slate-300 max-h-svh">
        <UserProfile />
      </div>
    </div>
  );
}

export default UserProfilePage;
