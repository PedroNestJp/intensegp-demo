import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/authProvider'

export default function SignUp() {
    const { logout } = useAuth();
    return (
        <div style={{ 
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
         }}>
            <h1> Você já está logado </h1>
            <h2>
                <p>
                    Deseja fazer login com
                    <Link onClick={logout} to="/" style={{ color: "#f00" }}>
                        outra conta
                    </Link>
                    ou voltar para a
                    <Link to="/dashboard" style={{ color: "#f00" }}>
                        tela inicial
                    </Link>
                    ?
                </p>
            </h2>
        </div>
    )
}
