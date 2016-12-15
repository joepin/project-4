import React from 'react';

const File = props => {
  return (
    <div>
      <p>Name: {props.name}{props.ext}</p>
      <p onClick={() => props.play(props.path, props.ext)}>Play this file!</p>
    </div>
  )
}

export default File;
