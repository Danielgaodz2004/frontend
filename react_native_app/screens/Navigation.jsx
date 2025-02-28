import { NavigationContainer } from "@react-navigation/native"
import CodesScreen from "./CodesScreen";
import {createDrawerNavigator} from "@react-navigation/drawer";
import CodeScreen from "./CodeScreen";
import {SettingsScreen} from "./SettingsScreen";
import {useIntl} from "react-intl";

const Drawer = createDrawerNavigator();

export const Navigation = () => {

    const intl = useIntl()

    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Codes">
                <Drawer.Screen name="Codes" component={CodesScreen} options={{title: intl.messages.codes}} />
                <Drawer.Screen name="Code" component={CodeScreen} options={{title: intl.messages.code, drawerItemStyle: {display: "none"}}} />
                <Drawer.Screen name="Settings" component={SettingsScreen} options={{title: intl.messages.settings}} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}