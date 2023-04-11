import React, { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { imageUrl } from "../../utils/Constants";
import { getAllMovies } from "../../database/Movies";

export default function Favorites({ navigation }) {
    const [data, setData] = useState([])
    
    const numColumns = 3

    useEffect(() => {
       getAllFavorites()
    }, [data])

    async function getAllFavorites(){
        const result = await getAllMovies()
        setData(result)
    }

    return <FlatList
        data={data}
        numColumns={numColumns}
        renderItem={({ item }) => 
        <ListComponent item={item} navigation={navigation}/>}
        keyExtractor={(item) => item.id}
    />
}

function ListComponent({item, navigation}){
    return <TouchableOpacity onPress={() => navigation.navigate('Details', { paramKey: item.idMovie })}>
                <Image source={{ uri: `${imageUrl}${item.poster}` }}
                    style={[styles.container]} />
            </TouchableOpacity>
}