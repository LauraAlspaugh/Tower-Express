<template>
  <div class="container body-card">
    <section class="row">
      <div class="col-12 text-center p-3">
        <p class=" together-title">Coming Together. One Event at a Time.</p>
      </div>
    </section>
    <section class="row my-5" id="">
      <div class=" md-12 col-md-12" v-if="!isMobile">
        <div class="d-flex rounded-pill justify-content-around">
          <button class="btn btn-outline-dark w-100 mx-3" @click="changeCategory('')">All</button>
        <button class="btn btn-outline-dark  w-100 mx-3"
        @click="changeCategory(category)"
        v-for="category in categories" :key="category"
        >
{{category }}
        </button> 
      </div>
      </div>
      <div class="dropdown" v-else>
<button class="dropdown-toggle" data-bs-toggle="dropdown" role="button"  aria-expanded="false"> Dropdown</button>
<ul class="dropdown-menu" >
  <li @click="changeCategory('')" class="dropdown-item">All</li>
  <li @click="changeCategory(category)" v-for="category in categories" :key="category" class="dropdown-item">{{category}}</li>
</ul>
      </div>
    </section>
    <section class="row">
      <div v-for="event in events" :key="event.id" class="col-12 col-md-4 p-4">
        <EventCard :eventProp="event"/>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js';
import { AppState } from '../AppState.js';
import EventCard from '../components/EventCard.vue';

export default {
    setup() {
      const categories = ["concert", "convention", "sport", "digital"];
      const filteredCategory = ref("");
        onMounted(() => {
            getEvents();
        });
        async function getEvents() {
            try {
                await eventsService.getEvents();
            }
            catch (error) {
                logger.error(error);
                Pop.error(error);
            }
        }
        return {
          categories,
          filteredCategory,
            // events: computed(() => AppState.events),
            isMobile: computed(()=>{
              let isMobile = false
              if(window.innerWidth < 768){
                isMobile = true
            }
            return isMobile
          }),
            events: computed(()=> {
if(filteredCategory.value){
  return AppState.events.filter((event) => event.type == filteredCategory.value);

}else {
  return AppState.events
}
            }),
            changeCategory(category){
logger.log(category)
filteredCategory.value = category
            }
        };
    },
    components: { EventCard }
}
</script>

<style scoped lang="scss">
.together-title{
  font-family: 'Great Vibes', cursive;
  font-size: 60px;
}
.body-card{
 
  
// background-size: cover;
// background-repeat: no-repeat;
// background-position: center;


}
</style>
