<template>
    <div class="container-fluid">
    
        <section class="row border-comment">
            <div class="col-2">
                    <img class="img-fluid rounded-circle" :title="commentProp.creator.name" :src="commentProp.creator.picture" alt="creator image">
            </div>
                <div class="col-8">
                    <p>{{ commentProp.body }}</p>
                    <p>Created At: {{ commentProp.createdAt }}</p>
                    <button  class="btn btn-light" @click="destroyComment()">Delete Comment</button>
                </div>
            
        </section>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Comment } from '../models/Comment.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { commentsService } from '../services/CommentsService.js';
import { useRoute, useRouter } from 'vue-router';

export default {
    props: {commentProp: {type: Comment, required: true}},
    setup(props){
        const route = useRoute();
        const router = useRouter()
    return { 
        comments: computed(()=> AppState.comments),
        async destroyComment(){
            try {
                const wantsToDelete = await Pop.confirm('are you sure you want to delete?')
                if(!wantsToDelete){
                    return
                }const commentId = props.commentProp.id
                await commentsService.destroyComment(commentId)
                // router.push({name: 'Comments'})
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
.border-comment{
    border: 2px solid black ;
    padding: 10px;
    border-radius: 10px;
   
}
</style>