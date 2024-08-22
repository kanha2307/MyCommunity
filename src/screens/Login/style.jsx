import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    phoneTextInputContainer: {
        width: "75%",
        marginTop: 20,
    
        borderBottomColor: '#565765',
        borderBottomWidth: 1
    },
    phoneTextInput: {
        color: 'black',
        height: 30,
        padding: 0,
        width: "100%",
        fontSize: 14,
    },
    buttonContainer: {
        marginTop: 30,
    },
    orbuttonContainer: {
        marginTop: 0,
    },
    buttonPill: {
        width: windowWidth * 0.75,
        backgroundColor: '#212121',
        borderRadius: 7.5,
        padding: 12.5
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 15,
        fontWeight: '500'
    },
    eyeIcon: {
        justifyContent: "center",
        alignItems: "center",
        // borderBottomWidth: 1,
        borderBottomColor: "grey",
    },
    textInputAndButtonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        // width:Space[200]
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        width: '75%',
    },
    passwordInput: {
        color: 'black',
        height: 30,
        padding: 0,
        width: "90%",
        fontSize: 14,
    },

    errorContainer: {
        marginTop: 10,
    },
    errorText: {
        fontSize: 10,
        color: 'red',
        fontWeight: '400'
    },
    orSeparatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        width: windowWidth * 0.75,
      },
      separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
      },
      orText: {
        marginHorizontal: 10,
        color: '#aaa',
        fontSize: 16,
      },
});

export default styles;