import axios from 'axios';
import axiosInstance from "./axiosAPI";
import { API_URL } from './axiosAPI';

export default class ServiceAPI{

    constructor(){}

    getItems() {
        const url = `${API_URL}/api/shop/items/`;
        return axiosInstance.get(url).then(
            response => response.data);
    }

    getItemsByURL(link) {
        const url = `${API_URL}${link}`;
        return axiosInstance.get(url).then(response => response.data);
    }

    getCartList() {
        const url = `${API_URL}/api/shop/cart`;
        return axiosInstance.get(url).then(response => response.data);
    }

    addToCart(itempk) {
        const url = `${API_URL}/api/shop/cart/${itempk}`;
        return axiosInstance.put(url,itempk);
    } 

    removeFromCart(itempk) {
        const url = `${API_URL}/api/shop/cart/${itempk}`;
        return axiosInstance.delete(url,itempk);
    } 

    searchByBarcode(barcode) {
        const url = `${API_URL}/api/shop/items/${barcode}`;
        return axiosInstance.get(url).then(response => response.data);
    }
}