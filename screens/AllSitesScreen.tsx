import SitesList from "../components/sites/SitesList";
import {useEffect, useState} from "react";
import {useIsFocused} from "@react-navigation/native";
import {fetchSites} from "../utils/database";

function AllSitesScreen() {
    const [sites, setSites] = useState([]);
    const isFocused = useIsFocused();
    useEffect(() => {
        async function loadSites() {
            try{
                const sites = await fetchSites();
                setSites(sites);
            }catch (e) {
                console.warn(e);
            }
        }

        if(isFocused)loadSites();
    }, [isFocused]);


    return <SitesList sites={sites}/>
}

export default AllSitesScreen;
