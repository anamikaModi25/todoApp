import React, { useEffect } from 'react';
import { Box, Grid, Text, Button, GridItem, List, ListItem, Flex, Spacer } from '@chakra-ui/react';
import Color from '../../Utils/Color';
import { activeToken } from '../../Login/Slice/loginSlice';
import { useTypedSelector } from '../../Utils/store';
import { taskApi } from '../../Utils/RTKQuery/taskApi';
import { AddTask } from './addTask';
import { allTasks } from '../Slice/taskSlice';
import { ReactComponent as DeleteIcon } from '../../Svg/red-x.svg';

export function ToDo() {
    const { bg, color, heading } = Color();
    const token = useTypedSelector(activeToken)
    const task = useTypedSelector(allTasks);
    const [getTask, { isLoading }] = taskApi.endpoints.getTask.useMutation();
    const [updateTask, {isLoading: isUpdating}] = taskApi.endpoints.updateTask.useMutation();
    const [deleteTask] = taskApi.endpoints.deleteTask.useMutation();

    useEffect(() => {
        getTask();
    }, [token])

    const update = (_id: string, completed: boolean) => {
        updateTask({_id, completed})
    }

    const removeTask = (_id: string) => {
        deleteTask({_id}).then(() => getTask())
    }

    return (
        <Box fontSize="xl">
            <Box fontSize="m">
                    <AddTask />
                <Grid templateColumns="repeat(5, 1fr)" >
                <GridItem colSpan={{base: 5, md: 3}} p={9}>
                        <List spacing={3}>
                            {task.map((task, i) => 
                                <ListItem key={i}>
                                    <Flex>
                                        {/* <i className="fa fa-pencil" style={{color: color, margin: "1% 3%", fontSize: "18px"}}></i> */}
                                        <Text>{task.description}</Text>
                                        <Spacer />
                                        <Button colorScheme="teal" size="xs"  onClick={() => update(task._id, !task.completed)}>{task.completed ? "Completed" : "Complete"}</Button>
                                        <Box px={2} onClick={() => removeTask(task._id)} cursor="pointer"><DeleteIcon/></Box>
                                        </Flex>
                                </ListItem>
                            )}
                        </List>
                    </GridItem>
                </Grid>
            </Box>
        </Box>
    )
}
