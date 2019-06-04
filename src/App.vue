<template>
  <div id="app">
    <Ribbon text="Under arbeid" color="#FAF200" position='left-top'	/>
    <NavBar></NavBar>
    <div id="main" role="main">
      <div style="padding:10px"></div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Ribbon from 'vue-ribbon';
import { NavBar } from '@/components'
export default {
  components: {
    NavBar,
    Ribbon,
  }
}
</script>

<style lang="scss">
body {
  overflow-y: scroll
}
#app {
  min-height: 300px;
  font-family:  Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nprogress .bar {
  background: white !important;
  height: 3px !important;
}

#nprogress .peg {
  box-shadow: 0 0 10px white, 0 0 5px white !important;
}

#nprogress .spinner-icon {
  border-top-color: white !important;
  border-left-color: white !important;
}
/*
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}*/
</style>
