<template>

  <div class="footer">

    <div class="albumPhoto">
      <img :src="album_photo"  alt="Album image">
      <!--<CustomText tag='h1' > {{ this.album_photo }} </CustomText>-->
    </div>

    <div class="listening">  
<CustomText tag='h1'> {{ this.current_track_name}} </CustomText>
</div>

<div class="buttons">

<b-button v-if="!started" variant="success" @click="startFollowing">Start Following</b-button>
<b-button v-else variant="success" @click="stopFollowing">Stop Following</b-button>

</div>


  </div>
</template>

<script>

import CustomText from '@/components/CustomText.vue'

export default {
  name: 'Footer',
  data() {
    return {
       current_track_name: null,
       album_photo: null,
       temp_album_photo: null,
       started: null,
       
      me: null,
      previousTrackName: null,
      tracksList: [],
      currentTrackList: [],
      current_artist_name: null,
      genre: null,
      genres: {},
    }
  },
  components: {
    CustomText
  },
  methods: {
     currentTrack () {
        fetch('https://api.spotify.com/v1/me/player', {
          headers: {
            'Authorization': `Bearer ` + this.$store.state.payload
          }
        }).then(response => {
          return response.json()
        }).then(data => {
            this.temp_album_photo = data.item.album.images[2].url
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
            'Authorization': `Bearer ` + this.$store.state.payload
          }
        })
            .then(response => {
              return response.json()
            })
            .then(data => {
              this.genre = data.genres[0]
            })
        },
        startFollowing () {
            this.started = true;

            setInterval(() => {
              if(this.started) {
              this.currentTrack();
              if (this.current_track_name != null && this.current_track_name != this.previousTrackName) {
              this.album_photo = this.temp_album_photo
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
              
              this.$store.state.genres = this.genres;
              }
              }
            }, 1000);

        },
        stopFollowing () {
          this.started = false;
        }
  },
  mounted() {
    this.started = false;
  }
  
}
</script>

<style scoped>

.footer {
  position: fixed;
  align-items: center;
  bottom: 0;
  width: 100%;
  background-color: white;
  color: white;
  text-align: center;
  height: 10%;
  display: flex;
  background-color: #121212;
}

.albumPhoto {
  margin-left: auto;
    margin-right: auto;
  display: flex;
}

.buttons {
  display: flex;
  margin-left: auto;
    margin-right: auto;
    align-items: center;
}

.listening {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  
}

</style>