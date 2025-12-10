import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import Input from "../components/Input.jsx";



const Singup = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    return(
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            <img src={assets.login_bg} alt="Background" className="absolute inset-0 w-full h-full object-cover filter blur-none"/>

            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                <h3 className="text-2xl font-semibold text-black text-center mb-2">
                    Create An Account
                </h3>
                <p className="text-sm text-slate-700 text-center mb-8">
                    Start tracking your spendings by joining with us. 
                </p>

                <form className="space-y-6">

                    <div className="flex justify-center mb-6">
                        {/* Profile Image */}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-2 gap-5">
                        <Input 
                            label="Full Name" 
                            type="text" 
                            placeholder="John Doe"
                            value={fullName} 
                            onChange={(e) => setFullName(e.target.value)}
                            required={true}
                        />
                        <Input 
                            label="Email" 
                            type="email" 
                            placeholder="name@example.com"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            required={true}
                        />
                        
                        <div className="col-span-2">
                            <Input 
                                label="Password" 
                                type="password" 
                                placeholder="*******"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                required={true}
                            />
                        </div>

                        {error && (
                            <div className="col-span-2">
                                <p className="text-red-800 text-center text-sm bg-red-50 p-2 rounded">
                                    {error}
                                </p>
                            </div>
                        )}

                        <button className="col-span-2 w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg transform hover:scale-103" type="submit">
                            Sign Up
                        </button>

                        <p className="text-sm text-slate-800 text-center mt-6 col-span-2">
                            Already have an account? 
                            <Link to="/login" className="text-blue-600 text-primary underline hover:text-primary-dark transition-colors">
                                Log In
                            </Link>
                        </p>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default Singup;