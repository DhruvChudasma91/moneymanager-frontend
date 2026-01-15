import { useEffect, useState } from "react";
import { prepareExpenseLineChartData } from "../util/util";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData(prepareExpenseLineChartData(transactions));
  }, [transactions]);

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <div className="flex justify-between">
        <div>
          <h5 className="text-lg">Expense Overview</h5>
          <p className="text-xs text-gray-400">Track your spending over time.</p>
        </div>
        <button onClick={onAddExpense} className="flex items-center gap-2 bg-purple-700 text-white px-4 py-2 rounded-lg">
          <Plus size={18} /> Add Expense
        </button>
      </div>

      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
