<template>
    <div>
        <v-card raised v-show="hasUrl" class="chart m-2 p-5">
            <h4 class ="card-title">Book Completion</h4>
            <v-container fluid>
                <v-img v-bind:src="fullUrl" contain></v-img>
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
        fullUrl: function(newVal, oldVal){
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