import { Plus } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import CategoryList from "../components/CategoryList";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";

const Category = () => {
    useUser();

    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategoryDetails = async () => {
        if(loading) return;

        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
            if(response.status === 200) {
                console.log("Fetched categories:", response.data);
                setCategoryData(response.data);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("Failed to fetch categories. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategoryDetails();
    }, []);

    const handleAddCategory = async (category) => {
        
        const {name, type, icon} = category;

        if(!name.trim()) {
            toast.error("Category name is required");
            return;
        }

        const isExist = categoryData.some((cat) => {
            return cat.name.toLowerCase() === name.trim().toLowerCase();
        });

        if(isExist) {
            toast.error("Category with this name already exists");
            setOpenAddCategoryModal(false);
            return;
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {name, type, icon});
            if(response.status === 201) {
                toast.success("Category added successfully");
                setOpenAddCategoryModal(false);
                fetchCategoryDetails();
            }
            
        } catch (error) {
            console.error("Error adding category:", error);
            toast.error(error.response?.data?.message || "Failed to add category. Please try again.");
        }

    }

    return (
        <Dashboard activeMenu="Category">
            
            <div className="my-5 mx-auto">
                {/* Add button to add category */}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-semibold">All Categories</h2>
                    <button 
                        onClick={() => setOpenAddCategoryModal(true)}
                        className="flex items-center gap-1 bg-purple-800 text-white px-4 py-2 rounded-lg hover:bg-purple-900 cursor-pointer transition">
                        <Plus size={15} />
                        Add Category
                    </button>
                </div>

                {/* List of categories */}
                <CategoryList categories={categoryData}/>

                {/*Adding category modal*/}
                <Modal isOpen={openAddCategoryModal} onClose={() => setOpenAddCategoryModal(false)} title="Add Category">
                    <AddCategoryForm onAddCategory={handleAddCategory}/>
                </Modal>

                {/*Updating category modal*/}

            </div>
        </Dashboard>
    )
}

export default Category;