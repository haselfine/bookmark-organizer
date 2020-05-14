<template>
  <v-app>
    <div class="jumbotron">Book Organizer</div>
    <div id="app">
        <v-row class="mx-9">
          <v-col class="mx-auto" cols="12" md="5">
            <AddBookForm v-on:book-added="bookAdded"></AddBookForm>
          </v-col>
          <v-col class="mx-auto" cols="12" md="5">
            <Chart v-bind:fullUrl="fullUrl"
                  v-bind:books="books"></Chart>
          </v-col>
        </v-row>
      <v-divider></v-divider>
        <div class="mx-9">
          <BookList class="mx-9" v-bind:books="books" 
            v-on:delete-book="bookDeleted"
            v-on:edit-book="bookEdited"></BookList>
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
      books: [],
      baseUrl: 'https://image-charts.com/chart?',
      chartColor: 'chco=3fc6dc',
      chartType: 'cht=bvs',
      chartSize: 'chs=480x480',
      chartData: [],
      chartLabels: [],
      fullUrl: '',
      yAxis: 'chxs=1N**%',
      xAxis: 'chxt=x%2Cy'
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
          
        this.updateChart()
      })
    },
    updateChart(){
      let counter = 0
      this.chartData = []
      this.chartLabels = []
      for(let book of this.books){
        if(counter < 20){
            let completion = Math.round((book.pageNumber/book.totalPages) * 100)
            if(counter === 0){
                this.chartData.push('chd=t:' + completion)
                this.chartLabels.push('chxl=0:|' + book.title)
                counter += 1
            } else {
                this.chartData.push(',' + completion)
                this.chartLabels.push('|' + book.title)
                counter += 1
            }
        } else {
            break
        }
      }
      this.fullUrl = this.baseUrl 
          + this.chartType
          + '&' + this.chartColor 
          + '&' + this.chartSize 
          + '&' + this.chartData.join('')
          + '&' + this.chartLabels.join('')
          + '&' + this.yAxis
          + '&' + this.xAxis
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
  font-size: 24pt;
  background-color: rgb(18, 43, 117) !important;
  color: white;
  text-align: center;
  font-size-adjust: inherit;
}

</style>
