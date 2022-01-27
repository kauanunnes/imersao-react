import React from 'react';
import { Box, Text, Button } from '@skynexui/components';
import appConfig from '../../config.json';

function Header({headerTitle}) {
  return (
    <>
        <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
            <Text variant='heading5' styleSheet={{
              color: `${appConfig.theme.colors.primary['main']}`,
              fontSize: '22px'
            }}>
                {headerTitle}
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

export default Header;
