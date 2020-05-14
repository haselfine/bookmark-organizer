import axios from 'axios'

const base_url = '/api/books'

export default{

    getAllBooks(){ //communicate with api -> retrieve list of books
        return axios.get(base_url).then( response => {
            return response.data
        })
    },

    addBook(book){ //add new book to api
        return axios.post(base_url, book).then( response => {
            return response.data
        })
    },

    updateBook(book){ //change data of existing book in api using id
        return axios.patch(`${base_url}/${book.id}`, book).then(response => {
            return response.data
        })
    },

    deleteBook(id){ //remove book from api using id
        return axios.delete(`${base_url}/${id}`).then(response => {
            return response.data
        })
    }
}