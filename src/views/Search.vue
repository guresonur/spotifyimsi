<template>
  <div class="search-area">
    
    <div class="search-nav">
     <input v-model="query" type="text" placeholder="Search.." name="search">
     <button type="submit" @click="doSearch">Search</button>
</div>
<div class="search-results">
    <TrackCard v-for="track in searchResults" v-bind:key="track" 
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
        TrackCard,
    },
    data() {
        return  {
            query: null,
            searchResults: [],
            tempArtistName : null,
          tempTrackName : null,
          tempAlbumPhoto : null ,
          tempArtistLink : null,
        }
    },
    methods: {
        
        doSearch() {
        //    this.resetSearchResults()
            fetch('https://api.spotify.com/v1/search?q='+this.query+'&type=track&limit=50', {
                headers: {
                    'Authorization': `Bearer ` + this.$store.state.payload
                }
            }).then(response => {
               
                return response.json()
            }).then(data => {
                console.log(data)
                for (let index = 0; index < data.tracks.items.length; index++) {
            
            
                this.tempArtistName = data.tracks.items[index].artists[0].name;
                this.tempTrackName = data.tracks.items[index].name;
                this.tempAlbumPhoto = data.tracks.items[index].album.images[1].url;
                this.tempArtistLink =  data.tracks.items[index].artists[0].external_urls.spotify;
            
            this.searchResults.push({
              artistName : this.tempArtistName,
              trackName : this.tempTrackName,
              albumPhoto : this.tempAlbumPhoto,
              artistLink : this.tempArtistLink
            }); 
        }
            })
        },
        resetSearchResults() {
            this.searchResults = null;
        }
    }
}
</script>

<style scoped>

.search-area {
    width: 100%;
}


</style>