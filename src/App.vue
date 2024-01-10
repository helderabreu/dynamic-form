<template>
  <nav>
    <router-link to="/edit">Edit</router-link> |
    <router-link to="/render">Render</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
@tailwind base;
@tailwind utilities;

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

.disabled {
  @apply text-gray-400;
}

button:disabled {
  @apply text-gray-200 cursor-not-allowed bg-white;

  &:hover {
    @apply bg-white;
  }
}

select,
input[type=text],
input[type=number] {
  @apply h-8 border-b border-gray-300 rounded-sm outline-0 mb-2;

  &:focus {
    @apply border-blue-500;
  }
}
</style>
