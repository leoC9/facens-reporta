import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Input, ScrollView } from "native-base";
import { router } from "expo-router";
import { userState } from "../atoms/Users";
import { useRecoilState } from "recoil";

const RegisterSchema = Yup.object().shape({
  cpf: Yup.string().required("Este campo é obrigatório"),
  phone: Yup.string().required("Este campo é obrigatório"),
  ra: Yup.string().required("Este campo é obrigatório"),
  email: Yup.string()
    .email("Invalid email")
    .required("Este campo é obrigatório"),
  password: Yup.string()
    .min(6, "Too short!")
    .required("Este campo é obrigatório"),
});

const RegisterScreen = () => {
  const [users, setUsers] = useRecoilState(userState);
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <Container>
        <Title>Crie sua conta</Title>
        <Formik
          initialValues={{
            cpf: "",
            phone: "",
            ra: "",
            email: "",
            role: "",
            password: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={(values) => {
            const checkNewUser = users.some(
              (item) => item?.email === values.email
            );
            if (checkNewUser) {
              Toast.show({
                type: "error",
                text1: "Erro ao criar conta",
                text2: "Usuário ja existe!",
              });
              return;
            }
            setUsers([...users, { ...values }]);
            Toast.show({
              type: "success",
              text1: "Sucesso ao criar conta",
              text2: "Usuário criado",
            });
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
                <TitleLabel>Insira seu CPF</TitleLabel>
                <InputComponent
                  placeholder="ex: 111.111.111-11"
                  onChangeText={handleChange("cpf")}
                  onBlur={handleBlur("cpf")}
                  value={values.cpf}
                />
                {touched.cpf && errors.cpf && (
                  <ErrorText>{errors.cpf}</ErrorText>
                )}
              </InputArea>
              <InputArea>
                <TitleLabel>Insira seu Telefone</TitleLabel>
                <InputComponent
                  placeholder="ex: (11) 11111-1111"
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                />
                {touched.phone && errors.phone && (
                  <ErrorText>{errors.phone}</ErrorText>
                )}
              </InputArea>
              <InputArea>
                <TitleLabel>Insira seu RA</TitleLabel>
                <InputComponent
                  placeholder="ex: 111111"
                  onChangeText={handleChange("ra")}
                  onBlur={handleBlur("ra")}
                  value={values.ra}
                />
                {touched.ra && errors.ra && <ErrorText>{errors.ra}</ErrorText>}
              </InputArea>
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
              <InputArea>
                <TitleLabel>Selecione sua função</TitleLabel>
                <RNPickerSelect
                  style={pickerSelectStyles}
                  value={values.role}
                  onValueChange={handleChange("role")}
                  items={[
                    { label: "-", value: "" },
                    { label: "Estudante", value: "student" },
                    { label: "Supervisor", value: "admin" },
                  ]}
                />
                {touched.role && errors.role && (
                  <ErrorText>{errors.role}</ErrorText>
                )}
              </InputArea>
              <InputArea>
                <TitleLabel>Insira sua senha</TitleLabel>
                <InputComponent
                  placeholder="ex: *********"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry
                />
                {touched.password && errors.password && (
                  <ErrorText>{errors.password}</ErrorText>
                )}
              </InputArea>
              <Button onPress={handleSubmit}>
                <ButtonText>Registrar</ButtonText>
              </Button>
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
  gap: 10px;
  padding: 20px;
  background-color: #f5f5f5;
`;

const InputComponent = styled(Input)`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
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
  margin-top: 20px;
  background-color: #3498db;
  padding: 15px;
  align-items: center;
  border-radius: 5px;
  width: 100%;
`;

const Title = styled.Text`
  color: black;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
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

const TitleLabel = styled.Text`
  color: black;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    borderStyle: "solid",
    width: "100%",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default RegisterScreen;
