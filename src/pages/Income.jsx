import { data } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList";
import Modal from "../components/Modal";
import { Plus } from "lucide-react";
import AddIncomeForm from "../components/AddIncomeForm";

const Income = () => {
  useUser();

  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteIncomeModal, setOpenDeleteIncomeModal] = useState({
    show: false,
    data: null
  });

  const fetchIncomeDetails = async () => {
    if(loading) return;

    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
      if(response.status === 200) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Failed fetching incomes:", error);
      toast.error(error.response?.data?.message || "Failed to fetch incomes details.");
    } finally {
      setLoading(false);
    }
  };

  //Fetch categories for income
  const fetchIncomeCategories = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
      if(response.status === 200) {
        console.log("Income categories: ", response.data)
        setCategories(response.data);
      }

    } catch (error) {
      console.error("Failed to fetch income categories: ", error);
      toast.error(error.response?.data?.message || "Failed to fetch income categories");
    }
  } 

  const handleAddIncome = async (income) => {

    const {name, amount, date, icon, categoryId} = income;

    if(!name.trim()) {
      toast.error("Please enter a name");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Please enter valid amount");
      return;
    }

    if(!date) {
      toast.error("Date is required!");
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if(date > today) {
      toast.error("Date cananot be in the future");
      return;
    }

    if(!categoryId) {
      toast.error("Please select a category");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId
      })
      if(response.status === 201) {
        setOpenAddIncomeModal(false);
        toast.success("Income added successfully");
        fetchIncomeDetails();
        fetchIncomeCategories();
      }
    } catch (error) {
      console.log("Error adding income", error);
      toast.error(error.response?.data?.message || "Failed to adding income");
    }



  }


  useEffect(() => {
    fetchIncomeDetails();
    fetchIncomeCategories();
  }, []);

  return (
    <Dashboard activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            {/* overview for income with line chart */}
            <button onClick={() => setOpenAddIncomeModal(true)} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-purple-700 hover:bg-blue-500 text-white transition-colors shadow-md">
              <Plus size={18} />
              <span>Add Income</span>
            </button>
          </div>

          <IncomeList 
            transactions={incomeData} 
            onDelete={(incomeId) => console.log("Delete income:", incomeId)}
          />

          <Modal 
            isOpen={openAddIncomeModal}
            onClose={() => setOpenAddIncomeModal(false)}
            title="Add Income"
          >
            <AddIncomeForm 
              onAddIncome = {(income) => handleAddIncome(income)}
              categories = {categories}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  )
}

export default Income;