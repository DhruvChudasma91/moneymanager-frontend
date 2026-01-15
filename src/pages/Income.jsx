import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList";
import Modal from "../components/Modal";
import AddIncomeForm from "../components/AddIncomeForm";
import DeleteAlert from "../components/DeleteAlert";
import IncomeOverview from "../components/IncomeOverview";

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

  const deleteIncome = async (id) => {

    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
      setOpenDeleteIncomeModal({show: false, data: null})
      toast.success("Income deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.log('Error deleting income', error);
      toast.error(error.response?.data?.message || "Failed to delete income");
    }
  }

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD, {responseType: "blob"});
      let filename = "income_details.xlsx";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Download income details successfully");
    } catch (error) {
      console.log('Error downloading income details:', error);
      toast.error(error.response?.data?.message || "Failed to download income");
    }
  }

  const handleEmailIncomeDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
      if(response.status === 200) {
        toast.success("Income details emailed successfully");
      }
    } catch (error) {
      console.log("Error emailing income details:", error);
      toast.error(error.response?.data?.message || "Failed to email income");
    }
  }

  return (
    <Dashboard activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            {/* overview for income with line chart */}
            <IncomeOverview transactions={incomeData} onAddIncome={() => setOpenAddIncomeModal(true)}/>
          </div>

          <IncomeList 
            transactions={incomeData} 
            onDelete={(incomeId) => setOpenDeleteIncomeModal({show: true, data: incomeId})}
            onDownload={handleDownloadIncomeDetails}
            onEmail={handleEmailIncomeDetails}
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

          <Modal 
            isOpen={openDeleteIncomeModal.show}
            onClose={() => setOpenDeleteIncomeModal({show : false, data: null})}
            title = "Delete Income"
          >
            <DeleteAlert
              content="Are you sure want to delete this income details?"
              onDelete={() => deleteIncome(openDeleteIncomeModal.data)}
            />
          </Modal>

        </div>
      </div>
    </Dashboard>
  )
}

export default Income;