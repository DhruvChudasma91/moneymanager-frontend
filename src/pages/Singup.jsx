import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import Input from "../components/Input.jsx";
import { validateEmail } from "../util/validation.js";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector.jsx";
import uploadProfileImage from "../util/uploadProfileImage.js";


const Singup = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let profileImageUrl = "";
        setIsLoading(true);

        //Basic validation can be added here
        if(!fullName.trim()){
            setError("Please enter your full name.");
            setIsLoading(false);
            return;
        }

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

        //signup api call can be made here
        try {

            //upload profile image if selected
            if(profileImage) {
                const imageUrl = await uploadProfileImage(profileImage);
                profileImageUrl = imageUrl || "";
            }


            const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl
            })

            if(response.status === 201){
                toast.success("Account created successfully.");
                navigate("/login");
            }
        } catch (err) {
            console.error("Error during signup:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

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

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="flex justify-center mb-6">
                        <ProfilePhotoSelector image={profileImage} setImage={setProfileImage} />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-2 gap-5">
                        <Input 
                            label="Full Name" 
                            type="text" 
                            placeholder="John Doe"
                            value={fullName} 
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <Input 
                            label="Email" 
                            type="email" 
                            placeholder="name@example.com"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        
                        <div className="col-span-2">
                            <Input 
                                label="Password" 
                                type="password" 
                                placeholder="*******"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && (
                            <div className="col-span-2">
                                <p className="text-red-800 text-center text-sm bg-red-50 p-2 rounded">
                                    {error}
                                </p>
                            </div>
                        )}

                        <button disabled={isLoading} className={`cursor-pointer w-full col-span-2 bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed': ''}`} type="submit">
                            {isLoading ? (
                                <>
                                    <LoaderCircle className="animate-spin w-5 h-5"/>
                                    Signing Up...
                                </>
                            ) : (
                                "Sign Up"
                            )}
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