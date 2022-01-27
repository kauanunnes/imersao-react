import React from 'react';
import { Box, Text, Button, Image } from '@skynexui/components';
import appConfig from '../../config.json';


function MessageItem({isSelected}) {
  console.log(message)
  return (
    <Box styleSheet={{
      backgroundColor: appConfig.theme.colors.primary['050'],
      height: '85px',
      width: '90%',
      border: isSelected ? '1px solid rgba(229, 25, 85, 0.65)': '',
      boxShadow: '-4px 4px 9px rgba(247, 186, 205, 0.5)',
      borderRadius: '10px',
      color: appConfig.theme.colors.primary['main'],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px'
    }}>
      <Image styleSheet={{
        height: '70px',
        width: 'auto',
        borderRadius: '100%'
      }} src={`https://www.github.com/kauanunnes.png`}/>
      <Box styleSheet={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Text styleSheet={{
          fontFamily: '"Dongle", sans-serif',
          fontSize: '20px',
          fontWeight: 'bold'
        }}>@kauanunnes</Text>
        <Text styleSheet={{
          fontFamily: '"Dongle", sans-serif',
          fontSize: '18px',
          margin: '0'

        }}>this is a test</Text>
      </Box>
    </Box>
  );
}

export default MessageItem;
