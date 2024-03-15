import axios from 'axios';

const instance = axios.create({
    baseURL:'https://pokeapi.co/api/v2/pokemon',
    timeout:5000,
    headers:{
        'Content-Type': 'application/json'
    }
});

instance.interceptors.request.use((config) => {

    return config;
}, (error) => {
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error)
});


const API = {
    get<ParamsType,ResponseType>(endpoint: string, params?: ParamsType):Promise<ResponseType> {
        return instance.get<ParamsType,ResponseType>(endpoint, { params });
    }
}

export default API