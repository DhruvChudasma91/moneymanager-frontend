import { useEffect, useState } from "react";
import Input from "./Input";
import EmojiPickerPopUp from "./EmojiPickerPopUp";
import { LoaderCircle } from "lucide-react";

const AddCategoryForm = ({onAddCategory, initialCategoryData, isEditing}) => {
    const [category, setCategory] = useState({
        name: "",
        type: "income",
        icon: ""
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(isEditing && initialCategoryData) {
            setCategory(initialCategoryData);
        } else {
            setCategory({
                name: "",
                type: "income",
                icon: ""
            });
        }
    }, [isEditing, initialCategoryData]);

    const categoryTypeOptions = [
        {value: "income", label: "Income"},
        {value: "expense", label: "Expense"}
    ];

    const handleChange = (key, value) => {
        setCategory({...category, [key]: value});
    }

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await onAddCategory(category);
        } finally{
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <EmojiPickerPopUp 
                icon={category.icon}
                onSelect={(icon) => handleChange("icon", icon)}
            />
            <Input 
                label="Category Name"
                type="text"
                placeholder="e.g., Freelance, Salary, Groceries"
                value={category.name}
                onChange={({target}) => handleChange("name", target.value)}
            />

            <Input 
                label="Category Type"
                isSelect={true}
                options={categoryTypeOptions}
                value={category.type}
                onChange={({target}) => handleChange("type", target.value)}
            />

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-purple-800 text-white px-4 py-2 rounded-lg hover:bg-purple-900 cursor-pointer transition"
                >
                    {loading ? (
                        <> 
                            <LoaderCircle className="w-4 h-4 animate-spin"/>
                            {isEditing ? " Updating..." : " Adding..."}
                        </>
                    ) : (
                        <>
                            {isEditing ? " Update Category" : " Add Category"}
                        </> 
                    )}
                </button>
            </div>
        </div>
    )
}

export default AddCategoryForm;