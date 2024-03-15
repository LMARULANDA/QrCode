import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CreateCodeQrScreen from "../screens/CreateCodeQrScreen";
import ScanCodeQrScreen from "../screens/ScanCodeQrScreen";
import HistoryCodeQrScreen from "../screens/HistoryCodeQrScreen";

//const Tab = createMaterialBottomTabNavigator();//
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Iniciop",
          tabBarIcon: ({ color, size }) => {
            <MaterialCommunityIcons name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen icon={"home"} name="Escanear codigo QR" component={ScanCodeQrScreen} />
      <Tab.Screen name="Crear Codigo QR" component={CreateCodeQrScreen} />
      <Tab.Screen name="Historial" component={HistoryCodeQrScreen} />
      <Tab.Screen name="Configuracion" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function NavigationTab() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
