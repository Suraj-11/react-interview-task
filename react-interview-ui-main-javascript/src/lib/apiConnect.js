import axios from 'axios'

const BASE_URL = 'http://backend:9000'

export const fetchAllWidgets = () => axios.get(`${BASE_URL}/v1/widgets`).then((response) => response.data);

export const addWidget = (newWidget) => axios.post(`${BASE_URL}/v1/widgets`, newWidget).then((response) => response.data);

export const updateWidget = (updatedWidget) => axios.put(`${BASE_URL}/v1/widgets`, updatedWidget).then((response) => response.data);

export const deleteWidget = (widgetName) => axios.delete(`${BASE_URL}/v1/widgets?widget=${widgetName}`).then((response) => response.data);
