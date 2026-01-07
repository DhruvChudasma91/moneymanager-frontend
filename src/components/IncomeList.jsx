import { Download, LoaderCircle, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { useState } from "react";

const IncomeList = ({transactions, onDelete, onDownload, onEmail}) => {
  const [loading, setLoading] = useState(false);

  const handleEmail = async () => {
    setLoading(true);
    try {
      await onEmail();
    } finally {
      setLoading(false);
    }
  }

  const handleDownload = async () => {
    setLoading(true);
    try {
      await onDownload();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow border border-gray-100 p-5">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold text-gray-800">Income Sources</h5>

        <div className="flex items-center gap-2">
          <button className="
            flex items-center gap-1 px-3 py-1.5 text-sm 
            bg-gray-100 text-gray-700 rounded-lg 
            hover:bg-purple-100 hover:text-purple-700
            transition-colors duration-200"
            onClick={handleEmail}
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Emailing...
              </>
            ) : (
              <>
                <Mail size={15} className="text-base"/> Email
              </>
            )}
          </button>

          <button className="
            flex items-center gap-1 px-3 py-1.5 text-sm 
            bg-gray-100 text-gray-700 rounded-lg 
            hover:bg-purple-100 hover:text-purple-700
            transition-colors duration-200"
            onClick={handleDownload}
            disabled={loading}
          > 
            {loading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download size={15} className="text-base"/> Download
              </>
            )}
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