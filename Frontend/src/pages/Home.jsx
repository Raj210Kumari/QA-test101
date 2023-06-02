import React from "react";
import { Link } from "react-router-dom";
import { Flex, Spacer,Box,Heading,ButtonGroup,Button } from '@chakra-ui/react'

const Home = () => {
  return (
    <div >
        <Box p="8" mt="200px" >
          <Heading size="xl">Assignment - Software QA Engineer</Heading>
        </Box>
      <Flex justifyContent="space-evenly">
        <ButtonGroup gap="8">
          <Link to="/register"><Button colorScheme="teal" p="6" fontSize="24px" fontWeight="900">Register</Button></Link>
          <Spacer/>
          <Spacer/>
          <Link to="/login"><Button colorScheme="teal" p="6" fontSize="24px" fontWeight="900">Login</Button></Link>
        </ButtonGroup>
      </Flex>
    </div>
  );
};

export default Home;
