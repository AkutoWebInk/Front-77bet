import { API_PATH } from '../api';

// API
export async function requestRegister(data) {
  const response = await fetch(`${API_PATH}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return response.json();
}

// Helpers
export function formatCPF(cpf) {
  cpf = cpf.replace(/\D/g, '').slice(0, 11);
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return cpf;
}

export function formatBirthDate(date) {
  date = date.replace(/\D/g, '').slice(0, 8);
  date = date.replace(/(\d{2})(\d)/, '$1/$2');
  date = date.replace(/(\d{2})(\d)/, '$1/$2');
  return date;
}

export function checkBirthDate(date) {
  if (!date) return false;

  // convert DD/MM/YYYY → YYYY-MM-DD
  const parts = date.split('/');
  if (parts.length !== 3) return false;

  const isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
  const userBirthDate = new Date(isoDate);
  const currentDate = new Date();

  if (isNaN(userBirthDate.getTime())) return false;

  return userBirthDate <= currentDate;
}

export function formatPhone(phone) {
  phone = phone.replace(/\D/g, '').slice(0, 11);

  if (phone.length > 2) {
    phone = `(${phone.slice(0,2)}) ${phone.slice(2)}`;
  }

  if (phone.length > 9) {
    phone = phone.slice(0, 9) + '-' + phone.slice(9);
  }

  return phone;
}   
