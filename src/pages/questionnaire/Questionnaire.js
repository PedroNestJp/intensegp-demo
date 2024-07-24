import React from 'react';
import styles from '../questionnaire/Questionnaire.module.css';
import { Link } from 'react-router-dom';
import { assignmentIcon, logo } from '../../assets/img';

const Questionnaire = () => {
  return (
    <div className={styles.container}>
      <img src={logo} style={{"width": "16rem"}} alt="logo" />
      <div className={styles.title}>
        <img src={assignmentIcon} style={{"width": "2rem"}} alt="Assignment Icon" />
        <h1>Questionário</h1>
      </div>
      <div className={styles.cards}>
        <Link to="/quiz" >
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.socialIcon}`}></div>
            <span>Social</span>
          </div>
        </Link>
        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.environmentIcon}`}></div>
          <span>Meio Ambiente</span>
        </div>
        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.governanceIcon}`}></div>
          <span>Governança</span>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
