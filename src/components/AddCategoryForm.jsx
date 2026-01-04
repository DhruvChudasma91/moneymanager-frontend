import { useState } from "react";
import Input from "./Input";

const AddCategoryForm = () => {
    const [category, setCategory] = useState({
        name: "",
        type: "income",
        icon: ""
    });

    const categoryTypeOptions = [
        {value: "income", label: "Income"},
        {value: "expense", label: "Expense"}
    ];

    const handleChange = (key, value) => {
        setCategory({...category, [key]: value});
    }

    return (
        <div className="p-4">
            <Input 
                label="Category Name"
                type="text"
                placeholder="e.g., Freelance, Salary, Groceries"
                value={category.name}
                onChange={({target}) => handleChange("name", target.value)}
            />
        </div>
    )
}

export default AddCategoryForm;