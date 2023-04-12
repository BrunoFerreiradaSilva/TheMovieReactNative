import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { imageUrl } from "../../../utils/Constants";
import styles from "../styles";
import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-simple-toast'

export default function HeaderComponent({ movie, formatDate, productor, isFavorite, saveFavorite, removeFavorite, idFavorite }) {
    
    function favriteSuccess(movie){
        saveFavorite(movie)
        Toast.show("Favoritado com sucesso", Toast.SHORT)
    }

    function removeFavoriteSuccess(movieId){
        removeFavorite(movieId)
        Toast.show("Removido com sucesso", Toast.SHORT)
    }
    
    return <View>
        <View>
            <ImageBackground source={{ uri: movie.backdrop_path ? imageUrl + movie.backdrop_path : imageUrl + movie.poster_path }} style={styles.container} >
                <View style={styles.viewBackground}>
                    <View style={styles.viewRow}>
                        <Text style={styles.releseText}>{formatDate + " - "}</Text>
                        <Text style={styles.productorText}>{productor}</Text>
                    </View>
                    <Text style={styles.title}>{movie.title}</Text>

                </View>

            </ImageBackground>
        </View>
        <View style={styles.viewRowCenter}>
            <Text style={styles.descriptionTitle}>Descrição</Text>
            <TouchableOpacity onPress={() => {
                isFavorite ? removeFavoriteSuccess(idFavorite) : favriteSuccess(movie)
            }}>
                <View style={styles.viewAling}>
                    {isFavorite ? <MaterialIcons name="favorite" size={24} color="red" /> : <MaterialIcons name="favorite-border" size={24} color="black" />}
                </View>
            </TouchableOpacity>
        </View>
        <Text style={styles.description}>{movie.overview}</Text>
        <Text style={styles.descriptionTitle}>Similar</Text>
    </View>
}