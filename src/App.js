import React, { Component } from 'react';
import './App.css';

let defaultTextColor = '#fff';
let defaultStyle = {
  color: defaultTextColor,
};

let fakeServerData = {
  user: {
    name: 'Natália',
    playlists: [
      {
        name: 'My favorites',
        songs: [
          {
            name: 'Bla bla',
            duration: 12314,
          },
          {
            name: 'Bla bla2',
            duration: 243231,
          }
        ],
      },
      {
        name: 'My favorites2',
        songs: [
          {
            name: 'Bla bla3',
            duration: 123123,
          },
          {
            name: 'Bla bla4',
            duration: 2833,
          }
        ],
      },
      {
        name: 'My favorites3',
        songs: [
          {
            name: 'Bla bla4',
            duration: 123123,
          },
          {
            name: 'Bla bla5',
            duration: 2833,
          }
        ],
      },
      {
        name: 'My favorites4',
        songs: [
          {
            name: 'Bla bla6',
            duration: 12323,
          },
          {
            name: 'Bla bla7',
            duration: 28333,
          }
        ],
      },
    ]
  }
};
class PlaylistCounter extends Component {
  render() {
    const { playlists } = this.props;
    return(
      <div style={{ ...defaultStyle, width: '40%', display: 'inline-block' }}>
        <h2>{playlists.length} playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    const { playlists } = this.props;
    let allSongs = playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs);
    }, []);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration;
    }, 0);

    return (
      <div style={{ ...defaultStyle, width: '40%', display: 'inline-block' }}>
        <h2>{Math.round(totalDuration/60)} hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    const { onTextChange } = this.props;
    return(
      <div style={{ ...defaultStyle }}>
        <img src="" />
        <input type="text" onKeyUp={(event) => onTextChange(event.target.value)} />
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    const { playlist } = this.props
    return(
      <div style={{ ...defaultStyle, width: '25%', display: 'inline-block' }}>
        <img />
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song =>
            <li>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: '',
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        serverData: fakeServerData,
      });
    }, 1000);
    setTimeout(() => {
      this.setState({
        filterString: '',
      });
    }, 2000);
  }

  render() {
    const { serverData } = this.state;
    return (
      <div className="App">
        {
          serverData.user ?
          <div>
            <h1 style={{ ...defaultStyle, fontSize: '54px' }}>
              {serverData.user.name} Playlist
            </h1>
            <PlaylistCounter
              playlists={
                serverData.user &&
                serverData.user.playlists
              }
            />
            <HoursCounter
              playlists={
                serverData.user &&
                serverData.user.playlists
              }
            />
            <Filter onTextChange={text =>
              this.setState({ filterString: text })}
            />
            {serverData.user.playlists.filter(playlist =>
              playlist.name.toLowerCase().includes(
                this.state.filterString.toLowerCase()
              )).map((playlist) => {
                return <Playlist playlist={playlist} />
              }
            )}
          </div>
          :
          <h1 style={defaultStyle}>
            Loading...
          </h1>
        }
      </div>
    );
  }
}

export default App;
