import React, { useCallback, useRef } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

import getValidationErrors from "../../utils/getValidationErrors";

import { useAuth } from "../../hooks/Auth";
import { useToast } from "../../hooks/Toast";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Content, AnimationContainer } from "./styles";

import logoSignIn from "../../assets/logoSignIn.png";

interface SigInFormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SigInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required("The E-mail field is required")
            .email("Write a valid email"),
          password: Yup.string().required("The Password field is required"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({ email: data.email, secret_password: data.password });

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
          description: "Login error",
        });
      }
    },
    [addToast, history, signIn]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoSignIn} alt="Whatshapp-Clone" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Sign In</h1>

            <Input name="email" icon={FiMail} type="text" placeholder="Email" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Password"
            />

            <Button type="submit">Log In</Button>

            <Link to="/forgot-password">I forgot my password</Link>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Create account
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
