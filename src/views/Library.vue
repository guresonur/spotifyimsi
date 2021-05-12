<template>
  <div>
      <div class="playlists">
        <TrackCard v-for="playlist in playlists" v-bind:key="playlist" 
            v-bind:artistName="playlist['playlistName']" 
            v-bind:trackName="playlist['playlistCreatedBy']" 
            v-bind:albumPhoto="playlist['playlistPhoto']" 
            v-bind:artistLink="playlist['playlistLink']" 
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
    data () {
        return {
            playlists: [],
            tempPlaylistPhoto: null,
            tempPlaylistName: null,
            tempPlaylistCreatedBy: null,
            tempPlaylistLink: null

        }
    },
    methods:  {
        getPlaylists() {
            fetch('https://api.spotify.com/v1/me/playlists?limit=10', {
                headers: {
                    'Authorization': `Bearer ` + this.$store.state.payload
                }
            }).then(response => {
                return response.json()

            }).then (data => {
                console.log(data)
                for (let index = 0; index < 10; index++) {
                this.tempPlaylistPhoto = data.items[index].images[0].url;
                this.tempPlaylistName = data.items[index].name;
                this.tempPlaylistCreatedBy = data.items[index].owner.display_name;
                this.tempPlaylistLink =  data.items[index].external_urls.spotify;
            
            this.playlists.push({
              playlistPhoto : this.tempPlaylistPhoto,
              playlistName : this.tempPlaylistName,
              playlistCreatedBy : this.tempPlaylistCreatedBy,
              playlistLink : this.tempPlaylistLink
            }); 
          }
            })
        }
    },
      mounted () {
          this.getPlaylists()
      } 
    }
</script>

<style scoped>


.saved {
    border-style: dashed;
}


</style>