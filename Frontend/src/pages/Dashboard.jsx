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
      let res = await fetch(`https://ill-gold-hippopotamus-hat.cyclic.app/sprint/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token.token,
        },
        body: JSON.stringify(text),
      });
      let data = await res.json();
      console.log(data);
      setLoadingPage(!loadingPage);
    } catch (error) {
      console.log(error);
    }
  };
  const getData = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    try {
      let res = await fetch(`https://ill-gold-hippopotamus-hat.cyclic.app/sprint/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token.token,
        },
      });
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
      let res = await fetch(`https://ill-gold-hippopotamus-hat.cyclic.app/sprint/delete/${sprintId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token.token,
        },
      });
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
      let res = await fetch(`https://ill-gold-hippopotamus-hat.cyclic.app/sprint/update/${updateId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: token.token,
        },
        body: JSON.stringify(updatedText),
      });
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
    <div>
      <div>
        <h1>Dashboard</h1>
        <input
          type="text"
          name="task"
          onChange={handleChange}
          placeholder="enter task"
        />
        <input
          type="date"
          name="date"
          onChange={handleChange}
          max={currentDate}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        <div>
          <h1>All Task</h1>
        </div>
        <div>
          <div>
            {/* <p>{el.date}----{el.task}</p> */}
            {/* <button onClick={() => updateData(el._id)}>Update</button> update is no working */}
            {/* <button onClick={()=>deleteData(el._id)}>Deleted</button> */}
            <table>
              <thead>
                <tr>
                  <th style={{ width: "200px" }}>Date</th>
                  <th style={{ width: "500px" }}>Task</th>
                </tr>
              </thead>
              {allTask ? (
                allTask.map((el) => {
                  return (
                    <tbody key={el._id}>
                      <tr>
                        <td>{el.date}</td>
                        <td>{el.task}</td>
                        <td>
                          <button onClick={() => deleteData(el._id)}>
                            Deleted
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              onOpen();
                              setUpdateId(el._id);
                            }}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })
              ) : (
                <Text>No task are present in backend</Text>
              )}
            </table>
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