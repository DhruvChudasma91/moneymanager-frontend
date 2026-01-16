import { addThousandSeparator } from "../util/util";
import CustomePieChart from "./CustomePieChart";

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {
    const COLOURS = ["#59168B", "#016630", "#a0090e"];
    const balanceData = [
        {name: "Total Balance", amount: totalBalance},
        {name: "Total Income", amount: totalIncome},
        {name: "Total Expense", amount: totalExpense}
    ];
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold text-gray-900">Finance Overview</h5>
            </div>

            <CustomePieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={addThousandSeparator(totalBalance)}
                colors={COLOURS}
                showTextAnchor
            />

        </div>
    );
}

export default FinanceOverview;