<template>
    <div>
        <div class="row">
            <BookInfo
                v-for="book in books" v-bind:key ="book.title"
                v-bind:book="book"
                v-on:delete-book="bookDeleted"
                v-on:edit-book="bookEdited">
            </BookInfo>
        </div>
    </div>
</template>

<script>
import BookInfo from '@/components/BookInfo.vue'
export default {
    name: 'BookList',
    components: { BookInfo },
    data(){
        return{
            errors: []
        }
    },
    props: {
        books: Array
    },
    methods: {
        bookDeleted(book){
            this.$emit('delete-book', book)
        },
        bookEdited(book){
            this.$emit('edit-book', book)
        }
    }
}
</script>

<style>

    .ul{
        list-style-type: none;
    }

</style>