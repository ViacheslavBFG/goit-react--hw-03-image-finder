import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39557429-8ba8482dbf33dba1ac37e0e49';

const fetchPixabay = async (query, page) => {
    const {data} = await axios.get(`${BASE_URL}?&q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
    return data;
    }
    

export default fetchPixabay;