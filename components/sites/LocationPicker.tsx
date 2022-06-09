import {Alert, Image, StyleSheet, View, Text} from "react-native";
import OutlinedButton from "../ui/OutlinedButton";
import {Ico} from "../fontawesome/constants/IconNames";
import {Colors} from "../../constants/Colors";
import {getCurrentPositionAsync, PermissionStatus, useForegroundPermissions} from "expo-location";
import {useEffect, useState} from "react";
import {getMapPreview} from "../../utils/server";
import {useIsFocused, useNavigation, useRoute} from "@react-navigation/native";

function LocationPicker({onLocationPicked}) {
    const [pickedLocation, setPickedLocation] = useState();
    const isFocused = useIsFocused();

    const navigation = useNavigation();
    const route = useRoute();

    const [locationPermissionInfo, requestPermission] = useForegroundPermissions();

    useEffect(() => {

        if (isFocused && route.params) {
            // @ts-ignore
            const mapPickedLocation = route.params ? {lat: route.params.pickedLat, lng: route.params.pickedLng} : null;
            // @ts-ignore
            setPickedLocation(mapPickedLocation);
        }

    }, [route, isFocused]);

    useEffect(() => {
        onLocationPicked(pickedLocation);
    }, [pickedLocation,onLocationPicked]);



    async function verifyPermissions() {
        if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if (locationPermissionInfo.status === PermissionStatus.DENIED) {
            Alert.alert(
                "Insufficient Permissions",
                "You need to grant location permissions to use this app"
            )
            return false;
        }

        return true;
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const position = await getCurrentPositionAsync();
        const location = {
            // @ts-ignore
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        // @ts-ignore
        setPickedLocation(location);
        onLocationPicked(location);
    }

    function pickOnMapHandler() {
        // @ts-ignore
        navigation.navigate("Map");
    }

    let mapPreview = <Text>No Location Picked yet</Text>
    if (pickedLocation) {
        {/*@ts-ignore*/}
        mapPreview = <Image style={styles.image} source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)}}/>
    }
    return (
        <View>
            <View style={styles.mapPreview}>
                {mapPreview}
            </View>
            <View style={styles.actions}>
                {/*@ts-ignore*/}
                <OutlinedButton icon={Ico.locationDot} onPress={getLocationHandler}/>
                {/*@ts-ignore*/}
                <OutlinedButton icon={Ico.mapLocationDot} onPress={pickOnMapHandler}/>
            </View>
        </View>
    )
}

export default LocationPicker;


const styles = StyleSheet.create({
    mapPreview: {
        width: "100%",
        height: 200,
        marginVertical: 18,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 10,
        overflow: "hidden"
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },

    image: {
        width: "100%",
        height: "100%"
    }
})