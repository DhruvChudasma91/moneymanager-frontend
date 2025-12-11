import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import Input from "../components/Input.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import { AppContext } from "../context/AppContext.jsx";
import { validateEmail } from "../util/validation.js";
import { LoaderCircle } from "lucide-react";
import axios from "../util/axiosConfig.jsx";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useContext(AppContext);

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);

        //Basic validation can be added here
        if(!validateEmail(email)){
            setError("Please enter valid email.");
            setIsLoading(false);
            return;
        }
        
        if(!password.trim()){
            setError("Please enter your password.");
            setIsLoading(false);
            return;
        }

        setError("");

        //login api call
        try {
            const response = await axios.post(API_ENDPOINTS.LOGIN, {
                email,
                password
            });

            const {token, user} = response.data;
            if(token) {
                localStorage.setItem("token", token);
                setUser(user);
                navigate("/dashboard");
            }
        } catch (error) {
            if(error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                console.error("Login error:", error);
                setError(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            <img src={assets.login_bg} alt="Background" className="absolute inset-0 w-full h-full object-cover filter blur-none"/>

            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto w-full max-w-sm">
                <h3 className="text-2xl font-semibold text-black text-center mb-2">
                    Welcome Back
                </h3>
                <p className="text-sm text-slate-700 text-center mb-8">
                    Please enter your details to log in to your account.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                        
                    <Input 
                        label="Email" 
                        type="email" 
                        placeholder="name@example.com"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    
                    <Input 
                        label="Password" 
                        type="password" 
                        placeholder="*******"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                    {error && (
                        <div>
                            <p className="text-red-800 text-center text-sm bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        </div>
                    )}

                    <button disabled={isLoading} className={`w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed': ''}`} type="submit">
                        {isLoading ? (
                            <>
                                <LoaderCircle className="animate-spin w-5 h-5" />
                                Logging In...
                            </>
                        ) : (
                            "Log In"
                        )}
                    </button>
                    
                    <p className="text-sm text-slate-800 text-center mt-6">
                        Don't have an account? 
                        <Link to="/singup" className="text-blue-600 text-primary underline hover:text-primary-dark transition-colors">
                            Sign Up
                        </Link>
                    </p>
                   
                </form>
            </div>

        </div>
    )
}

export default Login;