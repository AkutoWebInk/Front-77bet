// CSS:
import styles from './Register.module.css';
// React:
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { MdTextsms } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

// Promo:
import PromoCarousel from '../../components/PromoCarousel/PromoCarousel';
import { promoList } from '../../api/promoList';

// API calls:
import { requestRegister, formatCPF, formatBirthDate, formatPhone } from '../../api/services/register';
import { requestLogin } from "../../api/services/login";
import { useAuth } from "../../context/AuthProvider";

// Data chekers for the handlers:
import { checkBirthDate } from '../../api/services/register';

// Warnings:
import {useWarning} from '../../context/WarningProvider';

export default function Register() {
  // Warnings
  const {push} = useWarning();
  // Auth status:
  const {login} = useAuth();
  const navigate = useNavigate();
 
  // Register formulary payload:
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    cpf: '',
    phone: '',
    smscode: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  // Peek password: 
  const [showPassword, setShowPassword] = useState(false);

  // CPF/Email/Birth date formating and cleanup:
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    // Formats and clears data to prepare for the API
    if(name === 'cpf') {formattedValue = formatCPF(value)}
    if(name === 'birthDate') {formattedValue = formatBirthDate(value)}
    if(name === 'phone') {formattedValue = formatPhone(value)}
    // Updates the last value key:value in the form
    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };

  // Sends register request and auto logins if successfull:
  const handleSubmit = async (e) => {
    e.preventDefault();



    try {
      const dateCheck = checkBirthDate(formData?.birthDate)
      if(!dateCheck || dateCheck == false){
        push('Data de nascimento nao pode ser maior do que a data atual.', 'error');
        return;
      }

      const response = await requestRegister(formData);
      console.log(response)

      if(response?.status === 200){
        const result = await requestLogin({email:formData.email, password:formData.password})
        console.log(result)
      
        if(!result) return;
      await login();
      navigate('/profile');
    }
  } catch (error) {console.log('register error:', error);}
  };

  const handleSendSms = (e) => {
    e.preventDefault();
    console.log('Enviar SMS para', formData.phone);
  };

  const togglePassword = () => setShowPassword(v => !v);

  return (
    <section className={styles.page}>

      <div className={styles.header}>
        <PromoCarousel promoList={promoList} />
      </div>

      <div className={styles.bodyText}>
        <h2>Criar Conta</h2>
        <p>Preencha os campos abaixo para criar sua conta.</p>
      </div>

      <form className={styles.loginContainer} onSubmit={handleSubmit}>

        <div className={styles.inputGroup}>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Nome"
            required
            aria-label="Nome"
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Sobrenome"
            required
            aria-label="Sobrenome"
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="text"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            placeholder="Data de Nascimento"
            required
            aria-label="Data de Nascimento"
          />
        </div>

        <div className={styles.inputGroup}>
          <span className={styles.leftAddon}>CPF</span>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            placeholder="CPF"
            required
            aria-label="CPF"
          />
        </div>

        <div className={styles.inputGroup}>
          <span className={styles.leftAddon}>+55</span>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Número de Celular"
            required
            aria-label="Número de Celular"
          />
          <button
            type="button"
            className={styles.rightAddon}
            onClick={handleSendSms}
            aria-label="Enviar código por SMS"
          >
            <MdTextsms className={styles.reactIcon} />
          </button>
        </div>

        <div className={styles.inputGroup}>
          <span className={styles.leftAddon}>Código</span>
          <input
            type="text"
            name="smscode"
            className={styles.hasRightAddon}
            value={formData.smscode}
            onChange={handleChange}
            placeholder="Verificação por SMS"
            required
            aria-label="Verificação por SMS"
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail"
            required
            aria-label="E-mail"
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Senha"
            required
            aria-label="Senha"
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type={showPassword ? "text" : "password"}
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
            placeholder="Repetir Senha"
            required
            aria-label="Repetir Senha"
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={togglePassword}
            aria-pressed={showPassword}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? <FaEye className={styles.reactIcon} /> : <FaRegEyeSlash className={styles.reactIcon} />}
          </button>
        </div>

        <button type="submit">Criar Conta</button>
      </form>
    </section>
  );
}