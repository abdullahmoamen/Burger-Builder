import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-b616b-default-rtdb.firebaseio.com/'
});

export default instance;