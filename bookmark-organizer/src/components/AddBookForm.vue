<!--This component allows the user to add a new book to their list, 
    containing the values of the title, author, current page number,
    total page numbers, priority-->

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
                    required>
                </v-text-field>

                <v-text-field 
                    v-model.trim="author"
                    :counter="20"
                    :rules="authorRules"
                    label="Author"
                    required>
                </v-text-field>

                <v-text-field 
                    v-model.trim="pageNumber"
                    :counter="5"
                    :rules="pageNumberRules"
                    label="Current Page Number"
                    required>
                </v-text-field>

                <v-text-field 
                    v-model.trim="totalPages"
                    :counter="5"
                    :rules="totalPagesRules"
                    label="Total Page Count"
                    required>
                </v-text-field>
                <v-select 
                    v-model="bookPriority"
                    label="Priority"
                    hint="Choose a priority. 1 = highest, 5 = lowest"
                    :items="priorities"
                    :rules="[v=> !!v || 'Priority is required']">

                </v-select>
                <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="validate"
                >
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
            valid: true,
            bookTitle: '',
            titleRules: [
                v => !!v || 'Title is required',
                v => (v && v.length <= 30) || 'Title must be less than 30 characters'
            ],
            author: '',
            authorRules: [
                v => !!v || 'Author is required',
                v => (v && v.length <= 20) || 'Author must be less than 20 characters'
            ],
            pageNumber: '',
            pageNumberRules: [
                v => !!v || 'Page number is required',
                v => (v && v.length <= 5) || 'Page number must be less than 5 characters',
                v => (!isNaN(parseInt(v))|| 'Page number must be in digit form')
            ],
            totalPages: '',
            totalPagesRules: [
                v => !!v || 'Total page count is required',
                v => (v && v.length <= 5) || 'Page number must be less than 5 characters',
                v => (!isNaN(parseInt(v))|| 'Page number must be in digit form')
            ],
            bookPriority: '',
            priorities: [1,2,3,4,5],
        }
    },
    methods: {
        validate(){
            if(this.$refs.form.validate()){
                let book = { title: this.bookTitle, author: this.author, pageNumber: parseInt(this.pageNumber), totalPages: parseInt(this.totalPages), bookPriority: parseInt(this.bookPriority), completed: false}
                this.$emit('book-added', book)
                this.$refs.form.reset()
            }
        }
    }
    
}
</script>

<style>

</style>