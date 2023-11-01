<template>
    <div class="container-fluid">
        <section class="row">
            <div class="col-4">
                <img :src="eventProp.coverImg" :alt="eventProp.name">
            </div>
            <div class="col-6">
               <p>{{ eventProp.name }}</p>
               <p>{{ eventProp.description }}</p>
            </div>
        </section>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Event } from '../models/Event.js';

export default {
    props: {eventProp: {type: Event, required: true}},
    setup(){
    return {  }
    }
};
</script>


<style lang="scss" scoped>

</style>