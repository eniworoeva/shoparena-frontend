import axios from 'axios';
// Next we make an 'instance' of it
const instance = axios.create({
// .. where we make our configurations
    baseURL: 'https://oja-ecommerce.herokuapp.com/api/v1'
});

// Where you would set stuff like your 'Authorization' header, etc ...
if (localStorage.token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
}



export default instance;