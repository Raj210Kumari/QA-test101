import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const Dashboard = () => {
  const [text, setText] = useState({
    task: "",
    date: "",
  });

  const [updatedText, setUpdatedText] = useState({
    task: "",
    date: "",
  });

  const [allTask, setAllTask] = useState("");

  const [loadingPage, setLoadingPage] = useState(true);

  let [updateId, setUpdateId] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setText((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUpdateChange = (event) => {
    const { name, value } = event.target;
    setUpdatedText((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    try {
      let res = await fetch(
        `https://ill-gold-hippopotamus-hat.cyclic.app/sprint/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token.token,
          },
          body: JSON.stringify(text),
        }
      );
      let data = await res.json();
      console.log(data);
      setText(() =>{
        return {
          task : "",
          date : ""
        }
      })
      setLoadingPage(!loadingPage);
    } catch (error) {
      console.log(error);
    }
  };
  const getData = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    try {
      let res = await fetch(
        `https://ill-gold-hippopotamus-hat.cyclic.app/sprint/get`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token.token,
          },
        }
      );
      let data = await res.json();
      console.log(data);
      setAllTask(data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteData = async (sprintId) => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    try {
      let res = await fetch(
        `https://ill-gold-hippopotamus-hat.cyclic.app/sprint/delete/${sprintId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: token.token,
          },
        }
      );
      alert("Todo deleted successfully");
      let data = await res.json();
      console.log(data);
      setLoadingPage(!loadingPage);
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    try {
      let res = await fetch(
        `https://ill-gold-hippopotamus-hat.cyclic.app/sprint/update/${updateId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            token: token.token,
          },
          body: JSON.stringify(updatedText),
        }
      );
      alert("Task updated successfully");
      let data = await res.json();
      console.log(data);
      setLoadingPage(!loadingPage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [loadingPage]);

  const currentDate = new Date().toISOString().split("T")[0];

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  console.log(updateId);

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <Heading size="2xl" m="50px">
          Dashboard
        </Heading>
        <div>
          <Input
            type="text"
            name="task"
            value={text.task}
            onChange={handleChange}
            placeholder="Enter your task Details"
            w="500px"
            border="2px solid black "
            marginRight="10px"
          />
          <Input
            type="date"
            name="date"
            value={text.date}
            onChange={handleChange}
            max={currentDate}
            w="160px"
            border="2px solid black "
            marginRight="10px"
          />
          <Button
            onClick={handleSubmit}
            p="6"
            marginRight="10px"
            fontSize="24px"
            fontWeight="900"
          >
            Submit
          </Button>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div>
          <Heading size="2xl" m="50px">
            All Task
          </Heading>
        </div>
        <div>
          <div style={{ textAlign: "center" }}>
            <TableContainer w="80%" ml="10%">
              <Table colorScheme="black">
                <Thead backgroundColor="#000">
                  <Tr>
                    <Th fontSize="24px" color="#fff" padding="20px" w="20%">
                      Date
                    </Th>
                    <Th fontSize="24px" color="#fff" w="60%">
                      Task
                    </Th>
                    <Th fontSize="24px" color="#fff" w="10%">
                      Delete Task
                    </Th>
                    <Th fontSize="24px" color="#fff" w="10%">
                      Update Task
                    </Th>
                  </Tr>
                </Thead>
                {allTask ? (
                  allTask.map((el) => {
                    return (
                      <Tbody key={el._id}>
                        <Tr border="1px solid black">
                          <Td >{el.date}</Td>
                          <Td>{el.task}</Td>
                          <Td>
                            <Button
                              onClick={() => deleteData(el._id)}
                              ml="50px"
                              bg="red"
                              color="#fff"
                              fontWeight="900"
                            >
                              Deleted
                            </Button>
                          </Td>
                          <Td>
                            <Button
                              onClick={() => {
                                onOpen();
                                setUpdateId(el._id);
                              }}
                              ml="50px"
                              bg="red"
                              color="#fff"
                              fontWeight="900"
                            >
                              Update
                            </Button>
                          </Td>
                        </Tr>
                      </Tbody>
                    );
                  })
                ) : (
                  <Text>No task are present in backend</Text>
                )}
              </Table>
            </TableContainer>
          </div>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit your task</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Task</FormLabel>
                  <Input
                    ref={initialRef}
                    type="text"
                    name="task"
                    placeholder="Task"
                    onChange={handleUpdateChange}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Data</FormLabel>
                  <Input
                    finalFocusRef={finalRef}
                    type="date"
                    name="date"
                    max={currentDate}
                    onChange={handleUpdateChange}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    onClose();
                    updateData();
                  }}
                >
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
