<template>
  <div>
      <CustomText tag='h1'>This is Library</CustomText>
      <CustomText tag='h1'> {{ this.$store.state.token }} </CustomText>
      <button @click="increase">increase</button>
  </div>
</template>

<script>

import CustomText from '@/components/CustomText.vue'


export default {
    components: {
        CustomText
    },
    
    methods:  {
        increase: function () {
            this.$store.state.token ++ ;
        }
    }
       
    }
</script>

<style scoped>

</style>