<template>
    <div>
        <v-card raised v-if="hasUrl" class="chart m-2 p-5">
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
        fullUrl: String
    },
    watch: {
        fullUrl: function(newVal, oldVal){
            console.log(newVal, oldVal)
            this.hasUrl=true
        }
    }
    
}
</script>

<style>
.chart{
    text-align: center;
}
</style>