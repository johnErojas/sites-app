import {StyleSheet,Image, Pressable, Text, View} from "react-native";
import {Colors} from "../constants/Colors";

function SiteItem({site, onSelected}) {
    return <Pressable style={({pressed})=>[styles.item, pressed && styles.pressed]} onPress={onSelected}>

            <Image style={styles.image} source={{uri: site.imageUri }} />
            <View style={styles.info}>
                <Text style={styles.info}>{site.title}</Text>
                <Text style={styles.address}>{site.address || "-"}</Text>
            </View>

    </Pressable>
}

export default SiteItem;

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignItems: "flex-start",
        borderRadius: 6,
        marginVertical: 12,
        backgroundColor: Colors.primary500,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2
    },
    pressed: {
        opacity: 0.9
    },
    image: {
        flex: 1,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        height: 100
    },
    info: {
        flex: 2,
        padding: 12
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        color: Colors.gray700,
        paddingHorizontal: 12
    },
    address: {
        fontSize: 12,
        color: Colors.gray700
    }
})