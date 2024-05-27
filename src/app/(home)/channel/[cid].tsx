import { useGlobalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {Text} from 'react-native';
import { Channel as ChannelType } from 'stream-chat';
import { Channel, MessageInput, MessageList, useChannelContext, useChatContext } from 'stream-chat-expo';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function ChennelScreen() {



    const [channel, setChannel] = useState<ChannelType | null>(null);
  
    const {cid} = useGlobalSearchParams<{cid: string}>();
 
    const{ client } = useChatContext();
 useEffect(()=>{
  
    const fetchChannel = async () => {
const channels = await client.queryChannels ({cid });
setChannel(channels[0]);

    };
    fetchChannel();
 }, [cid])
    if (!channel) {
        return <ActivityIndicator />;
    }
    return (
        <Channel channel={channel}>
        <MessageList />
        <SafeAreaView edges={['bottom']}>
        <MessageInput />
        </SafeAreaView>
    </Channel>
    );
}