import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, FlatList, Image, TouchableOpacity } from "react-native";
import { getMovieDetails, getSimilarMovie } from "../../service/requests/MovieRequest";
import { imageUrl } from "../../utils/Constants";
import styles from "./styles";
import { MaterialIcons } from '@expo/vector-icons';
import { getMovie, removeMovie, saveMovie } from "../../database/Movies";

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

        console.log(movieForSave)
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


function ListSimilarComponent({ data, navigation }) {
    return <TouchableOpacity style={{ marginStart: 8, marginBottom: 8, }} onPress={() => navigation.navigate('Details', { paramKey: data.id })}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: imageUrl + data.poster_path }} style={styles.imageSimilarMovie} />
            <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontSize: 16, lineHeight: 26, marginEnd: 100 }}>{data.title}</Text>
                <View style={{ flexDirection: 'row', marginTop: 4 }}>
                    <Text>Votos : </Text>
                    <Text>{data.vote_average}</Text>
                </View>
            </View>
        </View>

    </TouchableOpacity>
}

function HeaderComponent({ movie, formatDate, productor, isFavorite, saveFavorite, removeFavorite, idFavorite }) {
    return <View>
        <View>

            <ImageBackground source={{ uri: movie.backdrop_path ? imageUrl + movie.backdrop_path : imageUrl + movie.poster_path }} style={styles.container} >
                <View style={styles.viewBackground}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.releseText}>{formatDate + " - "}</Text>
                        <Text style={styles.productorText}>{productor}</Text>
                    </View>
                    <Text style={styles.title}>{movie.title}</Text>

                </View>

            </ImageBackground>

        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.descriptionTitle}>Descrição</Text>
            <TouchableOpacity onPress={() => {
                isFavorite ? removeFavorite(idFavorite) : saveFavorite(movie)
            }}>
                <View style={{ alignItems: 'flex-end', alignContent: 'flex-end' }}>
                    {isFavorite ? <MaterialIcons name="favorite" size={24} color="red" /> : <MaterialIcons name="favorite-border" size={24} color="black" />}
                </View>
            </TouchableOpacity>
        </View>
        <Text style={styles.description}>{movie.overview}</Text>
        <Text style={styles.descriptionTitle}>Similar</Text>
    </View>
}