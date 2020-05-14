<!--Utilizes image-charts.com API to display percentage of completion of books-->

<template>
    <div>
        <v-card raised v-show="hasUrl" class="chart m-2 p-5"> <!--Only displays if books list has at least one entry-->
            <h4 class ="card-title">Book Completion</h4>
            <v-container fluid>
                <v-img v-bind:src="fullUrl" contain></v-img><!--bind url to image for display-->
            </v-container>
        </v-card>
    </div>    
</template>

<script>
export default {
    name: 'Chart',
    data(){
        return{
            hasUrl: false
        }
    },
    props: {
        fullUrl: String,
        books: Array
    },
    watch: {
        fullUrl: function(newVal, oldVal){ //this used to check the fullUrl variable for data, but that didn't work, so now it checks books array
            this.hasUrl = false
            if(this.books.length > 0){
                this.hasUrl = true
            } else {
                this.hasUrl = false
            }
        }
    }
    
}
</script>

<style>
.chart{
    text-align: center;
}
</style>