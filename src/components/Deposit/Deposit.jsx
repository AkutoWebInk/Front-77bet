// CSS
import styles from './Deposit.module.css';

// Functions
import { formatValue, formatCurrency } from '../../api/services/deposit';

// API calls
import { requestDeposit } from '../../api/services/deposit';

// Icons
import { IoCloseOutline } from "react-icons/io5";
import { IoCopyOutline } from "react-icons/io5";
import { useEffect, useState } from 'react';
import favicon from './assets/favicon.png';
import pixImg from './assets/pix.png';

export default function Deposit({ visible, onClose }) {
    
    const [placeholder] = useState('Valor');
    const [value, setValue] = useState('');
    const [depositResult, setDepositResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    // Deposit payload:
    const [payload, setPayload] = useState({
        amount: 0
    });


    // Component visibility:
    useEffect(() => {
        document.body.style.overflow = visible ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [visible]);
    if (!visible) return null;



    function handleChange(e) {
        const formatted = 'R$ '+ formatValue(e.target.value);
        setValue(formatted);

        const numeric = Number(formatted.replace(/\D/g, '')) / 100;
        setPayload(prev => ({...prev, amount: numeric }));
    }
    function selectValue(amount) {
        // Amount comes in as Reais (e.g., 50).
        // formatValue expects a string of cents (e.g., "5000" for R$ 50,00).
        const centsString = String(amount * 100); 
        setValue('R$ ' + formatValue(centsString));
        setPayload(prev => ({...prev, amount}));
    }
    function handleClose() {
        setDepositResult(null);
        setValue('');
        onClose();
    }

    async function handleDeposit() {
        setLoading(true);
        try {
            const response = await requestDeposit(payload);
            if (response) {
                setDepositResult(response);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    function handleCopy() {
        const text = depositResult?.data?.brCode;
        if (!text) return;

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text);
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
            } catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
            }
            document.body.removeChild(textArea);
        }
        
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }



    return (
        <section className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <button className={styles.closeButton} onClick={handleClose}>
                    <IoCloseOutline />
                </button>
                
                {depositResult ? (
                    <div className={styles.result}>
                        <div className={styles.header}>
                            <img className={styles.resultIcon} src={favicon} alt="Woovi" />
                            <span className={styles.headerTitle}>Pagamento Gerado!</span>
                            <p className={styles.headerSubtitle}>Escaneie o QR Code abaixo:</p>
                        </div>
                        <span className={styles.resultAmount}>R$ {formatValue(depositResult.data.amount)}</span>

                        <img src={depositResult.data.qrCode} className={styles.resultQrCode}/>

                        <span className={styles.resultText}>Detalhes da Transação</span>
                        <span className={styles.resultText}> 
                            Destinatário:
                             <br />
                            <span className={styles.resultSubtext}> 77bet LTDA </span> 
                        </span>   
                        <span className={styles.resultText}>
                            Identificador: 
                            <br />
                            <span className={styles.resultSubtext}> {depositResult.data.providerId} </span>    
                        </span>

                        <section className={styles.resultDetails}>
                            <div className={styles.resultCopy}>
                                <input readOnly type="text" className={styles.resultInput} value={depositResult.data.brCode} onClick={(e) => e.target.select()} />
                                <button className={`${styles.resultCopyButton} ${copied ? styles.copied : ''}`} onClick={handleCopy}>
                                    {copied ? 'Copiado!' : <IoCopyOutline />}
                                </button>
                            </div>
                            <span className={styles.resultInfo}>Copie o codigo do QR Code, abra o app do seu banco e pague via Pix Copia e Cola</span>
                        </section>
                    </div>
                ) : (
                    <>
                        <div className={styles.header}>
                            <span className={styles.headerTitle}>Depositar</span>
                            <p className={styles.headerSubtitle}>Adicione saldo à sua conta.</p>
                        </div>

                        <div className={styles.provider}>
                            <img className={styles.providerIcon} src={favicon} alt="Woovi" />
                            <span className={styles.providerLabel}>Woovi</span>
                        </div>

                        <div className={styles.details}>
                            <div className={styles.detailsBox}>
                                <p className={styles.detailsLabel}>Método de pagamento:</p>
                                <span className={styles.detailsValue}>Woovi</span>
                                <img className={styles.detailsIcon} src={pixImg} alt="Pix" />
                            </div>
                            <div className={styles.detailsBox}>
                                <p className={styles.detailsLabel}>Valor minimo:</p>
                                <span className={styles.detailsValue}>R$10,00</span>
                            </div>
                        </div>

                        <span className={styles.amount}>
                            Escolha ou digite o valor desejado:
                        </span>

                        <input type="text" className={styles.amountInput} value={value} placeholder={placeholder} onChange={handleChange}/>

                        <div className={styles.amountSelector}>
                            <button className={styles.amountButton} onClick={() => selectValue(50)}>R$ 50</button>
                            <button className={styles.amountButton} onClick={() => selectValue(100)}>R$ 100</button>
                            <button className={styles.amountButton} onClick={() => selectValue(150)}>R$ 150</button>
                            <button className={styles.amountButton} onClick={() => selectValue(250)}>R$ 250</button>
                            <button className={styles.amountButton} onClick={() => selectValue(500)}>R$ 500</button>
                            <button className={styles.amountButton} onClick={() => selectValue(1000)}>R$ 1.000</button>
                            <button className={styles.amountButton} onClick={() => selectValue(2000)}>R$ 2.000</button>
                            <button className={styles.amountButton} onClick={() => selectValue(5000)}>R$ 5.000</button>
                            <button className={styles.amountButton} onClick={() => selectValue(10000)}>R$ 10.000</button>
                        </div>

                        <button className={styles.confirmButton} onClick={handleDeposit} disabled={payload.amount < 10 || loading}>
                            {loading ? 'Gerando...' : 'Gerar PIX'}
                        </button>
                    </>
                )}
            </div>
        </section>
    );
}