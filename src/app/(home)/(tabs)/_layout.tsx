import {Tabs} from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabsNavigator(){
  return( 
    <Tabs >

<Tabs.Screen 
      name="profile"
      options={{
        title: 'Profile', 
        tabBarIcon: ({size, color})=>(
          <Entypo name="pencil" size={size} color= {color}/>
        ),
      }}    
    />
    <Tabs.Screen 
      name="swipe"
      options={{
        title: 'Swipe', 
        tabBarIcon:({size, color})=>(
          <MaterialCommunityIcons name="cards" size={size} color={color} />
        ),
      }}
    />
 



          <Tabs.Screen 
      name="index"
      options={{
        title: 'Chats', 
        tabBarIcon:  ({size, color})=> (
          <Entypo name="chat" size={size} color= {color} />
        ),
      }}
    />
    </Tabs>
  );
}