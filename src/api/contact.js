import axios from 'axios'

export default axios.create({
     baseURL:'http://localhost:3006',
    // baseURL:'https://curd-example-1d6ec-default-rtdb.firebaseio.com'
})