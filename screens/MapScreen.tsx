import MapView, {Marker} from "react-native-maps";
import {Alert, StyleSheet} from "react-native";
import {useCallback, useLayoutEffect, useState} from "react";
import IconButton from "../components/ui/IconButton";
import {Ico} from "../components/fontawesome/constants/IconNames";
import {IconType} from "../components/fontawesome/constants/IconType";

function MapScreen({navigation}) {
    const [selectedLocation, setSelectedLocation] = useState();

    const region = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    function selectLocationHandler(event) {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({
            // @ts-ignore
            lat: lat,
            lng: lng
        })
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert(
                "No Location Picked",
                "You have to pick a location (by tappin on the map) first!"
            )
            return;
        }


        navigation.navigate("AddSite", {
            // @ts-ignore
            pickedLat: selectedLocation.lat,
            // @ts-ignore
            pickedLng: selectedLocation.lng
        })
    }, [navigation, selectedLocation]);


    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({tintColor}) => (
                //@ts-ignore
                <IconButton
                    size={18}
                    icon={Ico.floppyDisk}
                    onPress={savePickedLocationHandler}
                    type={IconType.S}
                    color={tintColor}/>)
        })
    }, [navigation, savePickedLocationHandler])

    // @ts-ignore
    return <MapView style={styles.map} onPress={selectLocationHandler} initialRegion={region}>
        {
            // @ts-ignore
            selectedLocation && <Marker title="Location" coordinate={{
                // @ts-ignore
                latitude: selectedLocation.lat,
                // @ts-ignore
                longitude: selectedLocation.lng
            }}/>
        }
    </MapView>
}

export default MapScreen;

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})