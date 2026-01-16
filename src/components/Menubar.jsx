import { use, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, User, X } from "lucide-react";
import { Menu } from 'lucide-react';
import { assets } from "../assets/assets";
import Sidebar from "./Sidebar";


const Menubar = ({activeMenu}) => {

    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const {user, clearUser} = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        clearUser();
        setShowDropdown(false);
        navigate("/login");
    };

    const closeMobileMenu = () => {
        setOpenSideMenu(false);
    };

    useEffect( () => {
        const handleClickOutside = (event) => {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        if(showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [showDropdown]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setOpenSideMenu(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setShowDropdown(false);
                setOpenSideMenu(false);
            }
        };

        if (showDropdown || openSideMenu) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [showDropdown, openSideMenu]);


    if (!user) return null;

    return (
        <>
            <header className="flex items-center justify-between gap-4 bg-white border-b border-gray-200 px-4 py-4 sm:px-7 sticky top-0 z-30 shadow-sm">
                {/* Left Side - Menu button and title */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setOpenSideMenu(!openSideMenu)}
                        className="lg:hidden flex items-center justify-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label={openSideMenu ? "Close menu" : "Open menu"}
                        aria-expanded={openSideMenu}
                    >
                        {openSideMenu ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>

                    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <img src={assets.logo} alt="Money Manager logo" className="h-10 w-10 object-contain" />
                        <span className="text-lg font-semibold text-gray-900 hidden sm:block">Money Manager</span>
                    </Link>
                </div>

                {/* Right Side - User profile */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center justify-center w-10 h-10 bg-purple-50 hover:bg-purple-100 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        aria-label="User menu"
                        aria-expanded={showDropdown}
                        aria-haspopup="true"
                    >
                        <User className="w-5 h-5 text-purple-600" />
                    </button>

                    {/* Dropdown Menu */}
                    {showDropdown && (
                        <div
                            role="menu"
                            className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                        >
                            {/* User Info */}
                            <div className="px-4 py-3 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full shrink-0">
                                        <User className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 truncate">
                                            {user?.fullName || "User"}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Dropdown Options */}
                            <div className="py-2">
                                <button
                                    onClick={handleLogout}
                                    role="menuitem"
                                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <LogOut className="w-4 h-4 text-gray-500" />
                                    <span>Log Out</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Mobile Overlay */}
            {openSideMenu && (
                <div
                    className="fixed inset-0 bg-black/50 lg:hidden z-20 backdrop-blur-sm"
                    style={{ top: "73px" }}
                    onClick={closeMobileMenu}
                    aria-hidden="true"
                />
            )}

            {/* Mobile Side Menu */}
            {openSideMenu && (
                <div
                    className="fixed left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-30 shadow-lg animate-in slide-in-from-top duration-300"
                    style={{ top: "73px" }}
                >
                    <Sidebar activeMenu={activeMenu} onNavigate={closeMobileMenu} />
                </div>
            )}
        </>
    );
}

export default Menubar;
