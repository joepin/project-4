import React, { Component } from 'react';
import File from './File/File.jsx';
// import MediaPlayer from './MediaPlayer/MediaPlayer.jsx';
// import styles from './FileList.css';

class FileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      url: this.props.activeServer.server_url,
      audioSrc: '',
      videoSrc: '',
      src: '',
    }
  }

  componentDidMount() {
    const url = this.props.activeServer.server_url;
    if (url) {
      fetch(`${url}/files`, {
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        method: 'GET',
      })
      .then(r => r.json())
      .then(files => this.setState({ files: files }))
      .catch(err => console.log(err));
      this.setState({ url: url });
    }
  }

  startStream(path, extension) {
    const audioExts = /^.*\.(mp3|MP3|wav|WAV)$/;
    const videoExts = /^.*\.(mp4|MP4|mov|MOV|mpg|MPG|mpeg|MPEG|avi|AVI)$/;
    const fullPath = `${this.state.url}/stream?path=${path}`;
    if (audioExts.test(extension)) this.setState({ 'audioSrc': fullPath, src: fullPath });
    if (videoExts.test(extension)) this.setState({ 'videoSrc': fullPath, src: fullPath });
  }

  render() {
    const filesComps = this.state.files.map((file, i) =>
      <File
        key={i}
        name={file.name}
        path={file.path}
        ext={file.extension}
        play={this.startStream.bind(this)}
      />
    );
    return(
      <div>
        <h2>Files List</h2>
        {filesComps}
        <audio autoPlay controls src={this.state.audioSrc}></audio>
        <video autoPlay controls src={this.state.videoSrc}></video>
      </div>
    )
  }
}

export default FileList;
        // <MediaPlayer src={this.state.src} />
