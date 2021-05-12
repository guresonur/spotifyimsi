<template>
  <div>
      <div class="liked-tracks">
        <TrackCard v-for="track in likedTracks" v-bind:key="track" 
            v-bind:artistName="track['artistName']" 
            v-bind:trackName="track['trackName']" 
            v-bind:albumPhoto="track['albumPhoto']" 
            v-bind:artistLink="track['artistLink']" 
            > </TrackCard>   
      </div>
  </div>
</template>

<script>
import TrackCard from '@/components/TrackCard.vue'

export default {
    components: {
        TrackCard
    },
    data() {
        return {
          tempArtistName : null,
          tempTrackName : null,
          tempAlbumPhoto : null ,
          tempArtistLink : null,
          likedTracks: []
              }
    },
    methods: {
      getLikedTracks() {
        fetch('https://api.spotify.com/v1/me/top/tracks?limit=5', {
          headers: {
            'Authorization': `Bearer ` + this.$store.state.payload
          }
        }).then(response => {
          return response.json()
        }).then(data => {
          for (let index = 0; index < 5; index++) {
            //console.log(data.items[index].artists[0].external_urls.spotify)
            
                this.tempArtistName = data.items[index].artists[0].name;
                this.tempTrackName = data.items[index].name;
                this.tempAlbumPhoto = data.items[index].album.images[2].url;
                this.tempArtistLink =  data.items[index].artists[0].external_urls.spotify;
            
            this.likedTracks.push({
              artistName : this.tempArtistName,
              trackName : this.tempTrackName,
              albumPhoto : this.tempAlbumPhoto,
              artistLink : this.tempArtistLink
            }); 
          }
          
        })
      }
    },
      mounted() {
        this.getLikedTracks()
      }
}
</script>

<style scoped>
.liked-tracks {
    border-bottom-style: dashed;
}
</style>