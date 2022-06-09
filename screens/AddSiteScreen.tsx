import {StyleSheet, Text, View, Button} from 'react-native';
import SiteForm from "../components/sites/SiteForm";

function AddSiteScreen({navigation}) {
    function createSiteHandler(site) {
        navigation.navigate("AllSites",{site:site})
    }
    return <SiteForm onSubmit={createSiteHandler} />
}

export default AddSiteScreen;


const styles = StyleSheet.create({

})