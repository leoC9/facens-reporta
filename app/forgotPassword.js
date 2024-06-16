import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components/native";
import { Input, ScrollView } from "native-base";
import { router } from "expo-router";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const ForgotPassword = ({ navigation }) => {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <Container>
        <Title>Esqueceu sua senha?</Title>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={(values) => {
            console.log(values);
            router.back();
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
              <InputArea>
                <TitleLabel>Insira seu Email</TitleLabel>
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
              <Button onPress={handleSubmit}>
                <ButtonText>Enviar nova senha</ButtonText>
              </Button>
            </>
          )}
        </Formik>
      </Container>
    </ScrollView>
  );
};

const Title = styled.Text`
  color: black;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 20px;
  background-color: #f5f5f5;
`;

const InputComponent = styled(Input)`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const TitleLabel = styled.Text`
  color: black;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const InputArea = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  align-items: flex-start;
  gap: 3px;
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

const ErrorText = styled.Text`
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
`;

export default ForgotPassword;
