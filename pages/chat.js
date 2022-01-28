import React, { useState, useEffect } from 'react';
import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import LoadingCat from './components/LoadingCat';
import Header from './components/Header';
import MessageList from './components/MessageList';
import MessageItem from './components/MessageItem';

const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function ChatPage() {
    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState(null)
    const [loading, setLoading] = useState(null)
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
        
    }, [])

    const handleSendMessage = async (e, message) => {
        e.preventDefault()


        const fullMessage = {
            message,
            by: 'kauanunnes',
            created_at: new Date().toLocaleDateString()
        }
        const {data} = await supabaseClient
                        .from('messages')
                        .insert([
                            fullMessage
                        ]);
        setMessageList([data[0], ...messageList])
        
        
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
                    gap: '15px'
                }}>
                <Box styleSheet={{
                    height: '85%',
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
                        height: '85%',
                        backgroundColor: '#FFDEE8',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    {!loading && messageList ?<MessageList messages={{
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
                        onSubmit={(e) => handleSendMessage(e, message)}
                    >
                        <TextField
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e, message)}
                            onChange={e => setMessage(e.currentTarget.value)}
                            value={message}
                            placeholder="Type your message here"
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
                        <Button
                          iconName='telegram'
                          styleSheet={{
                            height: '60px',
                            alignSelf: 'center',
                            borderRadius: '35%',
                            marginBottom: '10px'
                          }}
                          buttonColors={{
                            contrastColor: appConfig.theme.colors.neutrals["000"],
                            mainColor:appConfig.theme.colors.primary["main"],
                            mainColorLight: appConfig.theme.colors.primary[400],
                            mainColorStrong: appConfig.theme.colors.primary[600],
                          }}
                          onClick={(e) => handleSendMessage(e, message)}
                        />
                    </Box>
                </Box>
                </Box>
                
            </Box>
        </Box>
    )
}


