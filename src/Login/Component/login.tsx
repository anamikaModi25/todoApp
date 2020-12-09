import React, { useEffect, useState } from 'react';
import { Box, Grid, Text, FormLabel, Input, FormControl, Button, useToast } from '@chakra-ui/react'
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import Color from '../../Utils/Color';
import { todoApi } from '../../Utils/RTKQuery';
import { LoginState } from '../State/state';
import { Link, useHistory } from 'react-router-dom';
import { assert } from '../../Utils/assert';
import { loginApi } from '../../Utils/RTKQuery/loginApi';
import { useTypedSelector } from '../../Utils/store';
import { activeToken } from '../Slice/loginSlice';

export function Login() {
    const { push } = useHistory();
    const toast = useToast();
    const token = useTypedSelector(activeToken)
    const [formState, setFormState] = useState<LoginState>({
        email: "",
        password: ""
      });

    const {bg, color, heading} = Color();

    useEffect(() => {
        if(token !== "SIGNOUT"){
            push("/todo")
        }
    }, [token])

    const handleChange = ({
        target: { name, value }
      }: React.ChangeEvent<HTMLInputElement>) =>
        setFormState((prev) => ({ ...prev, [name]: value }));
    
    assert(
        todoApi.endpoints.login?.useMutation()
    )

    const [login, {isLoading}] = loginApi.endpoints.login.useMutation()
    console.log(token)
    const submit = () => {
        login(formState)
        .then((data) =>{
            if(data.error){
                toast({
                    title: "Failed to Authenticate",
                    description: "Incorrect email and password",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  })
            }else{
                push("/todo")
            }
            }
        )
    }  

    return (
        <Box textAlign="center" fontSize="xl">
            <Grid templateColumns="repeat(1, 1fr)" gap={9}>
                <Box w={{sm: "95%", md: "50%"}} bg={bg} shadow="md" px={{base: 5, md: 20}} py={10} mx="auto" mt="10%">
                    <Text fontSize="3xl" color={heading}>Login</Text>
                    <FormControl id="email" mt="4" >
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" name="email" value={formState.email} onChange={handleChange}/>
                    </FormControl>
                    <FormControl id="password" mt="5">
                        <FormLabel>Password</FormLabel>
                        <Input type="password" name="password" value={formState.password} onChange={handleChange}/>
                    </FormControl>
                    <Button colorScheme="teal" mt={10} onClick={submit}>{isLoading ? "...loading": "Login"}</Button>
                    <Text><Link to="/signup">Sign Up</Link></Text>
                </Box>
            </Grid>
        </Box>
    )
}

