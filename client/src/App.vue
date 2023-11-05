<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer class="bg-dark text-light">
    @ copyright 2023 Laura Alspaugh.
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}
body{
  background-image: url("https://images.unsplash.com/photo-1543872980-37426d31e10a?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OXw5NTIyMTk4fHxlbnwwfHx8fHw%3D");
  background-size: cover;
  background-attachment: fixed;
  color: black;
}



footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
