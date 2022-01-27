import { useState } from 'react'
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import { useRouter } from 'next/router'
import appConfig from '../config.json'

function Title(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.primary['main']}
        }
      `}</style>
    </>
  )
}

export default function HomePage() {
  const [username, setUsername] = useState('');
  const Router = useRouter()
  const [userInfo, setUserInfo] = useState({
    user: {},
    loading: false
  })
  let timer;

  const requestUser = async (user) => {
    if (username === '') {
      setUserInfo({
        loading: false,
        user: {}
      })
      return
    }
    try {
      let header = new Headers()
      header.append("Authorization", `token ${process.env.NEXT_PUBLIC_TOKEN_GITHUB}`)
      var myInit = { method: 'GET',
                 headers: header,
                 mode: 'cors',
                 cache: 'default' };
  
      const data = await fetch(`https://api.github.com/users/${user}`, myInit)
      const json = await data.json()
      if (json.message === 'Not found') {
        setUserInfo({
          loading: false,
          user: {}
        })
        return
      }
      // console.log(json)
      setUserInfo({
        loading: false,
        user: json
      })      
    } catch (error) {
      // console.log(error)
    }
  }

  const handleChangeUsername = (e) => {
    setUsername(e.target.value)
    requestUser(e.target.value)
  }

  return (
    <>
      <Box styleSheet={{
        display: 'flex', justifyContent: 'space-between',
        gap: '20px',
        maxWidth: '100%',
        maxHeight: '100vh',
        backgroundColor: `${appConfig.theme.colors.primary['050']}`,
        paddingRight: '20px'
      }}>
        <Image
          styleSheet={{
            maxWidth: '45%',
            height: 'auto',
          }}
                
          src={`/images/photo.png`}
        />
        <Box styleSheet={{
          display: 'flex',
          width: '55%',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Box
            as="form"
            onSubmit={(e) => {
              e.preventDefault()
              Router.push('/chat')
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: '50%', textAlign: 'center', marginBottom: '32px',padding: '25px 35px', borderRadius: '12px',
              border: '1px solid #E51955',
              maxHeight: '450px',
              backgroundColor: appConfig.theme.colors.primary['050'],
              boxShadow: '-15px 13px 42px rgba(229, 25, 85, 0.18)',
            }}
          >
            <Title>welcome again!</Title>
            <Image
              styleSheet={{
                borderRadius: "100%",
                width: '150px',
                marginBottom: '16px',
                boxShadow: '5px 4px 0px rgba(229,25,85,0.59)'
              }}
                
              src={`https://github.com/${username.length > 2 ? username : ''}.png`}
            />
            {username && (
              <Text styleSheet={{
                backgroundColor: 'rgba(229, 25, 85, 0.32)',
                padding: '5px 10px',
                borderRadius: '9px',
                fontFamily: "'Dongle', sans-serif",
                fontSize: '20px'
              }}>
                {username}  {!userInfo.loading && userInfo.user.name ? ' | '+ userInfo.user.name : ''}
              </Text>
            )}
            <label htmlFor='input' style={{alignSelf: 'flex-start', fontSize: '24px'}}>username:</label>
            <TextField
              id="input"
              onChange={(e) => handleChangeUsername(e)}
              value={username}
              fullWidth
              placeholder='type your github username'
              styleSheet={{
                fontSize: '24px',
                borderRadius: '20px',
                height: '45px',
              }}
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.primary["main"],
                  mainColor: appConfig.theme.colors.primary["main"],
                  mainColorHighlight: appConfig.theme.colors.primary["main"],
                  backgroundColor: appConfig.theme.colors.primary['050'],
                },
              }}
            />
            <Button
              type='submit'
              label='login'
              fullWidth
              styleSheet={{
                borderRadius: '14px',
                height: '45px',
                
              }}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor:appConfig.theme.colors.primary["main"],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>

        </Box>


      </Box>
    </>
  );
}

// export default HomePage