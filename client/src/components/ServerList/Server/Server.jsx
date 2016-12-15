import React from 'react';
import styles from './Server.css';

const Server = props => {
  return (
    <div className={styles['server-container']} onClick={props.click}>
      <h4 className={styles['name']}>{props.name}</h4>
      <p className={styles['url']}>{props.url}</p>
    </div>
  )
}

export default Server;
