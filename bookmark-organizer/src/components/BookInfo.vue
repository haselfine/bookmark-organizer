<template>
    <div>
        <div class="col-sm">
            <v-card class="raised m-3">
                <div class="blue darken-4">
                    <v-card-title class="justify-center white--text">
                    {{ book.title }}
                    </v-card-title>
                    <v-card-subtitle class="justify-center white--text">
                        By {{book.author}}
                    </v-card-subtitle>
                    <span class="completion-status justify-center white--text" v-show="this.book.completed">Completed </span>
                    <img class="icon"
                        src="@/assets/checkmark.png"
                        v-show="this.book.completed">
                </div>
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation>
                    <li class="list-group-item list-group-item-primary py-1">Priority</li>
                    <li class="list-group-item py-1" v-if="edit"><v-select v-model="bookPriority" class="align-center" :items="priorities" :rules="[v=> !!v || 'Priority is required']">   
                                                                    </v-select></li>
                    <li class="list-group-item py-1" v-else>{{ book.bookPriority }}</li>
                    
                    <li class="list-group-item list-group-item-primary py-1">Current page</li>
                    <li class="list-group-item py-1" v-if="edit"><v-text-field v-model="pageNumber" class="justify-center" :rules="pageRules"></v-text-field></li>
                    <li class="list-group-item py-1" v-else>{{ book.pageNumber }}</li>
                    
                    <li class="list-group-item list-group-item-primary py-1">Total pages: </li>
                    <li class="list-group-item py-1">{{ book.totalPages }}</li>
                    
                    <li class="list-group-item list-group-item-primary py-1">Percent completion:</li>
                    <li class="list-group-item py-1">{{ completion }}</li>
                    
                    <div class="card-body justify-center">
                        <v-tooltip top>
                            <template v-slot:activator="{ on }">
                                <img class="icon" 
                                src="@/assets/edit.png"
                                dark v-on="on"
                                v-on:click="editBook()">
                            </template>
                            <span>Edit</span>
                        </v-tooltip>
                        <span v-show="edit"> | </span>
                        <v-tooltip top>
                            <template v-slot:activator="{ on }">
                                <img class="icon"
                                    src="@/assets/delete.png"
                                    dark v-on="on"
                                    v-show="edit"
                                    v-on:click="deleteBook(book)">
                            </template>
                            <span>Delete</span>
                        </v-tooltip>
                        <span v-show="edit"> | </span>
                        <v-tooltip top>
                            <template v-slot:activator="{ on }">
                                <img class="icon"
                                src="@/assets/checkmark.png"
                                v-show="edit"
                                dark v-on="on"
                                v-on:click="completeBook(book)">
                            </template>
                            <span>Complete</span>
                        </v-tooltip>

                        <div v-show="edit" class="save-cancel">
                            <v-btn text class="secondary caption" 
                                @click="cancel(book)">
                                Cancel</v-btn>
                            <v-btn text class="primary caption"
                                @click="save(book)"
                                :disabled="!valid">Save</v-btn>
                        </div>
                    </div>
                </v-form>
                
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BookInfo',
    props: {
        book: Object
    },
    data(){
        return{
            edit: false,
            valid: true,

            priorities: [1,2,3,4,5],
            bookPriority: parseInt(this.book.bookPriority),
            pageNumber: this.book.pageNumber,
            pageRules: [
                v => !!v || 'Page number is required',
                v => (!isNaN(parseInt(v))|| 'Page number must be in digit form'),
                v => ((parseInt(v) <= this.book.totalPages) || 'Current page must be less than or equal to total pages')
            ]
        }
    },
    computed:{
        completion: function(){
            let completion = Math.round((this.book.pageNumber / this.book.totalPages) * 100) + '%'
            if(completion === '100%'){
                this.book.completed = true
                this.book.pageNumber = this.book.totalPages
            } else {
                this.book.completed = false
            }
            return completion
        },
    },
    methods: {
        cancel(){
            this.edit = false
        },
        deleteBook(book){
            if (confirm(`Give up on ${book.title}? Are you sure?`)){
                this.$emit('delete-book', book)
            }
        },
        completeBook(book){
            if(confirm(`Did you finish ${book.title}?`)){
                this.book.pageNumber = this.book.totalPages
                this.pageNumber = this.book.totalPages
                this.completion = '100%'
                this.edit = false
                this.$emit('edit-book', book)
            }
        },
        editBook(book){
            this.edit = true
        },
        save(book){
            if(this.$refs.form.validate()){
                if(confirm(`Are you sure you want to save?`)){
                    this.book.pageNumber = parseInt(this.pageNumber)
                    this.book.bookPriority = this.bookPriority
                    this.$emit('edit-book', book)
                    this.edit = false
                }
            }
        }
    }
}
</script>

<style>
    .icon{
        height: 24px;
        margin-bottom: 8px;
    }

    .completion-status{
        font-size: small
    }
</style>