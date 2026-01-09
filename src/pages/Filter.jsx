import { Search } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";

const Filter = () => {
  useUser();
  return (
    <Dashboard activeMenu="Filters">
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Filter Transaction</h2>
        </div>
        <div className="card p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h5 text-lg font-semibold>Select the filters</h5>
          </div>
          <form className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="type">Type</label>
              <select id="type" className="w-full border rounded px-3 py-2">
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label htmlFor="start" className="block text-sm font-medium mb-1">Start Date</label>
              <input id="startdate" type="date" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label htmlFor="end" className="block text-sm font-medium mb-1">End Date</label>
              <input id="enddate" type="date" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label htmlFor="sortorder" className="block text-sm font-medium mb-1">Sort Order</label>
              <select id="sortorder" className="w-full border rounded px-3 py-2">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div className="sm:col-span-1 md:col-span-2 flex items-end">
              <div className="w-full">
                <label htmlFor="keyword" className="block text-sm font-medium mb-1">Search</label>
                <input id="keyword" type="text" placeholder="Search..." className="w-full border rounded px-3 py-2"/>
              </div>
              <button className="ml-2 mb-1 p-2 bg-purple-800 hover:bg-purple-500 text-white rounded flex items-center justify-center cursor-pointer">
                <Search size={20}/>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dashboard>
  )
}

export default Filter;