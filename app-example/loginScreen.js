import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components/native";
import { Input } from "native-base";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too short!").required("Required"),
});

const LoginScreen = ({ navigation }) => {
  return (
    <Container>
      <InputComponent
        placeholder="Email"
        onChangeText={handleChange("email")}
        onBlur={handleBlur("email")}
        value={values.email}
      />
      <Formik
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          console.log(values);
          // Adicione a lógica de autenticação aqui
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <InputComponent
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email && (
              <ErrorText>{errors.email}</ErrorText>
            )}
            <InputComponent
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <ErrorText>{errors.password}</ErrorText>
            )}
            <Button onPress={handleSubmit}>
              <ButtonText>Login</ButtonText>
            </Button>
            <ForgotPassword
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
            </ForgotPassword>
          </>
        )}
      </Formik>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

const InputComponent = styled(Input)`
  width: 100%;
  color: black;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.TouchableOpacity`
  background-color: #3498db;
  padding: 15px;
  align-items: center;
  border-radius: 5px;
  width: 100%;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const ForgotPassword = styled.TouchableOpacity`
  margin-top: 10px;
`;

const ForgotPasswordText = styled.Text`
  color: #3498db;
  font-size: 14px;
`;

const ErrorText = styled.Text`
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
`;

export default LoginScreen;
