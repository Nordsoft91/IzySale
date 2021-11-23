import axios from 'axios';

export const API_URL = 'http://localhost:8000';

export default class ServiceAPI{

    constructor(){}

    getItems() {
        const url = `${API_URL}/api/shop/items/`;
        return axios.get(url).then(
            response => response.data);
    }

    getItemsByURL(link) {
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }

    getCartList() {
        const url = `${API_URL}/api/shop/cart/admin`;
        return axios.get(url).then(response => response.data);
    }

    addToCart(itempk) {
        const url = `${API_URL}/api/shop/cart/admin/${itempk}`;
        return axios.put(url,'admin',itempk);
    } 

    removeFromCart(itempk) {
        const url = `${API_URL}/api/shop/cart/admin/${itempk}`;
        return axios.delete(url,'admin',itempk);
    } 

    searchByBarcode(barcode) {
        const url = `${API_URL}/api/shop/items/${barcode}`;
        return axios.get(url).then(response => response.data);
    }
}