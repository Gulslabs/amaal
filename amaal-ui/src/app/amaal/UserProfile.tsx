import { FC, useEffect, useState } from "react";
import { UserProfile, UserProfileProps } from "../utils/types";

const UserProfile: FC<UserProfileProps> = ({ token }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>();
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/auth/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(`Token in User: ${token}`);
      const data: UserProfile = await response.json();
      console.log(`Fetched UserProfile: ${JSON.stringify(data)}`); // Debugging line
      setUserProfile(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
    }
  };

  return (
    <div className="absolute top-0 right-0 p-4">
      <div className="text-black flex items-center">
        <div className="mb-2 ml-2">{userProfile?.firstName}, {userProfile?.lastNAme}</div>
        <img
          src={userProfile?.picture} // Replace with the actual profile picture URL
          alt="Profile"
          className="w-8 h-8 rounded-full mr-2"
        />
      </div>
    </div>
    // {/* <div className="absolute top-0 right-0 p-4">
    //   {userData && (
    //     <div className="text-white flex items-center">
    //       <img
    //         src={"userData.profilePictureUrl"} // Replace with the actual profile picture URL
    //         alt="Profile"
    //         className="w-8 h-8 rounded-full mr-2"
    //       />
    //       Welcome, Gulam, Ahsan.
    //     </div>
    //   )}
    // </div> */}
  );
};

export default UserProfile;
