import { Slot,Stack } from 'expo-router';
import { PropsWithChildren, useEffect } from 'react';

import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider }  from 'stream-chat-expo';


const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);


export default function ChatProvider({children}: PropsWithChildren){
    useEffect(() => {

        const connect = async ()=>{
            await client.connectUser(
                {
                  id: 'jlahey',
                  name: 'Jim Lahey',
                  image: 'https://i.imgur.com/fR9Jz14.png',
                },
                client.devToken('jlahey')
              );

              /**
 *  Channel created using a channel id
 */
// const channel = client.channel('messaging', 'the_park', {
//     name: 'The Park',
//   });
//   await channel.watch();
//         
            }
        connect();
    })
    return (
<OverlayProvider>

<Chat client={client}>
    {children}
</Chat>
</OverlayProvider>
    );
}
