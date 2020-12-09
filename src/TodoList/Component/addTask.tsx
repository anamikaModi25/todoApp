import React, { useEffect, useState } from 'react';
import { Box, Grid, Text, FormLabel, Input, FormControl, Button, GridItem, List, ListIcon, ListItem, useToast, Flex } from '@chakra-ui/react'
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { useHistory } from 'react-router-dom';
import Color from '../../Utils/Color';
import { loginApi } from '../../Utils/RTKQuery/loginApi';
import { activeToken, logout } from '../../Login/Slice/loginSlice';
import { useAppDispatch, useTypedSelector } from '../../Utils/store';
import { taskApi } from '../../Utils/RTKQuery/taskApi';
import { AddTaskState } from '../Slice/state';

export function AddTask() {
    const { bg, color, heading } = Color();
    const token = useTypedSelector(activeToken);
    const toast = useToast();

    const [addTask, { isLoading }] = taskApi.endpoints.addTask.useMutation();

    const [formState, setFormState] = useState<AddTaskState>({
        description: ""
    });

    const handleChange = ({
        target: { name, value }
    }: React.ChangeEvent<HTMLInputElement>) =>
        setFormState((prev) => ({ ...prev, [name]: value }));

    const submit = () => {
        addTask(formState)
        .then((data) => {
            if(data.error){
                toast({
                    title: "Failed to Add task",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  })
            }else{
                setFormState({description: ""});
                toast({
                    title: "Task Added",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  })
            }
        })
    }

    return (
        <Box p={{base: 5, md: 9}} >
        <Text fontSize="3xl" color={heading}>Add Task</Text>
        <Flex>
        <FormControl id="email" mt="4" >
            <FormLabel>Task Name</FormLabel>
            <Input type="email" name="description" value={formState.description} onChange={handleChange} />
        </FormControl>
        <Button colorScheme="teal" mt={12} mx={{base: 2, md: 10}} onClick={submit}>{isLoading ? "...loading" : "Add"}</Button>
        </Flex>
    </Box>
    )
}
