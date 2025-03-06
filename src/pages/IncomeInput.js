import React from "react";
import { useNavigate } from "react-router-dom";

const IncomeInput = ({ annualIncome, setAnnualIncome }) => {
    const navigate = useNavigate();
  
    return (
      <div className="max-w-2xl mx-auto my-24 p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">What is your annual income?</h2>
        <div class="p-4 rounded-lg text-center">
          <input
            required
            type="number"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(Number(e.target.value))}
            className="border-2 rounded-lg"
          />
          <button className="mx-4 px-4 py-1 rounded-lg bg-slate-800 hover:bg-slate-950 text-white" onClick={() => navigate("/debts")} disabled={!annualIncome}>Next</button>
        </div>
      </div>
    );
  };
  
  export default IncomeInput;