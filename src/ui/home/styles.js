import { StyleSheet,Dimensions } from "react-native";
const width = Dimensions.get('screen').width;

export default StyleSheet.create({
    container: {
        width:width/3.2,
        height:width/2,
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 4,
        marginVertical: 4,
        borderRadius: 20,
        resizeMode: 'stretch'
    },
    load:{
        padding:10
    }
})