import React from 'react';
import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import appConfig from '../../config.json';


function LoadingCat() {
  return (
    <Box styleSheet={{
      width: '100%',
      height: '500px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Image src="/images/cat.svg" styleSheet={{
        animation: 'rotate-center 2s linear infinite both'
      }} />
      <Text styleSheet={{
        color: appConfig.theme.colors.primary['main'],
        fontFamily: "'Dongle', sans-serif",
        fontSize: '20px'
      }}>
        Loading
      </Text>
    </Box>
  );
}

export default LoadingCat;
