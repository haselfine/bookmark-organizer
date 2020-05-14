import axios from 'axios'

const base_url = '/api/books'

export default{

    getAllBooks(){
        return axios.get(base_url).then( response => {
            return response.data
        })
    },

    addBook(book){
        return axios.post(base_url, book).then( response => {
            return response.data
        })
    },

    updateBook(book){
        return axios.patch(`${base_url}/${book.id}`, book).then(response => {
            return response.data
        })
    },

    deleteBook(id){
        return axios.delete(`${base_url}/${id}`).then(response => {
            return response.data
        })
    }
}