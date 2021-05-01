import logo from './logo.svg';
import './App.css';
import React, {Component} from "react";

import Sidebar from "./components/SidebarComponent"

import ReactPlayer from "react-player"

var SONGS = [
  "AnotherLife",
  "Bangarang",
  "BrokenOnes",
  "ChildrenOfAMiracle",
  "CrashingIllenium",
  "EaseYourMind",
  "FirstTimeSevenLions",
  "GhostsNStuff",
  "GoldStupidLove",
  "Gorgeous",
  "HeatWaves",
  "HoldOn",
  "Hunter",
  "ItAintMe",
  "IWannaKnow",
  "KuagaLostTime",
  "KyotoSkrillex",
  "LightSH",
  "Moments",
  "MoreThanYouKnow",
  "OnMyWayDTRemix",
  "PaperThin",
  "PretenderAoki",
  "Sacrificial",
  "SaveTheWorld",
  "Shelter",
  "SomeoneElse",
  "Stargazing",
  "Strobe",
  "TheBusinessTiesto",
  "TheOcean",
  "WaitAnotherDay",
  "WakeUpExcisionSK",
  ]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: SONGS,
      currentSongId: 0,
      url: `https://deepmusicvisualizer.s3.amazonaws.com/songs/${SONGS[0]}_128_50epochs_essentia.mp4`,
      playing: true,
      played: 0,
      duration: 0,
      seeking: false,
    };
  }

  updateCurrentSong = (id) => {
    this.setState({
      currentSongId: id,
      played: 0,
      duration: 0,
      url: `https://deepmusicvisualizer.s3.amazonaws.com/songs/${SONGS[0]}_128_50epochs_essentia.mp4`
    });
  }

  handlePlayPause = () => {
    this.setState({
      playing: !this.state.playing
    });
  }

  handleSeekMouseDown = e => {
    this.setState({seeking: true});
  }

  handleSeekChange = e => {
    this.setState({played: parseFloat(e.target.value)});
  }

  handleSeekMouseUp = e => {
    this.setState({seeking: false});
    this.player.seekTo(parseFloat(e.target.value));
  }

  handleProgress = state => {
    if (!this.state.seeking) {
      this.setState(state);
    }
  }

  handleDuration = (duration) => {
    this.setState({duration})
  }

  getNextSongId = () => {
    let i = this.state.currentSongId
    return (i + 1) % this.state.songs.length
  }

  onEnded = () => {
    this.updateCurrentSong(this.getNextSongId())
  }

  ref = player => {
    this.player = player
  }

  render() {
    return (
      <div className="App-flex" >
        <Sidebar
          songs={this.state.songs}
          currentSongId={this.state.currentSongId}
          updateCurrentSong={this.updateCurrentSong}
          playing={this.state.playing}
          played={this.state.played}
          handlePlayPause={this.handlePlayPause}
          handleSeekMouseDown={this.handleSeekMouseDown}
          handleSeekChange={this.handleSeekChange}
          handleSeekMouseUp={this.handleSeekMouseUp}
        />
        {/*<Video song={this.state.songs[this.state.currentSongId]} />*/}
        <ReactPlayer
          ref = {this.ref}
          url = {`https://deepmusicvisualizer.s3.amazonaws.com/songs/${this.state.songs[this.state.currentSongId]}_128_50epochs_essentia.mp4`}
          playing={this.state.playing}
          onProgress={this.handleProgress}
          onDuration={this.handleDuration}
          onEnded={this.onEnded}
          width='720px'
          height='720px'
        />
      </div>
    );
  }
}

export default App