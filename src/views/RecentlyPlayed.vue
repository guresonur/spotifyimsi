<template>
  <div class="cards-parent">
       <TrackCard v-for="track in recentTracks" v-bind:key="track"> </TrackCard>   
        
  </div>
</template>

<script>

import TrackCard from '@/components/TrackCard.vue'

export default {
    components: {
        TrackCard,
    } ,
    
    data () {
        return {
        recentTracks: ['Ekrem', 'Onur', 'Gures', 'Emel', 'Erdeniz', 'Taylan', 'Ozan', 'Galatasaray', 'Cimbom', 'Ekrem', 'Onur', 'Gures', 'Emel', 'Erdeniz', 'Taylan']
    }
    
},

}
</script>

<style scoped>



.cards-parent {
    margin: 10px;
}

</style>