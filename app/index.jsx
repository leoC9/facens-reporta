import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components/native";
import { Input, ScrollView, Text, View } from "native-base";
import { Link, router } from "expo-router";
import Toast from "react-native-toast-message";
import { Platform } from "expo-modules-core";
import { useRecoilState, useRecoilValue } from "recoil";
import { loggedUserState, userState } from "../atoms/Users";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email inválido!")
    .required("Este campo é obrigatório"),
  password: Yup.string()
    .min(6, "Senha muito curta!")
    .required("Este campo é obrigatório"),
});

const LoginScreen = ({ navigation }) => {
  const users = useRecoilValue(userState);
  const [loggedUser, setLoggedUser] = useRecoilState(loggedUserState);
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <Container>
        <Title>Facens Reporta</Title>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            const checkUserExists = users.filter(
              (item) => item.email === values.email
            );
            if (!checkUserExists.length > 0) {
              Toast.show({
                type: "error",
                text1: "Erro ao fazer login",
                text2: "Verifique se os dados estão corretos",
              });
              return;
            }
            console.log(checkUserExists);
            setLoggedUser(checkUserExists[0]);
            router.navigate("/ticketList");
            resetForm();
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
              <InputArea
                h={{
                  base: "400px",
                  lg: "auto",
                }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <TitleLabel>Insira seu email</TitleLabel>
                <InputComponent
                  placeholder="ex: teste@gmail.com"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <ErrorText>{errors.email}</ErrorText>
                )}
              </InputArea>
              <InputArea
                h={{
                  base: "400px",
                  lg: "auto",
                }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <TitleLabel>Insira sua senha</TitleLabel>
                <InputComponent
                  placeholder="ex: ********"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry
                />
                {touched.password && errors.password && (
                  <ErrorText>{errors.password}</ErrorText>
                )}
              </InputArea>
              <ButtonArea>
                <Button onPress={handleSubmit}>
                  <ButtonText>Login</ButtonText>
                </Button>
                <Button onPress={() => router.navigate("/register")}>
                  <ButtonText>Cadastrar</ButtonText>
                </Button>
              </ButtonArea>
              <ForgotPassword href="/forgotPassword">
                <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
              </ForgotPassword>
            </>
          )}
        </Formik>
      </Container>
    </ScrollView>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 20px;
  background-color: #f5f5f5;
`;

const InputArea = styled.KeyboardAvoidingView`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px;
`;

const TitleLabel = styled.Text`
  color: black;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const InputComponent = styled(Input)`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const ButtonArea = styled.View`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 20px;
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

const Title = styled.Text`
  font-size: 24px;
  margin: 10px 0;
`;

const ForgotPassword = styled(Link)`
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
