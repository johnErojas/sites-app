import {StyleSheet, Text, View, Button} from 'react-native';
import SiteForm from "../components/sites/SiteForm";
import {insertSite} from "../utils/database";

function AddSiteScreen({navigation}) {
    async function createSiteHandler(site) {
        await insertSite(site);
        navigation.navigate("AllSites",{site:site})
    }
    return <SiteForm onSubmit={createSiteHandler} />
}

export default AddSiteScreen;


const styles = StyleSheet.create({

})