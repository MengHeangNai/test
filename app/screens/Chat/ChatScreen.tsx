import { View, Text, TextInput, TouchableOpacity, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useMemo, useState } from 'react';
import { styles } from './ChatStyle';
import SafeArea from 'components/SafeArea';
import ChatWhite from './components/ChatWhite';
import ChatActive from './components/ChatActive';
import _styles from '@styles';

type Props = {
    onChangeText: (text: string) => void;
    text: string;
    messages: any[];
    setMessages: (messages: any[]) => void;
    onSubmit: () => void;
    onDestroy: (id: any) => void;
};

const ChatScreen = (props: Props) => {
    const isReceiver = (i: any) => i % 2 === 0; // Check if the message is from the receiver
    return (
        <>
            <SafeArea edges={'safeTop'} />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        style={{ flex: 1 }}
                        data={props.messages}
                        renderItem={({ item, index }) => (
                            <><TouchableOpacity
                                onPress={() => props.onDestroy(item.id)}
                                key={index}
                                style={[styles.messageContainer, {
                                    backgroundColor: isReceiver(index) ? '#1a74e8' : 'white',
                                    alignSelf: isReceiver(index) ? 'flex-end' : 'flex-start',
                                    width: '50%',
                                }]}>
                                <View
                                    style={[
                                        styles.chat,
                                        isReceiver(index) ? { bottom: -3, right: -3 } : { bottom: -3, left: -3 },
                                        {
                                            transform: [{
                                                rotateY: isReceiver(index) ? '0deg' : '180deg'
                                            }]
                                        },
                                    ]}
                                >
                                    {isReceiver(index) ? <ChatActive /> : <ChatWhite />}
                                </View>
                                <Text style={styles.messageText}>{item.message}</Text>
                                <Text style={[styles.date,
                                {
                                    color: isReceiver(index) ? 'white' : 'black',
                                    alignSelf: isReceiver(index) ? 'flex-end' : 'flex-start',
                                }
                                ]}>{item.date}</Text>
                            </TouchableOpacity>
                            </>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <View style={_styles.fake} />


                    {/* {
                    props.messages.map((item, index) => (
                        <View
                            key={index}
                            style={[styles.messageContainer, {
                                backgroundColor: isReceiver(index) ? '#1a74e8' : 'white',
                                alignSelf: isReceiver(index) ? 'flex-end' : 'flex-start',
                                width: '50%',
                            }]}>
                            <View
                                style={[
                                    styles.chat,
                                    isReceiver(index) ? { bottom: -3, right: -3 } : { bottom: -3, left: -3 },
                                    {
                                        transform: [{
                                            rotateY:
                                                isReceiver(index) ? '0deg' : '180deg'
                                        }]
                                    },
                                ]}
                            >
                                {
                                    isReceiver(index) ? <ChatActive /> : <ChatWhite />
                                }
                            </View>
                            <Text style={styles.messageText}>{item.message}</Text>
                            <Text style={[styles.date,
                            {
                                color: isReceiver(index) ? 'white' : 'black',
                                alignSelf: isReceiver(index) ? 'flex-end' : 'flex-start',
                            }
                            ]}>{
                                    new Date().toLocaleTimeString()
                                }</Text>
                        </View>
                    ))
                } */}

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={props.onChangeText}
                            value={props.text}
                            placeholder="Enter your message"
                            multiline={true}
                        />
                        <TouchableOpacity style={styles.button} onPress={() => {
                            props.onSubmit()
                        }}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </>
    );
};

const MessageTail = (item: any) => useMemo(() => {
    return (
        <View style={{
            backgroundColor: 'red',
            flex: 1,
        }}>
            <View
                style={[
                    styles.chat,
                    { bottom: -3, left: -3 },
                    { transform: [{ rotateY: '180deg' }] },
                ]}
            >
                <ChatWhite />
                <Text style={styles.messageText}>{item}</Text>
            </View>
            <Text style={[styles.date,]}>{
                new Date().toLocaleTimeString()
            }</Text>
        </View>
    )
}, [item]);

export default ChatScreen;
