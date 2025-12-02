import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Category from "./pages/Category";
import Filter from "./pages/Filter";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import {Toaster} from "react-hot-toast";

const App = () => {
    return (
        <>  
            <Toaster/>
            <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={<Home/>}></Route>
                <Route path="/income" element={<Income/>}></Route>
                <Route path="/expense" element={<Expense/>}></Route>
                <Route path="/category" element={<Category/>}></Route>
                <Route path="/filter" element={<Filter/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/singup" element={<Singup/>}></Route>
            </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;