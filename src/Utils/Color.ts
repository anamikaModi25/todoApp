import { useColorModeValue } from "@chakra-ui/react";
import React from "react";

const Color = () => {
    const bg = useColorModeValue("white", "black");
    const color = useColorModeValue("black", "white");
    const heading = useColorModeValue("teal.600", "teal.100");

    return{
        bg,
        color,
        heading
    }
}

export default Color;