import {FlatList, StyleSheet, Text, View} from "react-native";
import SiteItem from "./SiteItem";
import {Colors} from "../../constants/Colors";
import {useNavigation} from "@react-navigation/native";

function SitesList({sites}) {

    if(!sites || sites.length === 0){
        return <View style={styles.fallbackContainer}>
            <Text style={styles.fallbackText}>No Sites added yet - start adding some!</Text>
        </View>
    }

    const navigation = useNavigation();
    function selectedItemHandler(id) {
        // @ts-ignore
        navigation.navigate("SiteDetails",{
            siteId:id
        })
    }

    return <FlatList
        style={styles.list}
        data={sites} renderItem={({item})=> <SiteItem onSelected={selectedItemHandler} site={item} /> }
        keyExtractor={(item)=>item.id}
    />
}

export default SitesList;

const styles = StyleSheet.create({
    list: {
        margin: 24
    },
    fallbackContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    fallbackText: {
        color: Colors.primary200
    }
})