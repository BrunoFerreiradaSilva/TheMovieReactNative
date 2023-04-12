import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { imageUrl } from "../../../utils/Constants";
import styles from "../styles";


export default function ListSimilarComponent({ data, navigation }) {
    return <TouchableOpacity style={styles.buttonImage} onPress={() => navigation.navigate('Details', { paramKey: data.id })}>
        <View style={styles.viewImage}>
            <Image source={{ uri: imageUrl + data.poster_path }} style={styles.imageSimilarMovie} />
            <View style={styles.viewColun}>
                <Text style={styles.textTitle}>{data.title}</Text>
                <View style={styles.viewRow}>
                    <Text>Votos : </Text>
                    <Text>{data.vote_average}</Text>
                </View>
            </View>
        </View>

    </TouchableOpacity>
}