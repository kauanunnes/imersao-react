import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@skynexui/components';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import LoadingCat from '../src/components/LoadingCat';
import Header from '../src/components/Header';
import MessageList from '../src/components/MessageList';
import MessageItem from '../src/components/MessageItem';
import { ButtonSendSticker } from '../src/components/SendSticker';

const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

function listenerMessagesRealTime(addNewMessage) {
    return supabaseClient
            .from('messages')
            .on('INSERT', (response) => {
                addNewMessage(response.new)
            })
            .subscribe()

}

export default function ChatPage() {
    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState([])
    const [loading, setLoading] = useState(null)
    const [loggedUser, setLoggedUser] = React.useState(null)

    const handleDeleteMessage = async (id) => {
        try {
            await supabaseClient.from('messages').delete().match({ id })

        } catch (error) {
            console.log(error)
        } 
    }

    useEffect(async () => {
        setLoading(true)
        const {data} = await supabaseClient
                            .from('messages')
                            .select('*')
                            .order('id', {
                                ascending: false,
                            });
        setMessageList(data)
        setLoading(false)
        setLoggedUser(JSON.parse(localStorage.getItem('username')))
        listenerMessagesRealTime((newMessage) => {
            console.log(newMessage)
            setMessageList((currentValueOfList) => { return [newMessage, ...currentValueOfList]})
    })
    }, [])

    const handleSendMessage = async (message) => {
        const fullMessage = {
            message,
            by: loggedUser,
            created_at: new Date().toLocaleDateString()
        }

        const {data} = await supabaseClient
                        .from('messages')
                        .insert([
                            fullMessage
                        ]);
        
        setMessage('')
    }
    
    return (
        <Box
          styleSheet={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: `${appConfig.theme.colors.primary['050']}`,
              backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
              color: appConfig.theme.colors.neutrals['000'],
              overflowY: 'hidden'
          }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '-15px 13px 42px rgba(229, 25, 85, 0.18)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.primary['050'],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header headerTitle="Chat" />
                <Box styleSheet={{
                    display: 'flex',
                    gap: '15px',
                    height: '100%'
                }}>
                <Box styleSheet={{
                    minHeight: '90%',
                    maxHeight: '80vh',
                    width: '20%',
                    backgroundColor: '#FFDEE8',
                    borderRadius: '5px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '10px 0',
                    gap: '15px'
                }}>
                    <MessageItem isSelected />
                    <MessageItem isSelected={false} />
                </Box>

                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        minHeight: '90%',
                        maxHeight: '80vh',
                        maxWidth: '75vw',
                        backgroundColor: '#FFDEE8',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    {!loading && messageList ?<MessageList handleDeleteMessage={handleDeleteMessage} messages={{
                            messageList: messageList
                        }} /> : (
                            <LoadingCat />
                    )}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleSendMessage(message)
                        }}
                    >
                        <TextField
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    handleSendMessage(message)
                                }
                            }}
                            onChange={e => setMessage(e.currentTarget.value)}
                            value={message}
                            placeholder="Type your message here"
                            stateNode
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: '#FFCADA',
                                marginRight: '12px',
                                color: appConfig.theme.colors.primary[900],
                                fontSize: '18px'
                            }}
                        />
                        <Box styleSheet={{
                            width: '120px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '10px'
                        }}>
                            <Button
                            iconName='telegram'
                            styleSheet={{
                                height: '60px',
                                width: '60px',
                                alignSelf: 'center',
                                borderRadius: '60px',
                                marginBottom: '10px'
                            }}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor:appConfig.theme.colors.primary["main"],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                            onClick={(e) => {
                                e.preventDefault()
                                handleSendMessage(message)
                            }}
                            />
                            <ButtonSendSticker onStickerClick={(sticker) => {
                                console.log(sticker)
                                handleSendMessage(`:sticker:${sticker}`)
                            }}/>
                        </Box>
                    </Box>
                </Box>
                </Box>
                
            </Box>
        </Box>
    )
}


