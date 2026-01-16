import { useContext } from "react";
import Menubar from "./Menubar";
import { AppContext } from "../context/AppContext";
import Sidebar from "./Sidebar";


const Dashboard = ({children, activeMenu}) => {

    const {user, loading} = useContext(AppContext);

    if(loading) return null;
    

    return (
        <div className="min-h-screen bg-gray-50">
            <Menubar activeMenu={activeMenu}/>
            
            {user && (
                <div className="flex">
                    <div className="hidden lg:block">
                        <Sidebar activeMenu={activeMenu}/>
                    </div>
                
                    <div className="flex-1 p-5 lg:p-6 overflow-x-hidden">
                        {children}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard;