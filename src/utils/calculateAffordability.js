const API_BASE_URL = "https://mortgage-calculator-backend-beql.onrender.com";

export const fetchStateRates = async (selectedState) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/stateRates/${selectedState}`);
      if (!response.ok) {
        throw new Error("Failed to fetch state rates");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching state rates:", error);
      return { interestRate: 7.0, propertyTaxRates: {}, insuranceRate: 0.5 }; // Default values
    }
  };

  export const fetchMortgageRate = async (rateTerm) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/mortgageRates/${rateTerm}`);
      if (!response.ok) {
        throw new Error("Failed to fetch mortgage rates");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching mortgage rates:", error);
      return { interestRate: 7.0 }; // Default values
    }
  };

export const calculateAffordability = async ({
    annualIncome,
    monthlyDebts,
    downPayment,
    selectedState,
    loanTermYears = 30,
  }) => {
    // Get state specific rates
    const stateRatesData = await fetchStateRates(selectedState);

    // Get interest rate, insurance rate, and state tax rate
    const { propertyTaxRate, insurance, insuranceRate } = stateRatesData;

    // Get mortgage rates
    const interestRate = await fetchMortgageRate(loanTermYears.toString());

    // Convert annual income to monthly
    const monthlyIncome = annualIncome / 12;

    // Max monthly mortgage payment (28% rule)
    const maxMortgage28 = monthlyIncome * 0.28;

    // Max total debt allowed (DTI limit, assume 36% max)
    const maxTotalDebt = monthlyIncome * 0.36;
    const availableHousingBudget = maxTotalDebt - monthlyDebts;

    // Final max mortgage payment is the lower of the two rules
    let maxMortgagePayment = Math.min(maxMortgage28, availableHousingBudget);

    // Estimate annual property tax & insurance based on estimated price
    let monthlyPropertyTax = (propertyTaxRate / 100) * maxMortgagePayment;
    let monthlyInsurance = (insuranceRate / 100) * maxMortgagePayment;

    // Monthly property tax & insurance
    let annualPropertyTax = monthlyPropertyTax * 12;
    let annualInsurance = monthlyInsurance * 12;

    // Adjust max mortgage payment to include property tax & insurance
    maxMortgagePayment -= (monthlyPropertyTax + monthlyInsurance);

    // Convert interest rate to decimal and monthly percentage
    const monthlyInterestRate = (interestRate / 100) / 12;
    const totalPayments = loanTermYears * 12;

    // Calculate loan amount using the PMT formula
    let loanAmount = (maxMortgagePayment * (1 - Math.pow(1 + monthlyInterestRate, -totalPayments))) / monthlyInterestRate;

    // Adjust estimated home price based on actual loan amount
    let estimatedHomePrice = loanAmount + downPayment;

    // Recalculate taxes & insurance based on actual home price
    annualPropertyTax = (propertyTaxRate / 100) * estimatedHomePrice;
    annualInsurance = (insuranceRate / 100) * estimatedHomePrice;
    monthlyPropertyTax = annualPropertyTax / 12;
    monthlyInsurance = annualInsurance / 12;

    // Calculate PMI (only if down payment is < 20% of home price)
    const pmiRate = 0.005; // Assume 0.5% annual PMI rate
    const needsPMI = downPayment / estimatedHomePrice < 0.2;
    const monthlyPMI = needsPMI ? (loanAmount * pmiRate) / 12 : 0;

    // Adjust final max mortgage payment to include PMI
    maxMortgagePayment -= monthlyPMI;

    // Recalculate loan amount with PMI factored in
    loanAmount = (maxMortgagePayment * (1 - Math.pow(1 + monthlyInterestRate, -totalPayments))) / monthlyInterestRate;
    estimatedHomePrice = loanAmount + downPayment;

    // Final total monthly mortgage payment (now properly includes PMI, taxes, insurance)
    const totalMonthlyPayment = Math.round(
        maxMortgagePayment + monthlyPMI + monthlyPropertyTax + monthlyInsurance
    );
  
    // Final mortgage breakdown
    return {
        estimatedHomePrice: Math.round(estimatedHomePrice),
        loanAmount: Math.round(loanAmount),
        monthlyMortgage: Math.round(maxMortgagePayment),
        totalMonthlyPayment: Math.round(totalMonthlyPayment),
        monthlyPMI: Math.round(monthlyPMI),
        monthlyPropertyTax: Math.round(monthlyPropertyTax),
        monthlyInsurance: Math.round(monthlyInsurance),
    };
  };
  