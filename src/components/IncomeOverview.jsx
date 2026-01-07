import { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../util/util";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

const IncomeOverview = ({transactions, onAddIncome}) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeLineChartData(transactions);
        console.log(result);
        setChartData(result);

        return () => {};
    }, [transactions]);

    return (
        <div className="bg-white rounded-xl shadow border border-gray-100 p-5">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg">
                        Income Overview
                    </h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Track your earning over time and analyze your income trends.
                    </p>
                </div>  
                <button onClick={onAddIncome} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-purple-700 hover:bg-blue-500 text-white transition-colors shadow-md">
                    <Plus size={18} />
                    <span>Add Income</span>
                </button>
            </div>

            <div className="mt-10">
                <CustomLineChart data={chartData} />
            </div>

        </div>
    )
}

export default IncomeOverview;