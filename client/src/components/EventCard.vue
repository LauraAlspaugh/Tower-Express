<template>
    <router-link :to="{name: 'Event', params: {eventId: eventProp.creator.id}}">
    <div class="event-card">        
<img class="img-fluid" :src="eventProp.coverImg" :alt="eventProp.name">

<div>
<p class="fs-3 text-center">{{ eventProp.name }}</p>
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
    border-radius: 2px;
}
.event-card{
    border: 2px solid black;
    padding: 5px;
}
</style>