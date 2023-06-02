import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Heading, Button } from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    const payload = {
      email,
      password,
    };
    console.log(payload);
    fetch("https://ill-gold-hippopotamus-hat.cyclic.app/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        let error = res.hasOwnProperty("error");
      console.log("res", error);
      if (error === true) alert(res.error);
      else alert(res.msg);
        // console.log(res.user.token)
        localStorage.setItem(
          "token",
          JSON.stringify({ token: res.user.token })
        );
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err)
        alert("Invalid Credentials")
      });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "200px" }}>
      <Heading size="2xl">Login</Heading>
      <br />
      <Input
        w="500px"
        border="2px solid black "
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      <Input
        w="500px"
        border="2px solid black "
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <Button onClick={handleSubmit} p="6" fontSize="24px" fontWeight="900">
        Login
      </Button>
    </div>
  );
};

export { Login };
