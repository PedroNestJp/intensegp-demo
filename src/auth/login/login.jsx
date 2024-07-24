import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authProvider";
import styles from "./login.module.css";
import themes from "../../themes/themes.module.css";
import logo from "../../assets/logo.png";
import { FcGoogle } from "react-icons/fc";
import "../../App.css";
import Dashboard from "../../pages/dashboard/dashboard";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { signup, logout, loginWithPopup, user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signup(email, password);
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    async function loginWithGoogle(event) {
        event.preventDefault();
        try {
            await loginWithPopup();
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
            {user ? (
                <Dashboard />
            ) : (
                <div className={styles.mainContainer}>
                    <div className={styles.container}>
                        <img src={logo} alt="logo" className={styles.logo} />
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={themes.title}>
                                <h1>Login</h1>
                            </div>
                            {error && (
                                <div style={{ color: "red" }}>
                                    Os dados fornecidos não estão corretos ou você ainda não tem um cadastro na plataforma.
                                </div>
                            )}
                            <div className={styles.inputs}>
                                <div className={styles.inputContainer}>
                                    <input
                                        placeholder=" "
                                        value={email}
                                        className={styles.inputField}
                                        onChange={(event) => setEmail(event.target.value)}
                                        autoComplete="email"
                                        aria-label="Digite seu E-mail Corporativo ou CNPJ"
                                        required
                                    />
                                    <label htmlFor="email" className={styles.inputLabel}>
                                        E-mail Corporativo ou CNPJ
                                    </label>
                                </div>
                                <div className={styles.inputContainer}>
                                    <input
                                        placeholder=" "
                                        type="password"
                                        className={styles.inputField}
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        autoComplete="current-password"
                                        aria-label="Digite sua senha"
                                        required
                                    />
                                    <label htmlFor="password" className={styles.inputLabel}>
                                        Senha
                                    </label>
                                </div>
                            </div>
                            <button onClick={handleSubmit} type="submit">
                                Entrar
                            </button>
                        </form>
                        <span className={styles.forgotPassword}>Esqueceu a senha?</span>
                        <span className={styles.lineLogin}></span>
                        <p className={styles.textLoginSocial}>
                            Quero acessar minha conta com Google
                        </p>
                        <button onClick={loginWithGoogle} className={styles.btnGoogle}>
                            <FcGoogle className={styles.iconGoogle} />
                            <p className={styles.textBtnGoogle}>Continuar com o Google</p>
                        </button>
                        <div className={styles.loginOrLine}>
                            <span className={styles.line}></span>
                            <span className={styles.textOr}>ou</span>
                            <span className={styles.line}></span>
                        </div>
                        <p>
                            Ainda não tem uma conta?
                        </p>
                        <Link to="/signup">
                            <button >Cadastre-se</button>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
