import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { Home, BarChart, Settings, ExitToApp, Money } from '@mui/icons-material';
import logo from '../../assets/logo.png';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}> <img src={logo} style={{"width": "16rem"}} alt="logo" /> </div>
      <div className={styles.moneySaved}>
        <p>R$ 2.000,00</p>
        <div className={styles.moneyText}>
          <Money/>
          <p>Economia</p>
        </div>
      </div>
      <ul className={styles.menu}>
        <li ><Link to="/dashboard"><Home /> Dashboard</Link></li>
        <li ><Link to="/academy"><BarChart /> Academy</Link></li>
        <li ><Link to="/questionnaires"><BarChart /> Questionários</Link></li>
        <li ><Link to="/action-plans"><BarChart /> Planos de Ação</Link></li>
        <li ><Link to="/reports"><BarChart /> Relatórios</Link></li>
        <li ><Link to="/settings"><Settings /> Configurações</Link></li>
        <li ><Link to="/logout"><ExitToApp /> Log Out</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
