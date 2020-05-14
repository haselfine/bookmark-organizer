<template>
  <v-app>
    <div class = "jumbotron">Book Organizer</div>
    <div id="app">
      <div>
        <AddBookForm v-on:book-added = "bookAdded"></AddBookForm>
        <Chart></Chart>
      </div>
      <v-divider></v-divider>
      <div>
        <BookList v-bind:books = "books" 
          v-on:delete-book = "bookDeleted"
          v-on:edit-book = "bookEdited"></BookList>
      </div>
    </div>
  </v-app>
</template>

<script>
import AddBookForm from './components/AddBookForm.vue'
import BookList from './components/BookList.vue'
import Chart from './components/Chart.vue'

export default {
  name: 'App',
  components: {
    AddBookForm,
    BookList,
    Chart
  },
  data(){
    return{
      books: []
    }
  },
  mounted(){
    this.updateBooks()
  },
  methods: {
    bookAdded(book){
      this.$book_api.addBook(book).then( book => {
        this.updateBooks()
      }).catch(err => {
        let msg = err.response.data.join(', ')
        alert('Error adding book.\n' + msg)
      })
    },
    bookDeleted(book){
      this.$book_api.deleteBook(book.id).then( () => {
        this.updateBooks()
      })
    },
    bookEdited(book){
      console.log('Book has been updated')
      this.$book_api.updateBook(book).then( () => {
        this.updateBooks()
      })
    },
    updateBooks(){
      this.$book_api.getAllBooks().then( books => {
          this.books = books
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.jumbotron{
  height:40px;
  padding: 5em inherit;
  font-size: 24pt;
  background-color: rgb(80, 155, 201) !important;
  color: white;
  text-align: center;
  font-size-adjust: inherit;
}

</style>
