import React, { useState } from 'react';
import { Box, Grid, Text, FormLabel, Input, FormControl, Button, useToast } from '@chakra-ui/react'
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import Color from '../../Utils/Color';
import { todoApi } from '../../Utils/RTKQuery';
import { useHistory } from 'react-router-dom';
import { assert } from '../../Utils/assert';
import { loginApi } from '../../Utils/RTKQuery/loginApi';
import { UserRegistration } from '../../Login/State/state';
// import { useLoginMutation } from '../../Utils/RTKQuery'

export function SignUp() {
    const { push } = useHistory();
    const toast = useToast();
    const [formState, setFormState] = useState<UserRegistration>({
        name: "",
        email: "",
        password: "",
        age: 0
      });

    const {bg, color, heading} = Color();

    const handleChange = ({
        target: { name, value }
      }: React.ChangeEvent<HTMLInputElement>) =>
        setFormState((prev) => ({ ...prev, [name]: value }));
    
    assert(
        todoApi.endpoints.login?.useMutation()
    )

    const [signup, {isLoading}] = loginApi.endpoints.signup.useMutation()

    const submit = () => {
        signup(formState).then((data) => {
            if(data.error){
                toast({
                    title: "Failed to Signup",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  })
            }else{
                push("/todoapp")
            }
        })
    }  

    return (
        <Box textAlign="center" fontSize="xl">
            <Grid templateColumns="repeat(1, 1fr)" gap={5}>
                <Box w={{sm: "98%", md: "50%"}} bg={bg} shadow="md" px={{base: 10, md: 20}} py={10} mx="auto" mt="10%">
                    <Text fontSize="3xl" color={heading}>SignUp</Text>
                    <FormControl id="name" mt="4" >
                        <FormLabel>Name</FormLabel>
                         <Input type="text" name="name" value={formState.name} onChange={handleChange}/>
                    </FormControl>
                    <FormControl id="email" mt="4" >
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" name="email" value={formState.email} onChange={handleChange}/>
                    </FormControl>
                    <FormControl id="password" mt="5">
                        <FormLabel>Password</FormLabel>
                        <Input type="password" name="password" value={formState.password} onChange={handleChange}/>
                    </FormControl>
                    <FormControl id="age" mt="4" >
                        <FormLabel>Age</FormLabel>
                        <Input type="number" name="age" value={formState.age} onChange={handleChange}/>
                    </FormControl>
                    <Button colorScheme="teal" mt={10} onClick={submit}>Sign Up</Button>
                </Box>
            </Grid>
        </Box>
    )
}

