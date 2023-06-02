import React from "react";
import { Link } from "react-router-dom";
import { Flex, Spacer,Box,Heading,ButtonGroup,Button } from '@chakra-ui/react'

const Home = () => {
  return (
    <div>
        <Box p="2">
          <Heading size="md">Assignment - Software QA Engineer</Heading>
        </Box>
      <Flex justifyContent="space-evenly">
        <ButtonGroup gap="2">
          <Link to="/register"><Button colorScheme="teal">Register</Button></Link>
          <Spacer/>
          <Spacer/>
          <Link to="/login"><Button colorScheme="teal">Login</Button></Link>
        </ButtonGroup>
      </Flex>
    </div>
  );
};

export default Home;
