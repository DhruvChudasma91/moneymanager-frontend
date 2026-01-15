import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import ExpenseList from "../components/ExpenseList";
import Modal from "../components/Modal";
import AddExpenseForm from "../components/AddExpenseForm";
import DeleteAlert from "../components/DeleteAlert";
import ExpenseOverview from "../components/ExpenseOverview";

const Expense = () => {
  useUser();

  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteExpenseModal, setOpenDeleteExpenseModal] = useState({
    show: false,
    data: null
  });

  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
      if (response.status === 200) setExpenseData(response.data);
    } catch (error) {
      toast.error("Failed to fetch expense details");
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenseCategories = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
      if (response.status === 200) setCategories(response.data);
    } catch {
      toast.error("Failed to fetch expense categories");
    }
  };

  const handleAddExpense = async (expense) => {
    const { name, amount, date, icon, categoryId } = expense;

    if (!name.trim() || !amount || !date || !categoryId) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId
      });

      if (response.status === 201) {
        toast.success("Expense added successfully");
        setOpenAddExpenseModal(false);
        fetchExpenseDetails();
      }
    } catch {
      toast.error("Failed to add expense");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
      toast.success("Expense deleted");
      setOpenDeleteExpenseModal({ show: false, data: null });
      fetchExpenseDetails();
    } catch {
      toast.error("Failed to delete expense");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
    fetchExpenseCategories();
  }, []);

  return (
    <Dashboard activeMenu="Expense">
      <div className="my-5 mx-auto">
        <ExpenseOverview transactions={expenseData} onAddExpense={() => setOpenAddExpenseModal(true)} />

        <ExpenseList
          transactions={expenseData}
          onDelete={(id) => setOpenDeleteExpenseModal({ show: true, data: id })}
        />

        <Modal isOpen={openAddExpenseModal} onClose={() => setOpenAddExpenseModal(false)} title="Add Expense">
          <AddExpenseForm onAddExpense={handleAddExpense} categories={categories} />
        </Modal>

        <Modal isOpen={openDeleteExpenseModal.show} onClose={() => setOpenDeleteExpenseModal({ show: false, data: null })} title="Delete Expense">
          <DeleteAlert content="Are you sure you want to delete this expense?" onDelete={() => deleteExpense(openDeleteExpenseModal.data)} />
        </Modal>
      </div>
    </Dashboard>
  );
};

export default Expense;
