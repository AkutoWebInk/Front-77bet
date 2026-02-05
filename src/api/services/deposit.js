import { API_PATH2 } from "../api";

// API
export async function requestDeposit(data) {
  const response = await fetch(`${API_PATH2}/transactions/deposit`, 
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
      });
  
  const result = await response.json();
  console.log('Deposit Result', result);
  return result;
}

// Helpers
export function formatValue(value){
  const number = String(value).replace(/\D/g,"").replace(/^0+/,"");
  const cents = (Number(number)/100).toFixed(2);
  return cents.replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatCurrency(value) {
  return new Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}