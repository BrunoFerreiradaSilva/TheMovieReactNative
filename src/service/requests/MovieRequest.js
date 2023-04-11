import api from "../Api";
import { API_KEY } from "../../utils/Constants";


export async function getMoviePopular(page) {
    const result = await api.get(`/movie/popular${API_KEY}&language=pt-BR&page=${page}`)
        .then(response => response.data)
        .catch('Error')

    return result
}

export async function getMovieDetails(movieId){
    const result = await api.get(`/movie/${movieId}${API_KEY}&language=pt-BR`)
    .then(response => response.data)
    .catch('Error')
    
    return result
}

export async function getSimilarMovie(movieId){
    const result = await api.get(`/movie/${movieId}/similar${API_KEY}&language=pt-BR`)
    .then(response => response.data)
    .catch('Error')
    
    return result
}