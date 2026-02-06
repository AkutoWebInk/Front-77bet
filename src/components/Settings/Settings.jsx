import React, { useState } from 'react';
import styles from './Settings.module.css';
import { useAuth } from '../../context/AuthProvider';
import { formatPhone } from '../../api/utils';
import { useWarning } from '../../context/WarningProvider';

export default function Settings() {
    const { user } = useAuth();
    const { push } = useWarning();
    
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        phone: user?.phone || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;
        
        if (name === 'phone') {
            formattedValue = formatPhone(value);
        }
        
        setFormData(prev => ({ ...prev, [name]: formattedValue }));
    };

    const handleSave = () => {
        // API endpoint doesn't exist yet, so we just log it for now
        console.log('Saving user data:', formData);
        push('Funcionalidade disponível em breve!', 'info');
    };

    return (
        <section className={styles.container}>
            <div className={styles.group}>
                <label className={styles.label}>Nome</label>
                <input 
                    type="text" 
                    name="firstName"
                    className={styles.input} 
                    value={formData.firstName} 
                    onChange={handleChange}
                />
            </div>

            <div className={styles.group}>
                <label className={styles.label}>Sobrenome</label>
                <input 
                    type="text" 
                    name="lastName"
                    className={styles.input} 
                    value={formData.lastName} 
                    onChange={handleChange}
                />
            </div>

            <div className={styles.group}>
                <label className={styles.label}>Celular</label>
                <input 
                    type="text" 
                    name="phone"
                    className={styles.input} 
                    value={formData.phone} 
                    onChange={handleChange}
                />
            </div>

            <div className={styles.separator}>Informações fixas</div>

            <div className={styles.group}>
                <label className={styles.label}>CPF (Bloqueado)</label>
                <input 
                    type="text" 
                    className={`${styles.input} ${styles.disabled}`} 
                    value={user?.cpf || ''} 
                    readOnly 
                />
            </div>

            <div className={styles.group}>
                <label className={styles.label}>Data de Nascimento (Bloqueada)</label>
                <input 
                    type="text" 
                    className={`${styles.input} ${styles.disabled}`} 
                    value={user?.birthDate || ''} 
                    readOnly 
                />
            </div>

            <div className={styles.group}>
                <label className={styles.label}>E-mail (Bloqueado)</label>
                <input 
                    type="text" 
                    className={`${styles.input} ${styles.disabled}`} 
                    value={user?.email || ''} 
                    readOnly 
                />
            </div>

            <button className={styles.saveButton} onClick={handleSave}>
                Salvar Alterações
            </button>
            
            <p className={styles.supportNote}>
                Para alterar informações bloqueadas, entre em contato com o suporte.
            </p>
        </section>
    );
}
