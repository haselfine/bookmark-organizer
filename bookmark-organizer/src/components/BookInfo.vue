<!--This component holds the book information in small cards
    When user clicks edit button, turns page number and priority list 
    items into form fields-->

<template>
    <div>
        <div class="col-sm">
            <v-card raised class="m-3">
                <div class="blue darken-4">
                    <v-card-title class="justify-center white--text"> <!--Title of book-->
                    {{ book.title }}
                    </v-card-title>
                    <v-card-subtitle class="justify-center white--text"> <!--Author of book-->
                        By {{book.author}}
                    </v-card-subtitle>
                    <span class="completion-status justify-center white--text" v-show="this.book.completed">Completed </span>
                    <img class="icon"
                        src="@/assets/checkmark.png"
                        v-show="this.book.completed"> <!--Checkmark icon and 'completed' text 
                                                            only display when page number equals total pages. Or when over 99.5%-->
                </div>
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation> <!--list items are held in v-form to allow for fields to 
                                            appear and have validation when user edits-->
                    <li class="list-group-item list-group-item-primary py-1">Priority</li>
                    <li class="list-group-item py-1" v-if="edit"><v-select v-model="bookPriority" class="align-center" :items="priorities" :rules="[v=> !!v || 'Priority is required']">   
                                                                    </v-select></li>
                    <li class="list-group-item py-1" v-else>{{ book.bookPriority }}</li> <!--Unless editing, show priority as normal-->
                    
                    <li class="list-group-item list-group-item-primary py-1">Current page</li>
                    <li class="list-group-item py-1" v-if="edit"><v-text-field v-model="pageNumber" class="justify-center" :rules="pageRules"></v-text-field></li>
                    <li class="list-group-item py-1" v-else>{{ book.pageNumber }}</li> <!--Unless editing, show page number as normal-->
                    
                    <li class="list-group-item list-group-item-primary py-1">Total pages: </li>
                    <li class="list-group-item py-1">{{ book.totalPages }}</li>
                    
                    <li class="list-group-item list-group-item-primary py-1">Percent completion:</li>
                    <li class="list-group-item py-1">{{ completion }}</li> <!--This is calculated rather than stored in database-->
                    
                    <div class="card-body justify-center">
                        <v-tooltip top> <!--When user hovers over edit icon, displays tooltip "edit"-->
                            <template v-slot:activator="{ on }">
                                <img class="icon" 
                                src="@/assets/edit.png"
                                dark v-on="on"
                                v-on:click="editBook()"> <!--set "edit" to true-->
                            </template>
                            <span>Edit</span>
                        </v-tooltip>
                        <span v-show="edit"> | </span> <!--display separator and other icons if editing, each with their own tooltip-->
                        <v-tooltip top>
                            <template v-slot:activator="{ on }">
                                <img class="icon"
                                    src="@/assets/delete.png"
                                    dark v-on="on"
                                    v-show="edit"
                                    v-on:click="deleteBook(book)"> <!--delete book from database-->
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
                                v-on:click="completeBook(book)"> <!--set current page number to total pages, display completion icon-->
                            </template>
                            <span>Complete</span>
                        </v-tooltip>

                        <div v-show="edit" class="save-cancel"> <!--set edit to false-->
                            <v-btn text class="secondary caption" 
                                @click="cancel(book)">
                                Cancel</v-btn>
                            <v-btn text class="primary caption"
                                @click="save(book)"
                                :disabled="!valid">Save</v-btn> <!--update database with new info on book (only with valid info)-->
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
            edit: false, //allows user to edit pageNumber/priority, complete, or delete book if true
            valid: true, //set by validate function. If rules broken, disables save

            priorities: [1,2,3,4,5],
            bookPriority: parseInt(this.book.bookPriority),
            pageNumber: this.book.pageNumber,
            pageRules: [
                v => !!v || 'Page number is required',
                v => (!isNaN(parseInt(v))|| 'Page number must be in digit form'),
                v => ((parseInt(v) <= this.book.totalPages) || 'Current page must be less than or equal to total pages') //can't have higher page than total pages
            ]
        }
    },
    computed:{
        completion: function(){ //calculates how far user is in book. If 100%, sets completion variable, which displays checkmark icon on card
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
            this.edit = false //turns off edit mode
        },
        deleteBook(book){ //delete book from database
            if (confirm(`Give up on ${book.title}? Are you sure?`)){
                this.$emit('delete-book', book)
            }
        },
        completeBook(book){ //set page number to total pages, display checkmark icon
            if(confirm(`Did you finish ${book.title}?`)){
                this.book.pageNumber = this.book.totalPages
                this.pageNumber = this.book.totalPages
                this.completion = '100%'
                this.edit = false
                this.$emit('edit-book', book)
            }
        },
        editBook(book){ //allow user to change pagenumber, priority. Displays complete, delete, cancel, and save buttons
            this.edit = true
        },
        save(book){
            if(this.$refs.form.validate()){ //check if rules are not broken
                if(confirm(`Are you sure you want to save?`)){ //save info
                    this.book.pageNumber = parseInt(this.pageNumber)
                    this.book.bookPriority = this.bookPriority
                    this.$emit('edit-book', book) //update data in database
                    this.edit = false //no longer in edit mode
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