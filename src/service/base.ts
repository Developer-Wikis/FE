import axios from 'axios';

const baseURL = `${process.env.BASE_URL}`;

const unauth = axios.create({ baseURL });

export { unauth };
