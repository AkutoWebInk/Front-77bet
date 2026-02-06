// CSS
import styles from './Withdrawal.module.css';

// Functions
import { formatValue, formatCurrency } from '../../api/utils';

// API calls
import { requestWithdrawal } from '../../api/services/finance';
import { formatPixKey, cleanPixKey, limitAmount } from '../../api/utils';

// Icons
import { IoCloseOutline, IoCheckmarkCircleOutline, IoAlertCircleOutline } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import favicon from './assets/favicon.png';
import pixImg from './assets/pix.png';

export default function Withdrawal({ visible, onClose }) {

    const { user } = useAuth();
    const [placeholder] = useState('Valor do saque');
    const [value, setValue] = useState('');
    const [pixKeyType, setPixKeyType] = useState('CPF');
    const [pixKey, setPixKey] = useState('');
    const [withdrawalResult, setWithdrawalResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState('');

    async function handleWithdrawal() {
        if (!amount || amount <= 0) {
            setError('Informe um valor válido');
            return;
        }
        if (!pixKey) {
            setError('Informe a sua chave PIX');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                amount,
                pixKey: cleanPixKey(pixKey, pixKeyType),
                pixKeyType
            };
            const response = await requestWithdrawal(payload);
            if (response) {
                setWithdrawalResult(response);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    // Component visibility:
    useEffect(() => {
        document.body.style.overflow = visible ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [visible]);
    if (!visible) return null;



    function handlePixKeyChange(e) {
        const formatted = formatPixKey(e.target.value, pixKeyType);
        setPixKey(formatted);
        if (error) {
            setError('');
        }
    }
    function handleAmountChange(e) {
        const numericCents = limitAmount(e.target.value, (user?.balance || 0) * 100);
        const formatted = 'R$ ' + formatValue(String(numericCents));
        
        setValue(formatted);
        setAmount(numericCents / 100);
        
        if (error) {
            setError('');
        }
    }
    function handleClose() {
        setWithdrawalResult(null);
        setValue('');
        onClose();
    }



    return (
        <section className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <button className={styles.closeButton} onClick={handleClose}>
                    <IoCloseOutline />
                </button>
                
                {withdrawalResult ? (
                    <div className={styles.result}>

                        <div className={styles.header}>
                            {withdrawalResult.status === 200 ? (
                                <IoCheckmarkCircleOutline className={styles.successIcon} />
                            ) : (
                                <IoAlertCircleOutline className={styles.errorIcon} />
                            )}
                            <span className={styles.headerTitle}>{withdrawalResult.status === 200 ? 'Saque Solicitado!' : 'Erro no Saque'}</span>
                            <p className={styles.headerSubtitle}>{withdrawalResult.status === 200 ? 'Sua solicitação foi recebida' : 'Não foi possível processar'}</p>
                        </div>

                        {withdrawalResult.status === 200 ? (
                            <>
                                <span className={styles.resultAmount}>{formatCurrency(withdrawalResult.detail?.value || amount)}</span>

                                <span className={styles.resultDetails}>Detalhes do Saque</span>
                                <span className={styles.resultText}> 
                                    Método:
                                    <br />
                                    <span className={styles.resultSubtext}> PIX </span> 
                                </span>   
                                <span className={styles.resultText}>
                                    Status: 
                                    <br />
                                    <span className={styles.resultSubtext}> {withdrawalResult.detail?.status || 'PENDENTE'} </span>    
                                </span>
                                <span className={styles.resultText}>
                                    Destino: 
                                    <br />
                                    <span className={styles.resultSubtext}> {withdrawalResult.detail?.destination} </span>    
                                </span>

                                <section className={styles.resultInfo}>
                                    <span className={styles.resultInfoText}>Você receberá o valor em sua conta PIX em até 24 horas úteis.</span>
                                </section>
                            </>
                        ) : (
                            <section className={styles.resultInfo}>
                                <span className={styles.errorMessage}>{withdrawalResult.error?.message || 'Erro interno ao processar o saque.'}</span>
                                <p className={styles.resultInfoText} style={{ marginTop: '10px' }}>Não se preocupe, você não será debitado.</p>
                            </section>
                        )}

                        <button className={styles.backButton} onClick={handleClose}>
                            Voltar
                        </button>
                    </div>
                ) : (
                    <>
                        <div className={styles.header}>
                            <span className={styles.headerTitle}>Retirar fundos</span>
                            <p className={styles.headerSubtitle}>Saque seu saldo da sua conta.</p>
                        </div>
                        
                        <div className={styles.providers}>
                            <img className={styles.providerIcon} src={favicon} alt="Woovi" />
                            <img className={styles.pixIcon} src={pixImg} alt="Pix" />
                        </div>

                        <div className={styles.balance}>
                            <span className={styles.balanceLabel}>Saldo disponível</span>
                            <p className={styles.balanceAmount}>{formatCurrency(user?.balance || 0)}</p>
                        </div>
                    
                        
                        <input type="text" className={styles.amountInput} value={value} placeholder={placeholder} onChange={handleAmountChange}/>
                        <input type="text" className={styles.pixInput} value={pixKey} onChange={handlePixKeyChange} placeholder={`Informe a sua chave PIX ( ${pixKeyType} )`}/>
                        {error && <p className={styles.errorMessage}>{error}</p>}
                        
                        <div className={styles.pixSelector}>
                            <button className={`${styles.pixSelectorButton} ${pixKeyType === 'CPF' ? styles.active : ''}`} onClick={() => { setPixKeyType('CPF'); setPixKey(''); }}>CPF</button>
                            <button className={`${styles.pixSelectorButton} ${pixKeyType === 'Telefone' ? styles.active : ''}`} onClick={() => { setPixKeyType('Telefone'); setPixKey(''); }}>Celular</button>
                            <button className={`${styles.pixSelectorButton} ${pixKeyType === 'E-mail' ? styles.active : ''}`} onClick={() => { setPixKeyType('E-mail'); setPixKey(''); }}>E-mail</button>
                            <button className={`${styles.pixSelectorButton} ${pixKeyType === 'Aleatório' ? styles.active : ''}`} onClick={() => { setPixKeyType('Aleatório'); setPixKey(''); }}>Chave Aleatória</button>
                        </div>
                        <div className={styles.infoBox}>
                            <span>Atenção:</span>
                            <p>O CPF vinculado à chave PIX informada para saque precisa ser o mesmo registrado na sua conta!</p>
                        </div>
                        
                        <button className={styles.confirmButton} onClick={handleWithdrawal} disabled={loading}>
                            {loading ? <AiOutlineLoading3Quarters className={styles.spinner} /> : 'Solicitar Saque'}
                        </button>
                    </>
                )}
            </div>
        </section>
    );
}
