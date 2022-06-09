import {ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {useCallback, useState} from "react";
import {Colors} from "../../constants/Colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../ui/Button";
import Site from "../../models/Site";

function SiteForm({onSubmit}) {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [pickedLocation, setPickedLocation] = useState();
    const [pickedImage, setPickedImage] = useState();

    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText);
    }

    function imagePickedHandler(imageUri) {
        setPickedImage(imageUri);
    }

    const locationPickedHandler = useCallback(location => {
        setPickedLocation(location);
    }, []);

    function saveSiteHandler() {
        const siteData = new Site(
            enteredTitle,
            pickedImage,
            pickedLocation,
            null
        );

        onSubmit(siteData);
    }

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle}/>
            </View>

            <ImagePicker onImagePicked={imagePickedHandler}/>
            <LocationPicker onLocationPicked={locationPickedHandler}/>
            <View style={{marginTop: 18}}>
                <Button label="Add Site" onPress={saveSiteHandler}/>
            </View>
        </ScrollView>
    )
}

export default SiteForm;


const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,

    },
    label: {
        fontWeight: "bold",
        marginBottom: 4,
        color: Colors.primary200
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderRadius: 8,
        borderColor: Colors.primary700,
        borderWidth: 2,
        backgroundColor: Colors.primary100
    }
})