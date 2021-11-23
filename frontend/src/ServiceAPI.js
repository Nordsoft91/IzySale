import axios from 'axios';
import axiosInstance from "./axiosAPI";

export const API_URL = 'http://localhost:8000';

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
        const url = `${API_URL}/api/shop/cart/admin`;
        return axiosInstance.get(url).then(response => response.data);
    }

    addToCart(itempk) {
        const url = `${API_URL}/api/shop/cart/admin/${itempk}`;
        return axiosInstance.put(url,'admin',itempk);
    } 

    removeFromCart(itempk) {
        const url = `${API_URL}/api/shop/cart/admin/${itempk}`;
        return axiosInstance.delete(url,'admin',itempk);
    } 

    searchByBarcode(barcode) {
        const url = `${API_URL}/api/shop/items/${barcode}`;
        return axiosInstance.get(url).then(response => response.data);
    }
}