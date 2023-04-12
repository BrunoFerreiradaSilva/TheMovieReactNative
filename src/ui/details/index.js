import React, { useEffect, useState } from "react";
import { FlatList} from "react-native";
import { getMovieDetails, getSimilarMovie } from "../../service/requests/MovieRequest";
import { getMovie, removeMovie, saveMovie } from "../../database/Movies";
import ListSimilarComponent from "./components/listComponent";
import HeaderComponent from "./components/headerComponent";


export default function Details({ route, navigation }) {
    const [movie, setMovie] = useState({})
    const [formatDate, setFormatDate] = useState('')
    const [productor, setProductor] = useState('')
    const [movieSimilar, setMovieSimilar] = useState({})
    const [isFavorite, setIsFavorite] = useState(false)
    const [idFavorite, setIdFavorite] = useState(0)

    useEffect(() => {
        
        const parent = navigation.getParent();
        parent.setOptions({
            tabBarVisible: false
        });
        verifyFavorite(route.params.paramKey)
        getDetails(route.params.paramKey)
        getSimilar(route.params.paramKey)

        listViewRef.scrollToOffset({ 
            offset: 0, 
            animated: true 
          }); 

        return () => {
            parent.setOptions({
                tabBarVisible: true
            });
        }
    }, [route.params.paramKey])

    async function verifyFavorite(id) {
        const result = await getMovie(id)
        setIsFavorite(false)
        if (result == 0) return null
        if (id === result[0].idMovie) {
            setIsFavorite(true)
            setIdFavorite(result[0].id)
        } else {
            setIsFavorite(false)
        }
    }

    async function getDetails(movieId) {
        const result = await getMovieDetails(movieId)
        setMovie(result)
        const date = result.release_date.split("-")[0]
        setFormatDate(date)
        const productor = result.production_companies[0]?.name
        setProductor(productor)
        verifyFavorite(movieId)
    }

    async function getSimilar(idSimilar) {
        const result = await getSimilarMovie(idSimilar)
        setMovieSimilar(result.results)
    }


    async function saveFavorite(movie) {
        const movieForSave = {
            idMovie: route.params.paramKey,
            poster: movie.poster_path
        }

        if (!isFavorite) {
            setIsFavorite(true)
            await saveMovie(movieForSave)
        }

    }

    async function removeFavorite(movie) {
        if (isFavorite) {
            setIsFavorite(false)
            await removeMovie(idFavorite)
        }
    }

    return (
        <FlatList
            data={movieSimilar}
            renderItem={({ item }) => <ListSimilarComponent data={item} navigation={navigation} />}
            keyExtractor={(item) => item.id}
            ref={(ref) => { 
                listViewRef = ref; 
              }} 
            ListHeaderComponent={<HeaderComponent movie={movie}
                formatDate={formatDate}
                productor={productor}
                isFavorite={isFavorite}
                saveFavorite={saveFavorite}
                removeFavorite={removeFavorite}
                idFavorite={idFavorite}
            />}
        />
    )
}