import {Pressable, StyleSheet} from "react-native";
import {FaIcon} from "../fontawesome/Icons";
import {IconType} from "../fontawesome/constants/IconType";
function IconButton({ type, icon, size, color, onPress, defaultStyle }) {
    return <Pressable style={({pressed}) => [ styles.button, pressed && styles.pressed]} onPress={onPress}>
        {/*@ts-ignore*/}
        <FaIcon type={type || IconType.S} icon={icon} color={color} size={size} defaultStyle={defaultStyle} />
    </Pressable>
}

export default IconButton;

const styles = StyleSheet.create({
    button: {
        padding: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    pressed: {
        opacity: 0.75
    }
})