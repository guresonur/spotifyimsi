<template>
<header class="header">
<div class="container">  
          <div class="buttons">
              <button class="custom-button" @click="$router.back()">
          <svg id="bButton" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
</svg>
      </button>
      
          <button class="custom-button" @click="$router.forward()">
              <svg id="fButton" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>
</button>
</div>



<div class="right-menu">
    <button>Login</button>
<select class="profile">
    <option value="1">
    </option>
    <option value="2">
    </option>
</select>
</div>
      
      
  
  </div>
  </header>
</template>

<script>
export default {
    methods: {
        
    }
}
</script>

<style scoped> 

.container {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
}

.custom-button {
    margin-left: 5px;
}

.profile {
    display: flex;
}

.header {
    align-items: center;
}



.buttons{
    display: flex;
    
    margin-left: auto;
    margin-right: auto;

}

.right-menu {
    display: flex;
    
    margin-left: auto;
    margin-right: auto;
}

.header {
    border-top: 1px solid;
    border-bottom: 1px solid;
}

</style>