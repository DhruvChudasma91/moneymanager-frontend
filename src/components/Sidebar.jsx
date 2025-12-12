import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { User } from "lucide-react";

const Sidebar = () => {
    const {user} = useContext(AppContext);
    return (
        <div className="w-64 h-[calc(100vh-64px)] bg-white border-gray-200 sticky top-[61px] p-5 z-20">
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
                {user?.profileImageUrl ? (
                    <img src={user?.profileImageUrl || ""} alt="profile image" className="w-20 h-20 bg-slate-400 rounded-full" />
                ) : (
                    <User className="w-20 h-20 text-xl"/>
                )}

            </div>
        </div>
    )
}

export default Sidebar;
