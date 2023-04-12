import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get('screen').width;
export default StyleSheet.create({
    container: {
        width: width,
        height: width,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        lineHeight: 34,
        color: '#FFF',
        width: '100%',
        textAlign: 'left',
        paddingStart: 10,

    },
    releseText: {
        paddingStart: 10,
        color: '#FFF'
    },
    productorText: {
        paddingStart: 2,
        color: '#FFF'
    },
    viewBackground: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        textAlign: 'justify',
        marginTop: 300,
    },
    descriptionTitle: {
        fontSize: 18,
        lineHeight: 24,
        marginStart: 8,
        fontWeight: 'bold',
        marginTop: 8,
        marginEnd: width/1.47
    },
    description: {
        margin: 8,
        textAlign:'justify'
    },
    imageSimilarMovie: {
        width: 70,
        height: 70,
        marginHorizontal: 4,
        marginVertical: 4,
        borderRadius: 6,
        resizeMode: 'stretch'
    },
    buttonImage: { marginStart: 8, marginBottom: 8, },
    viewImage: { flexDirection: 'row', alignItems: 'center' },
    viewColun: { flexDirection: 'column' },
    textTitle: { fontSize: 16, lineHeight: 26, marginEnd: 100 },
    viewRow: { flexDirection: 'row', marginTop: 4 },
    viewRowCenter:{ flexDirection: 'row', alignItems: 'center' },
    viewAling: { alignItems: 'flex-end', alignContent: 'flex-end' }
})