import React, { useState, useEffect } from 'react';
import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import appConfig from '../../config.json';
import UserInfo from './UserInfo';


export default function MessageList(props) {
  
  const messageList = props.messages
  const [messages, setMessages] = useState(null)
  const [showInfo, setShowInfo] = useState({
      id: -1,
      situation: false
  })    
  useEffect(() => {
    if (messageList) {
      setMessages(messageList.messageList)
    }
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
        {/* <button onClick={() => {
          console.log(messages)
        }}>aaa</button> */}
          {messages && messages.map(({message, id, by, created_at}) => {
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
                
            </Text>
            )
          })
        }
      </Box>
  )
}