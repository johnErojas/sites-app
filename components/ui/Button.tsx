import {StyleSheet} from "react-native";
import {Colors} from "../../constants/Colors";


const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 4,
        backgroundColor: Colors.primary800,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
        borderRadius: 4
    },
    pressed: {
        opacity: 0.75
    },
    text: {
        textAlign: "center"
    }
})