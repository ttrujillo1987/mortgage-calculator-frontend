import React from "react";
import { useNavigate } from "react-router-dom";

const states = [
  { name: "Alabama", code: "AL" },
  { name: "Alaska", code: "AK" },
  { name: "Arizona", code: "AZ" },
  { name: "Arkansas", code: "AR" },
  { name: "California", code: "CA" },
  { name: "Colorado", code: "CO" },
  { name: "Connecticut", code: "CT" },
  { name: "Delaware", code: "DE" },
  { name: "Florida", code: "FL" },
  { name: "Georgia", code: "GA" },
  { name: "Hawaii", code: "HI" },
  { name: "Idaho", code: "ID" },
  { name: "Illinois", code: "IL" },
  { name: "Indiana", code: "IN" },
  { name: "Iowa", code: "IA" },
  { name: "Kansas", code: "KS" },
  { name: "Kentucky", code: "KY" },
  { name: "Louisiana", code: "LA" },
  { name: "Maine", code: "ME" },
  { name: "Maryland", code: "MD" },
  { name: "Massachusetts", code: "MA" },
  { name: "Michigan", code: "MI" },
  { name: "Minnesota", code: "MN" },
  { name: "Mississippi", code: "MS" },
  { name: "Missouri", code: "MO" },
  { name: "Montana", code: "MT" },
  { name: "Nebraska", code: "NE" },
  { name: "Nevada", code: "NV" },
  { name: "New Hampshire", code: "NH" },
  { name: "New Jersey", code: "NJ" },
  { name: "New Mexico", code: "NM" },
  { name: "New York", code: "NY" },
  { name: "North Carolina", code: "NC" },
  { name: "North Dakota", code: "ND" },
  { name: "Ohio", code: "OH" },
  { name: "Oklahoma", code: "OK" },
  { name: "Oregon", code: "OR" },
  { name: "Pennsylvania", code: "PA" },
  { name: "Rhode Island", code: "RI" },
  { name: "South Carolina", code: "SC" },
  { name: "South Dakota", code: "SD" },
  { name: "Tennessee", code: "TN" },
  { name: "Texas", code: "TX" },
  { name: "Utah", code: "UT" },
  { name: "Vermont", code: "VT" },
  { name: "Virginia", code: "VA" },
  { name: "Washington", code: "WA" },
  { name: "Washington DC", code: "DC" },
  { name: "West Virginia", code: "WV" },
  { name: "Wisconsin", code: "WI" },
  { name: "Wyoming", code: "WY" }
];

const StateSelection = ({ selectedState, setSelectedState }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto my-24 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">In what state is the property located?</h2>
      <div class="p-4 rounded-lg text-center">
        <select 
          value={selectedState} 
          onChange={(e) => setSelectedState(e.target.value)}
          className="border-2 rounded-lg"
        >
          <option value="" disabled>Select a state</option>
          {states.map(({ name, code }) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
        <button className="mx-4 px-4 py-1 rounded-lg bg-slate-800 hover:bg-slate-950 text-white" onClick={() => navigate("/summary")} disabled={!selectedState}>Next</button>
        <button className="px-4 py-1 rounded-lg bg-slate-800 hover:bg-slate-950 text-white" onClick={() => navigate("/down-payment")}>Back</button>
      </div>
    </div>
  );
};

export default StateSelection;
