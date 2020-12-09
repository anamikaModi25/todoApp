import React, { useEffect } from 'react';
import { Box, Text, Button, HStack, Spacer } from '@chakra-ui/react'
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { useHistory } from 'react-router-dom';
import Color from '../../Utils/Color';
import { loginApi } from '../../Utils/RTKQuery/loginApi';
import { activeToken, logout, selectCurrentUser } from '../../Login/Slice/loginSlice';
import { useAppDispatch, useTypedSelector } from '../../Utils/store';

export function Header() {
    const {bg, color, heading} = Color();
    const { push } = useHistory();
    const dispatch = useAppDispatch();
    const token = useTypedSelector(activeToken)
    // const user: User = details;
    const user = useTypedSelector(selectCurrentUser);

    // console.log(userName, "h")
    const [userDetail, {isLoading}] = loginApi.endpoints.userDetail.useMutation();
   useEffect(()=> {
    token !== "SIGNOUT" &&  userDetail()
   }, [token])
    const signOut = () => {
        dispatch(logout())
        push('/todoapp')
    }

    return (
        <Box bg={bg} p={2}>
            <HStack>
            <Spacer/><ColorModeSwitcher justifySelf="flex-end" />
            <Text mx={4}>{user.name}</Text>
            {token !== "SIGNOUT" && <Button colorScheme="teal" onClick={signOut} size="sm">Sign out</Button>}
             </HStack>
        </Box>
    )
}
