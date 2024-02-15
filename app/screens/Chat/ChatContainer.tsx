import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import ChatScreen from './ChatScreen'
import { database } from 'services/watermelon'

type Props = {}

const ChatContainer = (props: Props) => {

    const [text, onChangeText] = useState('');
    const [messages, setMessages] = useState<any[]>([]); // State to store list of messages

    const _onSubmit = async () => {
        await database.write(async () => {
            await database.get('messages').create((message: any) => {
                message.message = text;
                message.isReceiver = false;
                message.date = new Date().toLocaleTimeString()
            })
        })
        onChangeText('')
    }

    useEffect(() => {
        database.get('messages').query().fetch().then((messages: any) =>
            setMessages(messages)
        )
    }, [messages])

    // useEffect(() => {
    //     database.write(async () => {
    //         const messages = await database.get('messages').query().fetch()
    //         messages.forEach(async (message: any) => {
    //             await message.destroyPermanently()
    //         })
    //     })
    // }, [])
    const _onDestroy = async (id: any) => {
        await database.write(async () => {
            const messages = await database.get('messages').find(id)
            await messages.destroyPermanently()
        })
    }

    const _onEdit = async (id: any, newText: any) => {
        await database.write(async () => {
            const messages = await database.get('messages').find(id)
            messages.update((message: any) => {
                message.message = newText
                message.isEdited = true
                message.date = new Date().toLocaleTimeString()
            })
        })
    }


    // console.log(
    //     database.adapter.schema.tables
    // )


    return <ChatScreen
        onChangeText={onChangeText}
        text={text}
        messages={messages}
        setMessages={setMessages}
        onSubmit={_onSubmit}
        onDestroy={_onDestroy}
        onEdit={_onEdit}
    />
}

export default ChatContainer