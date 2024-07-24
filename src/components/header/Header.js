import React from 'react';
import styles from './Header.module.css';
import { auth } from '../../services/firebase';

const Header = () => {
  return (
    <div className={styles.header}>
      <h1>Dashboard, Set/24</h1>
      <div className={styles.user}>
        <span>{ auth.currentUser?.email }</span>
        <img src={auth.currentUser?.photoURL} alt="profile" />
      </div>
    </div>
  );
}

export default Header;
