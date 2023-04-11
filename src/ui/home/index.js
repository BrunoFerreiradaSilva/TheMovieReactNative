import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from "react-native";
import { getMoviePopular } from "../../service/requests/MovieRequest";
import styles from "./styles";
import { imageUrl } from "../../utils/Constants";

export default function Home({ navigation }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    
    const numColumns = 3

    useEffect(() => {
        getAllPopularMovie()
    }, [])

    async function getAllPopularMovie() {
        if(loading) return;

        setLoading(true)

        const result = await getMoviePopular(page)
        const dataResult = result.results

        setData([...data, ...dataResult])
        setPage(page+1)
        setLoading(false)
    }


    return <FlatList
        data={data}
        numColumns={numColumns}
        renderItem={({ item }) => 
        <ListComponent item={item} navigation={navigation}/>}
        onEndReached={getAllPopularMovie}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<FooterComponent load={loading}/>}
        keyExtractor={(item) => item.id}
    />
}

function ListComponent({item, navigation}){
    return <TouchableOpacity onPress={() => navigation.navigate('Details', { paramKey: item.id })}>
                <Image source={{ uri: `${imageUrl}${item.poster_path}` }}
                    style={[styles.container]} />
            </TouchableOpacity>
}

function FooterComponent ({load}){
    if(!load) return null;
    return(
        <View style={styles.load}>
            <ActivityIndicator size={25} color={'#121212'}/>
        </View>
    )
}