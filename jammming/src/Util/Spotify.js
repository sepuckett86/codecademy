var client_id = '64c11b00e3f648ff8f68fda5600209d1'; // Your client id
var client_secret = 'CLIENT_SECRET'; // Your secret
var redirect_uri = 'http://localhost:3000/'; // Your redirect uri

let accessToken = false;
let expiresIn = false;
const Spotify = {
  getAccessToken() {
    const url = window.location.href;
    if (accessToken) {
      return accessToken;
    }
    if (url.match(/access_token=([^&]*)/) != null &&
    url.match(/expires_in=([^&]*)/) != null) {
        let token = url.match(/access_token=([^&]*)/);
        token = token[0];
        accessToken = token.substring(13, token.length)
        let expirationTime = url.match(/expires_in=([^&]*)/);
        expirationTime = expirationTime[0];
        expiresIn = expirationTime.substring(11, expirationTime.length);
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
      } else {
        window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`
      }
  },

  search(term) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        headers: {Authorization: `Bearer ${accessToken}`}
      }).then(response => {
      return response.json();
    }).then(jsonResponse => {
    if (jsonResponse.tracks) {
      return jsonResponse.tracks.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    }
  });
  }
}



export default Spotify;
