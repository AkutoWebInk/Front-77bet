import { API_PATH2 } from "../api";

// API
export async function requestWithdrawal(data) {
    const response = await fetch (`${API_PATH2}/transactions/withdraw`, 
        {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log('Withdrawal Result', result);
        return result;
}

// Utilities
export function formatPixKey(input, type) {
    let value = input.replace(/\D/g, '');
    
    if (type === 'CPF') {
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})/, '$1-$2');
        return value;
    } 
    
    if (type === 'Telefone') {
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        return value;
    }

    return input;
}

export function cleanPixKey(input, type) {
    if (type === 'CPF' || type === 'Telefone') {
        return input.replace(/\D/g, '');
    }
    return input;
}

export function limitAmount(input, balanceCents) {
    let numeric = Number(input.replace(/\D/g, ''));
    if (numeric > balanceCents) {
        numeric = balanceCents;
    }
    return numeric;
}