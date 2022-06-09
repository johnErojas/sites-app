import {ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import OutlinedButton from "../components/ui/OutlinedButton";
import {Ico} from "../components/fontawesome/constants/IconNames";
import {Colors} from "../constants/Colors";
import {useEffect, useState} from "react";
import {findSite} from "../utils/database";

function SiteDetailsScreen({navigation, route}) {
    const siteID = route.params.siteId;
    const [site, setSite] = useState();

    useEffect(() => {
        async function loadSite() {
            try{
                const item = await findSite(siteID);
                setSite(item);
                navigation.setOptions({
                    // @ts-ignore
                    title: item.title
                })
            }catch (e){
                console.warn(e);
            }
        }
        loadSite();
    }, [siteID, navigation]);


    function showOnMapHandler() {
        navigation.navigate("Map",{
            // @ts-ignore
            initialLat: site?.location.lat,
            // @ts-ignore
            initialLng: site?.location.lng,
            // @ts-ignore
            title: site?.title
        })
    }

    if(!site){
        return <View style={styles.fallback}>
            <Text style={styles.fallbackText}>Loading Data...</Text>
        </View>;
    }

    return <ScrollView>
        {/*@ts-ignore*/}
        <Image style={styles.image} source={{uri: site?.imageUri}} />
        <View style={styles.locationContainer}>
            <View style={styles.addressContainer}>
                {/*@ts-ignore*/}
                <Text style={styles.address}>{site?.address}</Text>
            </View>
            <OutlinedButton icon={Ico.mapLocationDot} onPress={showOnMapHandler}>
                View on Map
            </OutlinedButton>
        </View>
    </ScrollView>

}

export default SiteDetailsScreen;

const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    fallbackText: {
        color: "white"
    },
    image: {
        width: "100%",
        height: "30%",
        minHeight: 300
    },
    locationContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary500,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
    }

})