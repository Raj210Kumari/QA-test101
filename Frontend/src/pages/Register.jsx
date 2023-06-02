import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Heading, Button } from "@chakra-ui/react";
import "../index.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const payload = {
      username: name,
      email,
      password,
    };
    try {
      let res = await fetch(
        "https://ill-gold-hippopotamus-hat.cyclic.app/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      let data = await res.json();
      let error = data.hasOwnProperty("error");
      console.log("data", error);
      if (error === true) alert(data.error);
      else {
        alert(data.msg)
        navigate("/login")
      };
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="registerContainer">
      <div>
        <Heading size="2xl" m="25px">
          Register Page
        </Heading>
      </div>
      <Input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        w="300px"
        border="2px solid black "
      />
      <br />
      <br />
      <Input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        w="300px"
        border="2px solid black "
      />
      <br />
      <br />
      <Input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPass(e.target.value)}
        w="300px"
        border="2px solid black "
      />
      <br />
      <br />
      <Button onClick={handleSubmit} p="6" fontSize="24px" fontWeight="900">
        Submit
      </Button>
    </div>
  );
};

export default Register;
