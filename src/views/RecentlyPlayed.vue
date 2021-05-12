<template>
  
  <div class="cards-parent">
        <div class="welcome">
            <CustomText tag='h1' size='large' v-if="hour<12"> Good Morning </CustomText>
            <CustomText tag='h1' size='large' v-if="hour>=12 && hour<18"> Good Afternoon </CustomText>
            <CustomText tag='h1' size='large' v-if="hour>=18"> Good Evening </CustomText>
            <CustomText tag='h1' size='normal'>Recently played tracks</CustomText>

        </div>
       <div class="recent-tracks">
           <TrackCard v-for="track in recentTracks" v-bind:key="track" 
            v-bind:artistName="track['artistName']" 
            v-bind:trackName="track['trackName']" 
            v-bind:albumPhoto="track['albumPhoto']" 
            v-bind:artistLink="track['artistLink']" 
            > </TrackCard>  
           </div>   
        
  </div>
</template>

<script>

import CustomText from '@/components/CustomText.vue'
import TrackCard from '@/components/TrackCard.vue'

export default {
    components: {
        TrackCard, CustomText
    } ,
    methods: {
        getRecentlyPlayed() {
            fetch('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
                headers:{
                    'Authorization': `Bearer ` + this.$store.state.payload
                }    
            }).then(response => {
                return response.json()
            }).then(data => {
                for (let index = 0; index < 10; index++) {
            //console.log(data.items[index].artists[0].external_urls.spotify)
            
                this.tempArtistName = data.items[index].track.artists[0].name;
                this.tempTrackName = data.items[index].track.name;
                this.tempAlbumPhoto = data.items[index].track.album.images[1].url;
                this.tempArtistLink =  data.items[index].track.artists[0].external_urls.spotify;
            
            this.recentTracks.push({
              artistName : this.tempArtistName,
              trackName : this.tempTrackName,
              albumPhoto : this.tempAlbumPhoto,
              artistLink : this.tempArtistLink
            }); 
        }
            })
      }
    },
    
    data () {
        return {
        recentTracks: [],
        welcomeMessage: null,
        hour: null,
        tempArtistName : null,
          tempTrackName : null,
          tempAlbumPhoto : null ,
          tempArtistLink : null,
          likedTracks: []
    }
    
},
mounted() {
    this.hour = new Date().getHours();
    this.getRecentlyPlayed()
}
}
</script>

<style scoped>



.cards-parent {
    margin: 10px;
}

.welcome {
    border-style: dashed;
}


</style>