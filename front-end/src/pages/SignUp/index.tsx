import React, { useCallback, useRef } from "react";
import { FiArrowLeft, FiMail, FiLock, FiUser } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

import getValidationErrors from "../../utils/getValidationErrors";

import { useToast } from "../../hooks/Toast";

import api from "../../services/api";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Content, AnimationContainer } from "./styles";

import logoSignIn from "../../assets/logoSignIn.png";

interface SigUpFormData {
  fullname: string;
  email: string;
  secret_password: string;
}

const SignUp = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SigUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          fullname: Yup.string().required("The fullname field is required"),
          email: Yup.string()
            .required("The E-mail field is required")
            .email("Write a valid email"),
          secret_password: Yup.string().min(6, "At least 6 digits"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post("/users/create", data);

        addToast({
          type: "success",
          title: "Registration completed",
          description: "You can now login to Telegram!",
        })

        history.push("/dashboard");
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErrors(err);

          formRef.current?.setErrors(erros);

          return;
        }

        addToast({
          type: "error",
          title: "Authentication error",
          description: err.response.data.message,
        });
      }
    },
    [addToast, history]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoSignIn} alt="Telegram-Clone" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Sign Up</h1>

            <Input name="fullname" icon={FiUser} type="text" placeholder="Full-name" />
            <Input name="email" icon={FiMail} type="text" placeholder="Email" />
            <Input
              name="secret_password"
              icon={FiLock}
              type="password"
              placeholder="Password"
            />

            <Button type="submit">Sign Up</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Go Back
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
