<!--This component allows the user to add a new book to their list, 
    containing the values of the title, author, current page number,
    total page numbers, priority
    
    You'll notice that I'm using vuetify, which helps add functionality
    to the app. This is especially nice with validation rules-->

<template>
    <div>
        <v-card raised> 

            <v-form ref="form" v-model="valid" lazy-validation class="card book-form p-5">
                <h4 class="card-title">Add your books!</h4>

                <v-text-field 
                    v-model.trim="bookTitle"
                    :counter="30"
                    :rules="titleRules"
                    label="Title"
                    required> <!--trim white space from title, 
                                    title can only be 30 chars
                                    rules defined below-->
                </v-text-field>

                <v-text-field 
                    v-model.trim="author"
                    :counter="20"
                    :rules="authorRules"
                    label="Author"
                    required> <!--same as title with slight variations-->
                </v-text-field>

                <v-text-field 
                    v-model.trim="pageNumber"
                    :counter="5"
                    :rules="pageNumberRules"
                    label="Current Page Number"
                    required><!--same as title with slight variations-->
                </v-text-field>

                <v-text-field 
                    v-model.trim="totalPages"
                    :counter="5"
                    :rules="totalPagesRules"
                    label="Total Page Count"
                    required><!--same as title with slight variations-->
                </v-text-field>
                <v-select 
                    v-model="bookPriority"
                    label="Priority"
                    hint="Choose a priority. 1 = highest, 5 = lowest"
                    :items="priorities"
                    :rules="[v=> !!v || 'Priority is required']"><!--select field is required-->

                </v-select>
                <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="validate"
                ><!--valid variable must be true for button to be enabled-->
                    Add Book
                </v-btn>
            </v-form>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'AddBookForm',
    data(){
        return{
            valid: true, //validate function automatically sets valid to false if field element rules are broken
            bookTitle: '',
            titleRules: [
                v => !!v || 'Title is required', //requires at least one character
                v => (v && v.length <= 30) || 'Title must be less than 30 characters' //max of 30 chars
            ],
            author: '',
            authorRules: [
                v => !!v || 'Author is required', //same as title with variation
                v => (v && v.length <= 20) || 'Author must be less than 20 characters'
            ],
            pageNumber: '',
            pageNumberRules: [
                v => !!v || 'Page number is required',
                v => (v && v.length <= 5) || 'Page number must be less than 5 characters',
                v => (!isNaN(parseInt(v))|| 'Page number must be in digit form') //requires digits for pageNumber
            ],
            totalPages: '',
            totalPagesRules: [
                v => !!v || 'Total page count is required',
                v => (v && v.length <= 5) || 'Page number must be less than 5 characters',
                v => (!isNaN(parseInt(v))|| 'Page number must be in digit form') //same as pageNumber
            ],
            bookPriority: '',
            priorities: [1,2,3,4,5] //user must choose a number between 1 (highest priority) and 5 (lowest)
        }
    },
    methods: {
        validate(){
            if(this.$refs.form.validate()){
                //create book object
                let book = { title: this.bookTitle, author: this.author, pageNumber: parseInt(this.pageNumber), totalPages: parseInt(this.totalPages), bookPriority: parseInt(this.bookPriority), completed: false}
                //send to App.vue
                this.$emit('book-added', book)
                //reset fields and validation warnings
                this.$refs.form.reset()
            }
        }
    }
    
}
</script>

<style>

</style>