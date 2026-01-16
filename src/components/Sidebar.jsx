import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { User } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assets";
import { useLocation, Link } from "react-router-dom";

const Sidebar = ({activeMenu}) => {
    const {user} = useContext(AppContext);
    const location = useLocation();

    const handleImageError = (e) => {
        e.target.style.display = 'none';
    };

    const handleNavClick = () => {
        if (onNavigate) {
            onNavigate();
        }
    };

    return (
        <nav
            className="w-60 min-h-screen bg-white border-r border-gray-200 sticky top-[73px] p-5 overflow-y-auto"
            aria-label="Main navigation"
        >
            {/* User Profile Section */}
            <div className="flex flex-col items-center gap-3 pt-4 pb-6 border-b border-gray-100">
                {user?.profileImageUrl ? (
                    <img
                        src={user.profileImageUrl}
                        alt={`${user.fullName}'s profile`}
                        className="w-20 h-20 rounded-full object-cover border-2 border-purple-200 shadow-md"
                        onError={handleImageError}
                    />
                ) : (
                    <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full border-2 border-purple-200">
                        <User className="w-10 h-10 text-purple-600" />
                    </div>
                )}

                <h2 className="text-gray-900 font-semibold text-base text-center leading-tight">
                    {user?.fullName || "User"}
                </h2>
            </div>

            {/* Navigation Menu */}
            <ul className="mt-6 space-y-2" role="list">
                {SIDE_BAR_DATA.map((item, index) => {
                    const isActive = activeMenu === item.label || location.pathname === item.path;
                    const IconComponent = item.icon;

                    return (
                        <li key={`menu_${index}`}>
                            <Link
                                to={item.path}
                                onClick={handleNavClick}
                                className={`
                                    group flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm
                                    transition-all duration-200
                                    ${isActive 
                                        ? 'bg-purple-600 text-white shadow-md shadow-purple-200' 
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }
                                `}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                <IconComponent 
                                    className={`w-5 h-5 shrink-0 transition-transform duration-200 ${!isActive && 'group-hover:scale-110'}`}
                                />
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default Sidebar;
