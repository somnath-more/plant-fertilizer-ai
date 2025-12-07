import React from "react";

const ProfileCard = ({ name, imageUrl, onAppearanceClick,onSignOutClick }) => {
  return (
    <div className="max-h-[calc(100vh-100px)] w-full min-w-[296px] overflow-y-auto bg-overlay-3 dark:bg-dark-overlay-3 rounded-[13px] shadow-level4 p-4">
      {/* USER PROFILE HEADER */}
      <div className="flex flex-col items-center mb-3 gap-1">
        <div className="flex items-center flex-col pl-3">
          <img
            src={imageUrl}
            alt="Avatar"
            className="h-14 w-14 rounded-full object-cover"
          />

          <p className="text-xl font-semibold">{name}</p>
          <p className="text-gray-400 text-sm">Access all features with our Premium subscription!</p>
        </div>

        <button
          className="text-brand-orange text-xs underline"
          onClick={onAppearanceClick}
        >
          Update Appearance
        </button>
      </div>

      {/* MENU OPTIONS */}
      <ul className="transition-all ease-out duration-150 opacity-100 max-h-[1300px] m-0 ml-4 mt-1 p-0 outline-none">
        <li className="text-text-secondary dark:text-text-secondary !hover:text-text-secondary dark:hover:text-text-secondary hover:bg-fill[#f5f5f5] dark:hover:bg-dark-fill-4 rounded cursor-pointer flex items-center py-3 space-x-6 px-2 md:space-x-3 md:py-[10px]">
          Profile
        </li>
        <li className="text-text-secondary dark:text-text-secondary !hover:text-text-secondary dark:hover:text-text-secondary hover:bg-fill[#f5f5f5] dark:hover:bg-dark-fill-4 rounded cursor-pointer flex items-center py-3 space-x-6 px-2 md:space-x-3 md:py-[10px]">
          My Dashboard
        </li>
        <li onClick={onSignOutClick} className="text-text-secondary dark:text-text-secondary !hover:text-text-secondary dark:hover:text-text-secondary hover:bg-fill[#f5f5f5] dark:hover:bg-dark-fill-4 rounded cursor-pointer flex items-center py-3 space-x-6 px-2 md:space-x-3 md:py-[10px]">
          Sign Out
        </li>
      </ul>
    </div>
  );
};

export default ProfileCard;
