import React from 'react';
import styles from './Server.css';

const Server = props => {
  return (
    <div className={styles['server-container']}>
      <h4>{props.name}</h4>
      <p>{props.url}</p>
    </div>
  )
}

export default Server;
