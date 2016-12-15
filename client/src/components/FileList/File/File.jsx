import React from 'react';
import styles from './File.css';

const File = props => {
  return (
    <div className={styles['file']} onClick={() => props.play(props.path, props.ext)}>
      <p className={styles['name']}>Name: {props.name}{props.ext}</p>
      <p className={styles['play']}>Play this file!</p>
    </div>
  )
}

export default File;
