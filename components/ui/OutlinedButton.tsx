import {Pressable, StyleSheet, Text} from "react-native";
import {FaIcon} from "../fontawesome/Icons";
import {Colors} from "../../constants/Colors";
import {IconType} from "../fontawesome/constants/IconType";

function OutlinedButton({icon, onPress, children}) {
    return <Pressable
        onPress={onPress}
        style={({pressed}) => [styles.button, pressed && styles.pressed]}>
        <FaIcon style={styles.icon} type={IconType.S} icon={icon} size={14} color={Colors.primary500}/>
        <Text style={styles.text}>{children}</Text>
    </Pressable>
}

export default OutlinedButton;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.primary500,
        borderRadius: 8
    },
    pressed: {
        opacity: 0.75
    },
    icon: {
        marginRight: 6,
    },
    text: {
        color: Colors.primary500
    }
})