import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <h1>Dashboard, Set/24</h1>
      <div className={styles.user}>
        <span>Jonas Silva</span>
        <img src="/path/to/user/avatar.jpg" alt="User Avatar" />
      </div>
    </div>
  );
}

export default Header;
