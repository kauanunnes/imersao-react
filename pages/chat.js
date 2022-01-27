import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useState, useEffect } from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import LoadingCat from './components/LoadingCat';
import UserInfo from './components/UserInfo';

const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function ChatPage() {
    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState({
        loading: false,
        messages: []
    })
    useEffect(async () => {
        setMessageList({
            loading: true,
            messages:  []
        })
        const {data} = await supabaseClient
                            .from('messages')
                            .select('*')
                            .order('id', {
                                ascending: false,
                            });
        setMessageList({
            loading: false,
            messages:  [...data]
        })
        
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
      setMessageList({
          loading: false,
          messages:  [data[0], ...messageList]
      })
      setMessage('')
    }
    
    return (
        <Box
          styleSheet={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: `${appConfig.theme.colors.primary['050']}`,
              backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
              color: appConfig.theme.colors.neutrals['000']
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
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: '#FFDEE8',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    {messageList.loading ? <LoadingCat /> : (
                        <MessageList messages={{
                            loading: messageList.loading,
                            messageList: messageList.messages
                        }} />

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
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5' styleSheet={{
                  color: `${appConfig.theme.colors.primary[500]}`
                }}>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    buttonColors={{
                      contrastColor: appConfig.theme.colors.neutrals["000"],
                      mainColor:appConfig.theme.colors.primary["main"],
                      mainColorLight: appConfig.theme.colors.primary[400],
                      mainColorStrong: appConfig.theme.colors.primary[600],
                    }}

                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    const {loading, messageList} = props.messages
    const [messages, setMessages] = useState(messageList)
    const [showInfo, setShowInfo] = useState({
        id: -1,
        situation: false
    })    
    useEffect(() => {
      setMessages(messageList)
    }, [messageList])
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
                overflow: 'auto'
            }}
        >
            {messages.map(({message, id, by, created_at}) => {
              return (
              <Text
                  key={id}
                  tag="li"
                  onClick={() => {
                    const confirmAction = window.confirm('Are you sure about delete this message?')
                    if (!confirmAction) return
                    const position = messages.findIndex((value) => {
                      return id === value.id
                    })
                    let newMessages = messages
                    newMessages.splice(position, 1)
                    setMessages([...newMessages])

                  }}
                  styleSheet={{
                      borderRadius: '5px',
                      padding: '6px',
                      marginBottom: '12px',
                      hover: {
                          backgroundColor: appConfig.theme.colors.primary['300'],
                      },
                      transition: 'all 0.15s',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      color: `${appConfig.theme.colors.primary[600]}`,
                  }}
              >
                  <Box
                      styleSheet={{
                          marginBottom: '8px',
                      }}
                  >
                      <Image
                          styleSheet={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              display: 'inline-block',
                              marginRight: '8px',
                              hover: {
                                  transform: 'scale(1.1)'
                              }
                          }}
                          src={`https://github.com/${by}.png`}
                          onMouseOver={() => setShowInfo({
                            situation: true,
                            id
                          })}
                          onMouseOut={() =>setShowInfo({
                            situation: false,
                            id: -1
                          })}
                      />
                      {showInfo.situation === true && showInfo.id === id ? (
                          <UserInfo username={by}/>
                      ) : ''}
                      <Text tag="strong" styleSheet={{
                        color: `${appConfig.theme.colors.primary[600]}`,
                        fontWeight: 'bold',
                      }}>
                          @{by}
                      </Text>
                      <Text
                          styleSheet={{
                              fontSize: '10px',
                              marginLeft: '8px',
                              color: appConfig.theme.colors.neutrals[300],
                          }}
                          tag="span"
                      >
                          {new Date(created_at).toLocaleString()}
                      </Text>
                  </Box>
                  {message}
                  {/* <Button 
                    label="X"
                    onClick={(e) => {
                      const position = messages.findIndex((message) => {
                        return id === message.id
                      })
                      let newMessages = messages
                      newMessages.splice(position, 1)
                      setMessages([...newMessages])

                    }}
                    styleSheet={{
                      alignSelf:"flex-end",
                    }}
                  /> */}
              </Text>
              )
            })
          }
        </Box>
    )
}