import { Slot,Stack } from 'expo-router';
import { useEffect } from 'react';

import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider }  from 'stream-chat-expo';
import ChatProvider from '../../providers/ChatProvider';


// const client = StreamChat.getInstance('h5he88yz6pzc');

export default function HomeLayout(){

//     useEffect(() => {

//         const connect = async ()=>{
//             await client.connectUser(
//                 {
//                   id: 'jlahey',
//                   name: 'Jim Lahey',
//                   image: 'https://i.imgur.com/fR9Jz14.png',
//                 },
//                 client.devToken('jlahey')
//               );

//               /**
//  *  Channel created using a channel id
//  */
// // const channel = client.channel('messaging', 'the_park', {
// //     name: 'The Park',
// //   });
// //   await channel.watch();
// //         
//             }
//         connect();
//     })
    return (
    
  <ChatProvider>       
    <Stack>
        <Stack.Screen name ="(tabs)" options={{headerShown: false}}/>
    </Stack>
    </ChatProvider>    
   
    );
}