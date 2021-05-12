<template>
  <div class="card"> 
  <img class="card-img-top" :src="albumPhoto"  alt="Album image">
  <div class="card-body">
    <h5 class="card-title"> {{ artistName }} </h5>
    <p class="card-text"> {{ trackName }} </p>
    <a :href="artistLink" class="btn btn-primary">Go to artist</a>
  </div>
</div>
</template>

<script>
export default {
    name: 'TrackCard',
    data () {
      return  {
          //artistName: null,
          //trackName: null,
          //albumPhoto: 'https://i.scdn.co/image/ab67616d0000485183ea77a5d83c2fbdaa552f6b',
          //artistLink: 'https://open.spotify.com/artist/5QpQ8Zu2s3aMjYf88au1Le'
      }
    },
    props: ['artistName', 'trackName', 'albumPhoto', 'artistLink']
}
</script>

<style scoped>
.card {
    width: 20%;
    display: inline-flex;
    margin: 5px;
    min-width: 200px;
}
</style>