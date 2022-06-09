import {Alert, Button, Image, View, Text, StyleSheet} from "react-native";
import {launchCameraAsync, PermissionStatus, useCameraPermissions} from "expo-image-picker";
import {useState} from "react";
import {Colors} from "../../constants/Colors";
import OutlinedButton from "../ui/OutlinedButton";
import {Ico} from "../fontawesome/constants/IconNames";

function ImagePicker({onImagePicked}) {

    const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
    const [pickedImg, setPickedImg] = useState();

    async function verifyPermissions() {
        if(cameraPermissionInfo.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if(cameraPermissionInfo.status === PermissionStatus.DENIED){
            Alert.alert(
                "Insufficient Permissions",
                "You need to grant camera permissions to use this app"
            )
            return false;
        }

        return true;
    }
    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();
        if(!hasPermission){
            return;
        }
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5,
        });

        // @ts-ignore
        const { uri } = image;
        setPickedImg(uri);
        onImagePicked(uri);
    }

    let imagePreview = <Text>No Image taken yet</Text>;

    if(pickedImg){
        imagePreview = <Image style={styles.image} source={{uri: pickedImg}}  />
    }

    return <View>
        <View style={styles.imagePreview}>{imagePreview}</View>
        <OutlinedButton onPress={takeImageHandler} icon={Ico.cameraRetro}>
            <Text>Take a Picture</Text>
        </OutlinedButton>
    </View>
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: "100%",
        height: 200,
        marginVertical: 18,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 10,
        overflow: "hidden",
        shadowColor: "black",
        shadowRadius: 2,
        shadowOffset: { width: 1, height: 1},
        shadowOpacity: 0.33
    },
    image: {
        width: "100%",
        height: "100%"
    }
})