import React from 'react';
import { Box, Text, Image, Button } from '@skynexui/components';
import appConfig from '../../config.json'

function UserInfo({username}) {
  const [user, setUser] = React.useState({
    loading: false,
    data: {}
  })
  const requestUser = async (user) => {
    if (username === '') {
      setUser({
        loading: false,
        data: {}
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
      console.log(json)
      if (json.message === 'Not found') {
        setUser({
          loading: false,
          data: {}
        })
        return
      }
      setUser({
        loading: false,
        data: json
      })      
    } catch (error) {
      console.log(error)
    }
  }
  React.useEffect(() => {
    requestUser(username)
  }, [])
  return user.loading ? <></> : (
    <Box styleSheet={{
      position: 'absolute',
      backgroundColor: appConfig.theme.colors.primary['050'],
      width: '200px',
      padding: '5px 10px',
      fontFamily: '"Dongle", sans-serif',
      border: '1px solid #E51955',
      borderRadius: '12px',
      
    }}>
      <Box>
        <Image src={`https://www.github.com/${user.data.login}.png`} styleSheet={{
          width: '65px',
          height: 'auto',
          borderRadius: '100%'
        }}/>
      </Box>
      <Box styleSheet={{display: 'flex', flexDirection: 'column'}}>
        <Text styleSheet={{fontSize: '20px ', fontFamily: '"Dongle", sans-serif'}} >Name: {user.data.name}</Text>
        <Text styleSheet={{fontSize: '20px ', fontFamily: '"Dongle", sans-serif'}} >Location: {user.data.location}</Text>
      </Box>
    </Box>
  )
}

export default UserInfo;
