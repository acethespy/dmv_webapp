import React, {Component} from 'react'
import './SidebarComponent.css'

class Sidebar extends Component {

	updateCurrentSong = (i) => {
		this.props.updateCurrentSong(i)
	}
	render() {
		var songOptions = [];
		for(let i = 0; i < this.props.songs.length; i++) {
			let val = this.props.songs[i]
			songOptions.push(<SidebarOption key={i} value={val} update={() => this.props.updateCurrentSong(i)} selected={this.props.currentSongId==i} />)
		}
		return (
			<div className='sidebar'>
				<div className='sidebar-songs'>
					{songOptions}
				</div>
				<div className='sidebar-controls'>
					<SidebarControls
						playing={this.props.playing}	
						handlePlayPause={this.props.handlePlayPause}
						played={this.props.played}
						handleSeekMouseDown={this.props.handleSeekMouseDown}
						handleSeekChange={this.props.handleSeekChange}
						handleSeekMouseUp={this.props.handleSeekMouseUp}
					/>
				</div>
			</div>
		)
	}
}

class SidebarControls extends Component {
	render() {
		return (
			<div>
				<button onClick={this.props.handlePlayPause}>{this.props.playing ? 'Pause' : 'Play'}</button>
				<input
					type='range' min={0} max={0.99999} step='any'
					value={this.props.played}
					onMouseDown={this.props.handleSeekMouseDown}
					onChange={this.props.handleSeekChange}
					onMouseUp={this.props.handleSeekMouseUp}
				/>
			</div>

		)
	}
}

class SidebarOption extends Component {
	render() {
		return (
			<div className={`sidebar-option ${this.props.selected ? "selected" :""}`} onClick={this.props.update} >
				{this.props.value}
			</div>
		);
	}
}

export default Sidebar