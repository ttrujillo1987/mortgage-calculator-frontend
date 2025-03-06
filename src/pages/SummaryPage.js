import React from "react";
import { useState, useEffect } from "react";
import { calculateAffordability } from "../utils/calculateAffordability";
import MortgageBreakdownChart from "../components/mortgageBreakdownChart";
import { fetchMortgageNews } from "../services/newsService";
import MortgageNewsSection from "../components/mortgageNews";


const statesMap = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
  HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
  MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
  NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio",
  OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
  SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
  VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming"
};

const SummaryPage = ({ annualIncome, monthlyDebts, downPayment, selectedState, pmi, hoa }) => {
  const [affordability, setAffordability] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      const result = await calculateAffordability({ annualIncome, monthlyDebts, downPayment, selectedState, hoa });
      setAffordability(result);
    };
    fetchData();
  }, [annualIncome, monthlyDebts, downPayment, selectedState]);

  if (!affordability) return <p>Loading affordability details...</p>;

  const mortgageBreakdown = {
    principalInterest: affordability.monthlyMortgage,
    propertyTax: affordability.monthlyPropertyTax,
    homeInsurance: affordability.monthlyInsurance,
    pmi: affordability.pmi || 0, // Default 0 if PMI not entered yet
    hoa: hoa || 0, // Default 0 if HOA not entered yet
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4"> Home Affordability Summary</h2>
        <div class="bg-gray-100 p-4 rounded-lg shadow-inner">
            <p className="text-lg"><strong>Estimated Home Price:</strong> <span className="text-blue-600 ml-2">${affordability.estimatedHomePrice}</span></p>
            <p className="text-lg"><strong>Loan Amount:</strong><span className="text-blue-600 ml-2"> ${affordability.loanAmount}</span></p>
            <p className="text-lg"><strong>Monthly Mortgage:</strong><span className="text-blue-600 ml-2"> ${affordability.monthlyMortgage}</span></p>
            <p className="text-lg"><strong>Monthly Property Tax:</strong><span className="text-blue-600 ml-2"> ${affordability.monthlyPropertyTax}</span></p>
            <p className="text-lg"><strong>Monthly Home Insurance:</strong><span className="text-blue-600 ml-2"> ${affordability.monthlyInsurance}</span></p>
            <p className="text-lg"><strong>PMI:</strong><span className="text-blue-600 ml-2"> ${affordability.monthlyPMI}</span></p>
            <hr></hr>
            <p className="text-xl"><strong>Total Monthly Payment:</strong><span className="text-blue-600 ml-2"> ${affordability.totalMonthlyPayment}</span></p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-center mt-4 mb-4">Mortgage Payment Breakdown</h2>
          <MortgageBreakdownChart mortgageBreakdown={mortgageBreakdown} />
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;

