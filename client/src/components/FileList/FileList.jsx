import React, { Component } from 'react';
import { Link } from 'react-router';
import File from './File/File.jsx';
import styles from './FileList.css';

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
      <div className={styles['wrapper']}>
        <nav className={styles['nav']}>
          <h2>List of Files on {this.props.activeServer.server_name}</h2>
          <Link to='/profile' className={styles['profile']}>Profile</Link>
        </nav>
        <div className={styles['main-container']}>
          <div className={styles['files-list']}>
            {filesComps}
          </div>
          <video className={styles['player']} autoPlay controls src={this.state.videoSrc}></video>
          <audio className={styles['player']} autoPlay controls src={this.state.audioSrc}></audio>
        </div>
      </div>
    )
  }
}

export default FileList;
