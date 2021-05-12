<template>
  <div class="ViewArea">

    <div class="LeftPanel">

      <ul>
                        <li>
                          <router-link to="/recentlyplayed">
                          Home</router-link>
                </li>

                <li>
                  <router-link to="/search">
                  Search</router-link>
                </li>

                <li>
<router-link to="/library">Library</router-link>
                </li>
                
                <li>
<router-link to="/likedsongs">Liked Songs</router-link>
                </li>

                <li>
                  <router-link to="/statistics">Statistics</router-link>
                </li>
      </ul>
      
      </div>


    <div class="MainArea">
      <div><router-view /></div>
      </div>


  </div>
  </template>

<script>
export default {
  name: 'ViewArea'
}
</script>

    CustomText
<style scoped>

.ViewArea {
  display: flex;
}

.LeftPanel {
  display: flex;
  margin-left: 0;
  min-width: 25%;
  border-right: dashed;
  
}

.MainArea {
  display: flex;
}

.LeftPanel-Top {
  display: flex;
}

.LeftPanelBottom{
  display: flex;
}

li {
  list-style-type: none;
  display: flex;
  margin-bottom: 20px;
  border-radius: 0.25rem;
  align-content: center;
  padding: 5px;
}

ul {
  margin-left: 0;
}

a {
  margin-left: 0%;
  display: flex;
  color: black;
}

</style>