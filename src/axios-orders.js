// i dont want to create a global URL because for authentication i will need more URL but for the moment we can do that
import axios from 'axios'

const instance = axios.create({
    baseURL : 'https://react-burger-builder-39519.firebaseio.com/'
});

export default instance;