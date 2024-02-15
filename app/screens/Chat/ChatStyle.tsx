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
        padding: 15,
        margin: 10,
        borderRadius: 5,
    },
    messageText: {
        color: 'black',
        textAlign: 'left'
    },
    inputContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    chat: {
        width: 20,
        height: 20,
        position: 'absolute',

    },
    date: {
        right: 0,
        bottom: 0,
        position: 'absolute',
        alignSelf: 'flex-end',
        color: modules.WHITE,
        fontSize: modules.SMALL,
        margin: modules.BODY_HORIZONTAL_12 / 2,
    },
})