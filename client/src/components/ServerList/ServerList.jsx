import React from 'react';
import Server from './Server/Server.jsx';

const ServerList = props => {
  const servers = props.servers.map((server, i) =>
    <Server
      name={server.server_name}
      url={server.server_url}
      key={i}
    />);
  return (
    <div>
      <h2>Your Servers:</h2>
      {servers}
    </div>
  );
}

export default ServerList;
