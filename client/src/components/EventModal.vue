<template>
    

        <div class="modal fade" id="createEventModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
    <div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title text-dark" id="exampleModalLabel">Create Event</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body text-dark">
        <form @submit.prevent="createEvent()">
            <div class="mb-3">
    <label for="name" class="form-label" >Event Name</label>
    <input v-model="editable.name" type="text" required class="form-control" id="name" placeholder="Event Name..." >
    
</div>
<div class="mb-3">
    <label for="imageUrl" class="form-label">Event Image</label>
    <input v-model="editable.coverImg" type="url" required class="form-control" id="imgUrl" placeholder="Event Image Url...">
</div>
<div class="mb-3">
    <label for="description" class="form-label" >Event Description</label>
    <textarea v-model="editable.description" rows="3" type="text-area" required class="form-control" id="description" placeholder="Event Description..." ></textarea>
    
</div>
<div class="mb-3">
    <label for="date" class="form-label" >Event Date</label>
    <input v-model="editable.startDate" type="text" required class="form-control" id="name" placeholder="Event Date..." >
    
</div>
<div class="mb-3">
    <label for="capacity" class="form-label" >Capacity</label>
    <input v-model="editable.capacity" type="number" required class="form-control" id="capacity" placeholder="Event Capacity..." >
    
</div>
<div class="mb-3">
    <label for="location" class="form-label" >Location</label>
    <input v-model="editable.location" type="text" required class="form-control" id="location" placeholder="Event Location..." >
    
</div>
<div class="mb-3">
        <label class="me-2" for="cancelled">isCancelled</label>
        <input v-model="editable.isCancelled" type="checkbox" class="form-check-input" id="cancelled">
    </div>
<div class="mb-3">
    <label for="category" class="form-label">Category</label>
    <select v-model="editable.type" type="text" required class="form-select" id="category" placeholder="Event Category...">
    <option :value="category"
    v-for="category in categories" :key="category">
        {{ category }}
    </option>
    </select>
</div>

<button type="submit" class="btn btn-primary">Submit</button>
        </form>
    
    </div>
    <div class="modal-footer">
        <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button> -->
    </div>
    </div>
</div>
</div>

</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js';
import { Modal } from 'bootstrap';
import { router } from '../router.js';
import { useRouter } from 'vue-router';
export default {
    setup(){
        const editable = ref({});
        const categories = ["concert", "convention", "sport", "digital"];
        const router = useRouter()
    return { 
        editable,
        categories,
        async createEvent(){
            try {
                const eventData = editable.value
                const event = await eventsService.createEvent(eventData)
                Pop.success('Event Created!')
                editable.value = {}
                Modal.getOrCreateInstance("#createEventModal").hide()
                router.push({name: "Event", params: {eventId: event.id}})
            } catch (error) {
                logger.error(error)
                Pop.error(error)
            }
        }
     }
    }
};
</script>


<style lang="scss" scoped>

</style>