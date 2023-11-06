<template>
    <router-link :to="{name: 'Event', params: {eventId: eventProp.id}}">
    <div class="event-card">        
<img class="img-fluid" :src="eventProp.coverImg" alt="creator image">

<div>
<p class="fs-4 text-center event-name">{{ eventProp.name }}</p>
<p class="text-center">{{ eventProp.location}}</p>
</div>
    
    </div>
</router-link>
</template>


<script>

import { Event } from '../models/Event.js';
export default {
    props: {eventProp: {type: Event, required: true}},
    setup(){
    return {  }
    }
};
</script>


<style lang="scss" scoped>
img{
    border-radius: 7px;
    width: 20rem;
    height: 20rem;
    object-fit: cover;
;
}
.event-card{
    width: 21rem;
    border: 2px solid black;
    padding: 5px;
    border-radius: 7px;
  /* From https://css.glass */
background: rgba(187, 174, 174, 0.62);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(3.6px);
-webkit-backdrop-filter: blur(3.6px);
border: 1px solid rgba(30, 23, 23, 0.78);
}
p{
    color: black;
}
.event-name{
    font-family: 'Pinyon Script', cursive;
}
</style>