import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';

import Inicial from '../inicial';
import Perfil from '../perfil';
import ConsMarcada from '../cons_marcada';



const Tab = createBottomTabNavigator();

export default function Home() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="inicial"
                component={Inicial}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, size, color }) => {
                        return <AntDesign focused={focused} size={size} color={color} name="calendar" />
                    }
                }}
            />
            <Tab.Screen
                name="Meu Perfil"
                component={Perfil}
                options={{
                    tabBarIcon: ({focused, size, color}) => {
                        return <SimpleLineIcons focused={focused} name="user" size={size} color={color} />
                    }
                }} 
            />

            <Tab.Screen
                name="Consultas Marcadas"
                component={ConsMarcada}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, size, color }) => {
                        return <SimpleLineIcons focused={focused} size={size} color={color} name="user" />
                    }
                }}
            />
        </Tab.Navigator>
    )
}