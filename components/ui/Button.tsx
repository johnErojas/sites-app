import {Pressable, StyleSheet, View, Text} from "react-native";
import {Colors} from "../../constants/Colors";

function Button({label, onPress}) {
    return <Pressable
        style={({pressed}) => [styles.button, pressed && styles.pressed]}
        onPress={onPress}>
        <View>
            <Text style={styles.text}>{label}</Text>
        </View>
    </Pressable>
}

export default Button;


const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 18,
        paddingVertical: 12,
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
        textAlign: "center",
        color: Colors.primary100,
        fontWeight: "bold"
    }
})