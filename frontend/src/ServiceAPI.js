import axios from 'axios';

export const API_URL = 'http://localhost:8000';

export default class ServiceAPI{

    constructor(){}

    getItems() {
        const url = `${API_URL}/api/items/`;
        return axios.get(url).then(response => response.data);
    }
    getItemsByURL(link) {
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
}