// CSS:
import styles from './Login.module.css';
// React:
import React, { useState } from "react";
import { FaEye, FaRegEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
// Promo:
import PromoCarousel from '../../components/PromoCarousel/PromoCarousel';
import { promoList } from '../../api/promoList';
// API calls/Auth:
import { requestLogin } from "../../api/services/login";
import { useAuth } from '../../context/AuthProvider';

// Warnings:
import {useWarning} from '../../context/WarningProvider';


export default function Login() {
  // Warnings:
  const {push} = useWarning();
  
  const navigate = useNavigate()
  const {login} = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await requestLogin(form);

    if (!result || result.error) {
      push(result?.error || "Login Failed", "error");
      return;
    }

    await login();
    navigate('/profile');
  };






  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <PromoCarousel promoList={promoList} />
      </div>

      <div className={styles.bodyText}>
        <h2>Entrar</h2>
        <p>Faça login para continuar na sua conta.</p>
      </div>

      <form className={styles.loginContainer} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="E-mail"
            required
            aria-label="E-mail"
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Senha"
            required
            aria-label="Senha"
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowPassword(v => !v)}
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {showPassword ? <FaEye className={styles.reactIcon}/> : <FaRegEyeSlash className={styles.reactIcon}/>} 
          </button>
        </div>

        <button type="submit">Entrar</button>
      </form>
    </section>
  );
}