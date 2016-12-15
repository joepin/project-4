import React from 'react';
import { Link } from 'react-router';
import Server from './Server/Server.jsx';
import styles from './ServerList.css';

const ServerList = props => {
  const servers = props.servers.map((server, i) =>
    <Link to='/files' key={i} className={styles['server-link']}>
      <Server
        name={server.server_name}
        url={server.server_url}
        click={() => props.updateAppState('activeServer', server)}
      />
    </Link>
  );
  return (
    <div>
      <h2>Your Servers:</h2>
      {servers}
    </div>
  );
}

export default ServerList;
