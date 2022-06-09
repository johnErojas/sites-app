import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import AllSitesScreen from "./screens/AllSitesScreen";
import AddSiteScreen from "./screens/AddSiteScreen";
import {Ico} from "./components/fontawesome/constants/IconNames";
import IconButton from "./components/ui/IconButton";
import {FaIcon} from "./components/fontawesome/Icons";
import {IconType} from "./components/fontawesome/constants/IconType";
import {Colors} from "./constants/Colors";
import MapScreen from "./screens/MapScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: Colors.primary500,
            },
            headerTintColor: Colors.gray700,
            contentStyle: {
                backgroundColor: Colors.gray700
            }

        }}>
          <Stack.Screen
              name="AllSites"
              component={AllSitesScreen}
              options={({navigation}) => ({
                  title: "Your Favorite Sites",
                  headerRight: ({tintColor}) =>
                      <IconButton type={IconType.R}
                                  icon={Ico.plus}
                                  color={tintColor}
                                  size={18}
                                  onPress={()=>navigation.navigate("AddSite")}
                                  defaultStyle={false}/>
              })}
          />
          <Stack.Screen name="AddSite"
                        options={{
                            title: "Add a new Site"
                        }}
                        component={AddSiteScreen} />
            <Stack.Screen name="Map"
                          options={{
                              title: "Choose a location"
                          }}
                          component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
