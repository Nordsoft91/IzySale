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

    getStorageItems() {
        const url = `${API_URL}/api/shop/storage`;
        return axiosInstance.get(url).then(response => response.data);
    }

    addToStorage(itempk) {
        const url = `${API_URL}/api/shop/storage/${itempk}`;
        return axiosInstance.put(url,itempk);
    } 

    removeFromStorage(itempk) {
        const url = `${API_URL}/api/shop/storage/${itempk}`;
        return axiosInstance.delete(url,itempk);
    } 

    searchByBarcode(barcode) {
        const url = `${API_URL}/api/shop/items/${barcode}`;
        return axiosInstance.get(url).then(response => response.data);
    }
}