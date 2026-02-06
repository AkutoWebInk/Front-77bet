export function formatValue(value) {
  const number = String(value).replace(/\D/g, "").replace(/^0+/, "");
  const cents = (Number(number) / 100).toFixed(2);
  return cents.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatCurrency(value) {
  return new Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function formatPixKey(input, type) {
  let value = input.replace(/\D/g, '');
  if (type === 'CPF') {
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})/, '$1-$2');
    return value;
  }
  // Add other types if needed, or return as is for email/random
  return input;
}

export function cleanPixKey(value, type) {
  if (type === 'CPF' || type === 'Telefone') {
    return value.replace(/\D/g, '');
  }
  return value;
}

export function limitAmount(value, max) {
  let numeric = value.replace(/\D/g, '');
  if (Number(numeric) > max) numeric = String(max);
  return Number(numeric);
}

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

export function formatPhone(phone) {
  phone = phone.replace(/\D/g, '');
  if (phone.length > 11) phone = phone.slice(0, 11);
  phone = phone.replace(/^(\d{2})(\d)/g, '($1) $2');
  phone = phone.replace(/(\d)(\d{4})$/, '$1-$2');
  return phone;
}

export function checkBirthDate(date) {
  if (date.length < 10) return false;
  const parts = date.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  const d = new Date(year, month - 1, day);
  return d && d.getFullYear() === year && d.getMonth() + 1 === month && d.getDate() === day;
}
