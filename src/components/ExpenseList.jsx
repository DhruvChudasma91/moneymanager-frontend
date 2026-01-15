import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const ExpenseList = ({ transactions, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h5 className="text-lg font-semibold mb-4">Expenses</h5>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions.map(expense => (
          <TransactionInfoCard
            key={expense.id}
            title={expense.name}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM, YYYY")}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
