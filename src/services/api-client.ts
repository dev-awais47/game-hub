import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: 'e653c12be7924bed8ee129907a331f63'
    }
});