import { Download, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const IncomeList = ({transactions, onDelete}) => {
  return (
    <div className="bg-white rounded-xl shadow border border-gray-100 p-5">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold text-gray-800">Income Sources</h5>

        <div className="flex items-center gap-2">
          <button className="
            flex items-center gap-1 px-3 py-1.5 text-sm 
            bg-gray-100 text-gray-700 rounded-lg 
            hover:bg-purple-100 hover:text-purple-700
            transition-colors duration-200
          ">
            <Mail size={15} /> Email
          </button>

          <button className="
            flex items-center gap-1 px-3 py-1.5 text-sm 
            bg-gray-100 text-gray-700 rounded-lg 
            hover:bg-purple-100 hover:text-purple-700
            transition-colors duration-200
          ">
            <Download size={15} /> Download
          </button>
        </div>
      </div>

      <div className="grid grid-clos-1 md:grid-cols-2">
        {/*display list of income transactions*/}
        {transactions?.map((income) => (
            <TransactionInfoCard
                key={income.id}
                title={income.name}
                icon={income.icon}
                date={moment(income.date).format("Do MMM, YYYY")}
                amount={income.amount}
                type="income"
                onDelete={() => onDelete(income.id)}
            />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;