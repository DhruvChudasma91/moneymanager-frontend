import { useEffect, useState } from "react";
import Input from "./Input";
import EmojiPickerPopup from "./EmojiPickerPopUp";
import { LoaderCircle } from "lucide-react";

const AddExpenseForm = ({ onAddExpense, categories }) => {
  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: ""
  });

  const [loading, setLoading] = useState(false);

  const categoryOptions = categories.map(c => ({ value: c.id, label: c.name }));

  const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

  const handleAdd = async () => {
    setLoading(true);
    try {
      await onAddExpense(expense);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categories.length && !expense.categoryId) {
      setExpense(prev => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories]);

  return (
    <div>
      <EmojiPickerPopup icon={expense.icon} onSelect={(icon) => handleChange("icon", icon)} />

      <Input label="Expense Name" value={expense.name} onChange={e => handleChange("name", e.target.value)} />
      <Input label="Category" isSelect options={categoryOptions} value={expense.categoryId} onChange={e => handleChange("categoryId", e.target.value)} />
      <Input label="Amount" type="number" value={expense.amount} onChange={e => handleChange("amount", e.target.value)} />
      <Input label="Date" type="date" value={expense.date} onChange={e => handleChange("date", e.target.value)} />

      <div className="flex justify-end mt-6">
        <button onClick={handleAdd} disabled={loading} className="bg-purple-800 text-white px-4 py-2 rounded-lg">
          {loading ? "Adding..." : "Add Expense"}
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
