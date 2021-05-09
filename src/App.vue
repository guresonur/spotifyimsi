<template>
  <div id="app">
    <Header></Header>
    <Footer></Footer>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import Header from '../src/components/Header.vue'
import Footer from '../src/components/Footer.vue'

export default {

  name: 'App',
  components: {
    Header, Footer
  }

}
  
</script>

