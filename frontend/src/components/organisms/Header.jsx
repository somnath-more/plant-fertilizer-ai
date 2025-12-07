import { useNavigate } from 'react-router-dom';
import { Leaf, LogIn, LogOut, ShoppingCart } from "lucide-react";
import { ORGANICFERT, PAGES } from "../../utils";
import { Button } from "../atoms/Button";
import FertilizerLogo from "../../assets/images/PlantFertilizerAI.svg";
import Icon from "../atoms/Icon";
import { fontFamily } from "../../theme/customStyles";
import { baseStyles, sizes, variants } from "../../theme/themeStyles";
import { useState } from "react";
import ProfileCard from "../molecules/ProfileCard/ProfileCard";
import { Popover } from "@mui/material";
import { useUserStore } from '../../store/useUserStore';
// import { Popover } from "@mui/material";

const Header = ({  onNavigate, cartCount, currentPage }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useUserStore((state) => state);
  const { user } = useUserStore((state) => state);

  const handleOpenUserProfileCard = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
const handleSignOut = () => {
  // remove storage user and token
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  logout();
  navigate("/login");

};

  // console.log("user",user);
  
  return (
    <header className="bg-white/80 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate("home")}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              {/* <Leaf size={28} className="text-white" /> */}
              <Icon src={FertilizerLogo} alt="Logo" className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-poppins">
                {ORGANICFERT}
              </h1>
              <p className="text-xs text-gray-500 font-inter">Grow Naturally</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {PAGES.map((page) => (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                className={`font-inter font-semibold transition-all duration-300 relative ${
                  currentPage === page
                    ? "text-green-600"
                    : "text-gray-600 hover:text-green-600"
                }`}
              >
                {page === "home"
                  ? "Products"
                  : page
                      .split("-")
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ")}
                {currentPage === page && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></span>
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate("cart")}
              className="relative p-3 hover:bg-gray-100 rounded-xl transition-all duration-300 group"
            >
              <ShoppingCart
                size={24}
                className="text-gray-700 group-hover:text-green-600 transition-colors"
              />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
            {/* simple */}
            <Button variant="secondary" onClick={handleOpenUserProfileCard}>
              <div title={user?.name} className="flex items-center gap-2">
                <img
                  src={
                    user?.imageUrl ||
                    "https://randomuser.me/api/portraits/lego/2.jpg"
                  }
                  alt="Avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
              </div>
            </Button>

            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              PaperProps={{
                style: {
                  borderRadius: "13px",
                  overflow: "visible",
                },
              }}
            >
              <ProfileCard
                name={user?.name || "John Doe"}
                imageUrl={user?.imageUrl || "https://randomuser.me/api/portraits/lego/2.jpg"}
                onAppearanceClick={() => console.log("update appearance")}
                onSignOutClick={handleSignOut}
              />
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
