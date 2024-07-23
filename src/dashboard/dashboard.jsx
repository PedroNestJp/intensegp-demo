import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <p>
                Voltar para a
                <Link to="/login" style={{ color: "#f00" }}>
                    Login
                </Link>
            </p>
        </div>
    );
};

