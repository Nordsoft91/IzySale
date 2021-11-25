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

    getStorageItems(storageName) {
        const url = `${API_URL}/api/shop/storage/${storageName}`;
        return axiosInstance.get(url, storageName).then(response => response.data);
    }

    addToStorage(storageName, itempk) {
        const url = `${API_URL}/api/shop/storage/${storageName}/${itempk}`;
        return axiosInstance.put(url, storageName, itempk);
    } 

    removeFromStorage(storageName, itempk) {
        const url = `${API_URL}/api/shop/storage/${storageName}/${itempk}`;
        return axiosInstance.delete(url, storageName, itempk);
    } 

    searchByBarcode(barcode) {
        const url = `${API_URL}/api/shop/items/${barcode}`;
        return axiosInstance.get(url).then(response => response.data);
    }
}