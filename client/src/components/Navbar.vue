<template>
  <nav class="navbar navbar-expand-lg navbar-color px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center fs-1">
        <i class="mdi mdi-leaf"><span class="gather-title">Gather</span></i>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <!-- <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
            About
          </router-link>  -->
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
      <EventModal/>
    </div>
  </nav>
</template>

<script>
import EventModal from './EventModal.vue';
import Login from './Login.vue';
export default {
  setup() {
    return {}
  },
  components: { Login, EventModal }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.gather-title{
  font-family: 'Calligraffitti', cursive;
}

@media screen and (min-width: 768px) {
  nav {
    height: 79px;
  }
}
.navbar-color{
  background-color: #545e43;
}
</style>
