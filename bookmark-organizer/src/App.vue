<template>
  <v-app>
    <div class="jumbotron">Book Organizer</div>
    <div id="app">
        <v-row class="mx-9">
          <v-col class="mx-auto" cols="12" md="5">
            <AddBookForm v-on:book-added="bookAdded"></AddBookForm> <!--adds new books-->
          </v-col>
          <v-col class="mx-auto" cols="12" md="5">
            <Chart v-bind:fullUrl="fullUrl"
                  v-bind:books="books"></Chart> <!--displays book completion-->
          </v-col>
        </v-row>
      <v-divider></v-divider>
        <div class="mx-9">
          <BookList class="mx-9" v-bind:books="books"
            v-on:delete-book="bookDeleted"
            v-on:edit-book="bookEdited"></BookList> <!--holds books. Allows editing/deletion-->
        </div>
    </div>
  </v-app>
</template>

<script>
import AddBookForm from './components/AddBookForm.vue' //import necessary components
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
      books: [], //holds books for use within app
      baseUrl: 'https://image-charts.com/chart?', //base url for chart api
      chartColor: 'chco=3fc6dc',
      chartType: 'cht=bvs',
      chartSize: 'chs=480x480',
      chartData: [],
      chartLabels: [],
      fullUrl: '',
      yAxis: 'chxs=1N**%', //label for yAxis
      axesLabels: 'chxt=x%2Cy' //displays labels for x and y axes
    }
  },
  mounted(){
    this.updateBooks() //on start, get current list of books
  },
  methods: {
    bookAdded(book){ //add book to database through api
      this.$book_api.addBook(book).then( book => {
        this.updateBooks()
      }).catch(err => {
        let msg = err.response.data.join(', ')
        alert('Error adding book.\n' + msg)
      })
    },
    bookDeleted(book){ //remove book from database
      this.$book_api.deleteBook(book.id).then( () => {
        this.updateBooks()
      })
    },
    bookEdited(book){ //update info on one book, whether completed or just a new priority
      console.log('Book has been updated')
      this.$book_api.updateBook(book).then( () => {
        this.updateBooks()
      })
    },
    updateBooks(){ //updates list of books, then chart
      this.$book_api.getAllBooks().then( books => {
        this.books = books
          
        this.updateChart()
      })
    },
    updateChart(){ //set new url for image-charts.com api. This function could be in chart component, but works better here in my opinion
      let counter = 0
      let title = ''
      this.chartData = []
      this.chartLabels = []
      for(let book of this.books){ //iterate through list of books
        if(counter < 20){ //only display 20 (that might be too high)
            let completion = Math.round((book.pageNumber/book.totalPages) * 100) //calculate completion
            if(book.title.length > 12){ //shorten long titles for better display
              title = book.title.substring(0,12) + '...'
            } else { //otherwise keep same title
              title = book.title
            }

            if(counter === 0){ //on first book, push necessary codes for api alongside completion and title
                this.chartData.push('chd=t:' + completion)
                this.chartLabels.push('chxl=0:|' + title)
                counter += 1
            } else { //for rest of books, just separators and completion/title
                this.chartData.push(',' + completion)
                this.chartLabels.push('|' + title)
                counter += 1
            }
        } else {
            break //at 20 books, stop loop
        }
      } //concatenate url elements to complete url for chart image
      this.fullUrl = this.baseUrl 
          + this.chartType
          + '&' + this.chartColor 
          + '&' + this.chartSize 
          + '&' + this.chartData.join('')
          + '&' + this.chartLabels.join('')
          + '&' + this.yAxis
          + '&' + this.axesLabels
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
