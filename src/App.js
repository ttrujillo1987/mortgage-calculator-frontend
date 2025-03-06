import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IncomeInput from "./pages/IncomeInput";
import DebtInput from "./pages/DebtInput";
import DownPaymentInput from "./pages/DownPaymentInput";
import StateSelection from "./pages/StateSelection";
import SummaryPage from "./pages/SummaryPage";

function App() {
  // Initialize state for user inputs
  const [annualIncome, setAnnualIncome] = useState(NaN);
  const [monthlyDebts, setMonthlyDebts] = useState(NaN);
  const [downPayment, setDownPayment] = useState(NaN);
  const [selectedState, setSelectedState] = useState("");
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IncomeInput annualIncome={annualIncome} setAnnualIncome={setAnnualIncome} />} />
        <Route path="/debts" element={<DebtInput monthlyDebts={monthlyDebts} setMonthlyDebts={setMonthlyDebts} />} />
        <Route path="/down-payment" element={<DownPaymentInput downPayment={downPayment} setDownPayment={setDownPayment} />} />
        <Route path="/state" element={<StateSelection selectedState={selectedState} setSelectedState={setSelectedState} />} />
        <Route path="/summary" element={<SummaryPage annualIncome={annualIncome} monthlyDebts={monthlyDebts} downPayment={downPayment} selectedState={selectedState} />} />
      </Routes>
    </Router>
  );
}

export default App;
