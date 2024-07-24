import React from 'react';
import styles from './Questionnaire.module.css';

const Questionnaire = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Questionário</h2>
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.socialIcon}`}></div>
          <span>Social</span>
        </div>
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
