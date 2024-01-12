<template>
  <nav>
    <router-link to="/edit">Edit</router-link> |
    <router-link to="/render">Render</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    @apply text-black;

    &.router-link-exact-active {
      @apply text-blue-500;
    }
  }
}
</style>
