import modules from "modules";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    chatBackground: {
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: 100,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        flex: 1,
        marginRight: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    text: {
        color: 'black',
        textAlign: 'center'
    },
    messageContainer: {
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    messageText: {
        color: 'black',
        textAlign: 'left',
        paddingBottom: 20,
    },
    inputContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        padding: 10,
    },
    chat: {
        width: 20,
        height: 20,
        position: 'absolute',

    },
    date: {
        // right: 0,
        // bottom: 0,
        // position: 'absolute',
        fontSize: modules.SMALL,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
    },
    closeButton: {
        marginTop: 15,
        textAlign: 'center',
        fontSize: 18,
        color: 'blue',
    },
    oldMessage: {
        color: 'black',
        textAlign: 'left',
    },
    oldMessageContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,

    },
})