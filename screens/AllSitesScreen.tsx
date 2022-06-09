import SitesList from "../components/sites/SitesList";
import {useEffect, useState} from "react";

function AllSitesScreen({route}) {
    const [sites, setSites] = useState([]);
    useEffect(() => {
        if (route.params) {
            const site = route.params.site;
            if (site) {
                setSites((list) => [site]);
            }
        }
    }, [setSites, route]);


    return <SitesList sites={sites}/>
}

export default AllSitesScreen;
