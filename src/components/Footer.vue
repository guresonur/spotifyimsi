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
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16" style="margin-left: 5px;">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
</svg>


      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-stop-circle" viewBox="0 0 16 16" style="margin-left: 5px;">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3z"/>
</svg>

<b-button v-if="!started" variant="success" @click="startFollowing">Start</b-button>
<b-button v-else variant="success" @click="stopFollowing">Stop</b-button>

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
              console.log(this.genres)
              console.log(this.tracksList)


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
  color: black;
  text-align: center;
  height: 10%;
  border-top: dashed;
  display: flex;
  
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
    border-style: dashed ;
    align-items: center;
}

.listening {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  
}

</style>