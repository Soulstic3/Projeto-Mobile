import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign, SimpleLineIcons} from '@expo/vector-icons';

import Inicial from '../inicial';
import PerfilScreen from '../perfil';
import ConsMarcada from '../cons_marcada';



const Tab = createBottomTabNavigator();

export default function Home() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Meu Perfil" component={PerfilScreen} options={{ tabBarIcon: () => <SimpleLineIcons name="user" size={24} color="black" /> }} />
            <Tab.Screen
                name="inicial"
                component={Inicial}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused, size, color }) => {
                            return <AntDesign focused={focused} size={size} color={color} name="calendar" />
                    }
                }}
            />

            <Tab.Screen
                name="cons_marcada"
                component={ConsMarcada}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({focused, size, color }) => {
                        return <SimpleLineIcons focused={focused} size={size} color={color} name="user" />
                    }
                }}
            />
        </Tab.Navigator>
    )
}