import { View, Text, TextInput, TouchableOpacity, FlatList, TouchableWithoutFeedback, Keyboard, Modal, StyleSheet, Button } from 'react-native';
import React, { useMemo, useState, useRef, useEffect } from 'react';
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
    onEdit: (id: any, newText: string) => void;
};

const ChatScreen = (props: Props) => {
    const isReceiver = (i: any) => i % 2 === 0;
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedMessage, setEditedMessage] = useState('');
    const inputRef = useRef<TextInput>(null);

    const [oldMessage, setOldMessage] = useState(''); // [oldMessage, setOldMessage


    // Function to get the old message by ID
    const getOldMessageById = (id: any) => {
        const message = props.messages.find(msg => msg.id === id);
        setOldMessage(message ? message.message : '');
        return message ? message.message : '';
    };

    useEffect(() => {
        // Check if edit mode is enabled and TextInput ref exists
        if (editMode && inputRef.current) {
            // Focus on the TextInput
            inputRef.current.focus();
        }
    }, [editMode]);

    const handleEdit = (itemId: any) => {
        setEditedMessage(getOldMessageById(itemId)); // Set the edited message
        setSelectedItemId(itemId);
        setEditMode(true);
        setModalVisible(false);
    };


    const handleSubmit = () => {
        if (editMode) {
            props.onEdit(selectedItemId, editedMessage);
            setEditMode(false);
        } else {
            props.onSubmit();
        }
    };

    const handleDestroy = (itemId: any) => {
        props.onDestroy(itemId);
        setModalVisible(false);
    };

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
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(true);
                                    setSelectedItemId(item.id);
                                }}
                                key={index}
                                style={[
                                    styles.messageContainer,
                                    {
                                        backgroundColor: isReceiver(index) ? '#1a74e8' : 'white',
                                        alignSelf: isReceiver(index) ? 'flex-end' : 'flex-start',
                                        width: '50%',
                                    },
                                ]}
                            >
                                <View
                                    style={[
                                        styles.chat,
                                        isReceiver(index) ? { bottom: -3, right: -3 } : { bottom: -3, left: -3 },
                                        {
                                            transform: [{ rotateY: isReceiver(index) ? '0deg' : '180deg' }],
                                        },
                                    ]}
                                >
                                    {isReceiver(index) ? <ChatActive /> : <ChatWhite />}
                                </View>
                                <Text style={[styles.messageText, { color: isReceiver(index) ? 'white' : 'black' }]}>
                                    {item.message}
                                </Text>
                                <View style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    width: 'auto',
                                    flexDirection: 'row',
                                    backgroundColor: isReceiver(index) ? '#0088cc' : '#e5e5e5',
                                    margin: 5,
                                    borderRadius: 8,
                                    padding: 5,
                                }}>
                                    <Text
                                        style={[
                                            styles.date,
                                            {
                                                alignSelf: 'center',
                                                color: isReceiver(index) ? 'white' : 'black',
                                                borderRadius: 8,
                                            },
                                        ]}
                                    >
                                        {item.date}
                                    </Text>
                                    {
                                        item.isEdited && (
                                            <Text
                                                style={[
                                                    styles.date,
                                                    {
                                                        alignSelf: 'center',
                                                        color: isReceiver(index) ? 'white' : 'black',
                                                        borderRadius: 8,
                                                        marginLeft: 5,
                                                    },
                                                ]}
                                            >
                                                {'(edited)'}
                                            </Text>
                                        )
                                    }
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <View style={_styles.fake} />

                    <View style={styles.inputContainer}>
                        {
                            editMode && (
                                <View style={styles.oldMessageContainer}>
                                    <Text style={styles.oldMessage}>
                                        {'Edit message'}
                                        {/* {oldMessage && ' (old message)'} */}
                                    </Text>
                                </View>
                            )
                        }
                        <View style={{
                            flexDirection: 'row',
                        }}>

                            {editMode && (
                                <TextInput
                                    ref={inputRef}
                                    style={styles.textInput}
                                    onChangeText={editMode ? setEditedMessage : props.onChangeText}
                                    value={editMode ? editedMessage : props.text}
                                    placeholder={editMode ? "Edit your message" : "Enter your message"}
                                    multiline={true}
                                />
                            )}
                            {!editMode && (
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={props.onChangeText}
                                    value={props.text}
                                    placeholder="Enter your message"
                                    multiline={true}
                                />
                            )}
                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>{editMode ? 'Update' : 'Submit'}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <TouchableOpacity onPress={() => handleDestroy(selectedItemId)}>
                                        <Text style={styles.modalText}>Delete</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleEdit(selectedItemId)}>
                                        <Text style={styles.modalText}>Edit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>
            </TouchableWithoutFeedback>
        </>
    );
};

export default ChatScreen;
