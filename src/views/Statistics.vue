<template>
  <div class="statistics"> 
      <ul class="list-group" v-if="genres" > 
      <li class="list-group-item" v-for="(count,genre) in genres" v-bind:key="genre"> You have listened {{count}} {{genre}} songs  </li>
      </ul>
  </div>
</template>

<script>

export default {
    name: 'Statistics',
    data () {
        return {
            genres: this.$store.state.genres,
        }
    }
}
</script>

<style scoped>
.statistics {

}
</style>