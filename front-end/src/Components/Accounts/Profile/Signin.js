import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const SignIn = ({ users, handleUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingUser = {
      email: email,
      password: password,
    };

    if (existingUser.password === "" || existingUser.email === "") {
      return toast.error("Please make sure to fill out both fields.", {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
      });
    }

    const checkUser = users.filter(
      (user) =>
        existingUser.email === user.email &&
        existingUser.password === user.password
    );

    if (checkUser.length > 0) {
      notify(checkUser[0]);
    }
  };

  const notify = (existingUser) => {
    toast.success(
      "You have been successfully signed in. \n You will be redirected in 3 seconds.",
      {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
      }
    );
    setTimeout(() => {
      handleUser(existingUser);
    }, 4100);

    clearForms();
  };

  const clearForms = () => {
    setPassword("");
    setEmail("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={email}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={password}
        />
      </Form.Group>
      <br />
      <Button variant="success" type="submit">
        Log In
      </Button>
    </Form>
  );
};

export default SignIn;
