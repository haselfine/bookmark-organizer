<template>
    <div>
        <v-card class = "col-sm-7 m-1">
            
        </v-card>
    </div>    
</template>

<script>
export default {
    name: 'Chart',
    data(){
        return{
            baseUrl: 'https://image-charts.com/chart?',
            chartSize: 'chs=720x320',
            chartData: [],
            chartLabels: [],
            fullUrl: ''
        }
    },
    props: {
        Books: Array
    },
    watch: {
        Books: function(val){
            
        }
    }
    
}
</script>

<style>

</style>