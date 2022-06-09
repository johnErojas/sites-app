import {useCallback, useEffect, useState} from "react";
import * as SplashScreen from 'expo-splash-screen';
import {View} from "react-native";

function SplashViewScreen({initPromise, onAppReady}) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();
                await initPromise();
            }catch (e){
                console.warn(e);
            }finally {
                setIsReady(true);
            }
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if(isReady){
            await SplashScreen.hideAsync();
            onAppReady();
        }
        },[isReady]
    );

    if(!isReady){
        return null;
    }
    return <View onLayout={onLayoutRootView}>

    </View>;
}

export default SplashViewScreen;