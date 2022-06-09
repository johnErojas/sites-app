import {StyleSheet, View} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import solidIcon from "./resources/SolidIcon";
import regularIcon from "./resources/RegularIcon";
import duoToneIcon from "./resources/DuoToneIcon";
import getLightIcon from "./resources/LightIcon";
import {IconType} from "./constants/IconType";

function IconContainer({children, style }){
    return <View style={ [styles.container,style] }>{children}</View>
}

export function FaIcon({type, icon, color, size, style}) {
    return <IconContainer style={style} >
        <FontAwesomeIcon
            icon={findIcon(type,icon)}
            color={color}
            size={size} />
    </IconContainer>
}

const styles = StyleSheet.create({
    container:{
        padding: 5
    },

})
//constructors
function findIcon(type,nameID){
    let list;
    switch (type) {
        case IconType.S:list = solidIcon;break;
        case IconType.R:list = regularIcon;break;
        case IconType.D:list = duoToneIcon;break;
        case IconType.L:list = getLightIcon;break;
    }

    return list.find(({name})=>{
        return nameID === name;
    }).icon;
}