<template>
<header class="header">
<div class="container"> 
    <div class="header-logo">
        <a href="/">
         <img src="@/assets/spotilogo.png" />
    </a>
        </div> 
          <div class="buttons">
              <button class="custom-button" @click="$router.back()">
          <svg id="bButton" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
</svg>
      </button>
      
          <button class="custom-button" @click="$router.forward()">
              <svg id="fButton" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>
</button>
</div>



<div class="right-menu">
     <b-button v-if="!loggedIn" variant="success" @click="login()">Login</b-button>  
<button v-if="loggedIn" class="btn dropdown-toggle" id="dropdownMenuButton" type="button" data-toggle="dropdown" style="color:white;">
          <b-img v-if="loggedIn" :src="profile_pic" rounded="circle" alt="Profile Pic" height="30px" width="30px" fluid></b-img>
          {{profile_name}}
          </button>
</div>
      
      
  
  </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
data() {
    return {
      client_id: '821e61dd7fda4f70a421c9fdba582349',
      scopes: 'user-read-playback-state user-library-read user-read-recently-played playlist-read-private',
      redirect_uri: 'https://spotifyimsi-ehgy1dgdo-guresonur.vercel.app/',
      me: null,
      current_track_name: null,
      payload: null,
      loggedIn: false,
      started: false,
      previousTrackName: null,
      tracksList: [],
      currentTrackList: [],
      profile_name: null,
      profile_pic: null,
      current_artist_name: null,
      genre: null,
      artist_id: null,
      today: null,
      genres: {},
    }
  },
  methods: {
    login() {
      let popup = window.open(`https://accounts.spotify.com/authorize?client_id=${this.client_id}&response_type=token&redirect_uri=${this.redirect_uri}&scope=${this.scopes}&show_dialog=true`, 'Login with Spotify', 'width=800,height=600');

      window.spotifyCallback = (payload) => {
        this.loggedIn = true;
        this.payload = payload;
        popup.close()
        this.$store.state.payload = this.payload;
        fetch('https://api.spotify.com/v1/me', {
          headers: {
            'Authorization': `Bearer ${payload}`
          }
        }).then(response => {

          return response.json()

        }).then(data => {
          this.profile_pic = data.images[0].url
          this.profile_name = data.id
          this.me = data
        })
        }
        },
        startFrom (arr, idx) {
      return arr.slice(idx)
    },
        startFollowing () {
            this.started = true;

            setInterval(() => {
              if(this.started) {
              this.currentTrack();
              if (this.current_track_name != null && this.current_track_name != this.previousTrackName) {
              this.currentTrackList.push(this.current_track_name)
              if (this.current_track_name in this.tracksList) {
                  this.tracksList[this.current_track_name] += 1
              } else {
                  this.tracksList[this.current_track_name] = 1
              }
              if(this.genre != null) {
              if (this.genre in this.genres) {
                this.genres[this.genre] += 1
              }  else {
                this.genres[this.genre] = 1
              }
              }


              }
              }
            }, 1000);

        },
        currentTrack () {
        fetch('https://api.spotify.com/v1/me/player', {
          headers: {
            'Authorization': `Bearer ` + this.payload
          }
        }).then(response => {
          return response.json()
        }).then(data => {
            this.previousTrackName = this.current_track_name;
            this.current_track_name = data.item.name + ' - '
            if (data.item.artists.length>1) {
            data.item.artists.forEach(artist => {
              if (data.item.artists[data.item.artists.length-1]==artist) {
                  this.current_track_name += artist.name
              }
              else {
              this.current_track_name += artist.name + ', ';
              }
            });
            } else {
              this.current_track_name += data.item.artists[0].name
            }
            this.artist_id = data.item.artists[0].id

        })
        fetch('https://api.spotify.com/v1/artists/'+this.artist_id,  {
          headers: {
            'Authorization': `Bearer ` + this.payload
          }
        })
            .then(response => {
              return response.json()
            })
            .then(data => {
              this.genre = data.genres[0]
            })
        },
        stopFollowing () {
            this.started = false;
        },
    },
    mounted() {
    this.token = window.location.hash.substr(1).split('&')[0].split("=")[1]
    
    if (this.token) {
      window.opener.spotifyCallback(this.token)
      
    }
  } ,
}
</script>

<style scoped> 

.container {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: #121212;
}

.custom-button {
    margin-left: 5px;
        
  border-radius: 0.25rem;
  align-content: center;
  color: black;
}

.profile {
    display: flex;
  border-radius: 0.25rem;
  align-content: center;
  color: white;
}

.header {
    align-items: center;
}



.buttons{
    display: flex;
    
    margin-left: auto;
    margin-right: auto;
    color: black;


}

.right-menu {
    display: flex;
    
    margin-left: auto;
    margin-right: auto;
}

.header {
   
}

.header-logo {
    display: flex;
    
    margin-left: 0%;
    margin-right: auto;
}

</style>
