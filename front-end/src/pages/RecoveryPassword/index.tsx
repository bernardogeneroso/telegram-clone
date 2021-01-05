import React, { useCallback, useRef } from "react";
import { FiArrowLeft, FiLock } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import getValidationErrors from "../../utils/getValidationErrors";

import { useToast } from "../../hooks/Toast";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Content, AnimationContainer } from "./styles";

import logoSignIn from "../../assets/logoSignIn.png";

interface RecoveryPasswordFormData {
  password: string;
  password_confirmation: string;
}

const RecoveryPassword = () => {
  const formRef = useRef<FormHandles>(null);

  //const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: RecoveryPasswordFormData) => {
      addToast({
        type: "info",
        title: "This page is not finished",
      });

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required("The Password field is required"),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref("password"), undefined],
            "Passwords must match"
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        //await signIn({ email: data.email, password: data.password });

        //history.push("/dashboard");
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
    [addToast]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoSignIn} alt="Whatshapp-Clone" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recovery password</h1>

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="New password"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Password confirmation"
            />

            <Button type="submit">Recover password</Button>
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

export default RecoveryPassword;
