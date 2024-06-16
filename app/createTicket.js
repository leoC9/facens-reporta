import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components/native";
import { Input, ScrollView, TextArea } from "native-base";
import { Platform } from "expo-modules-core";
import { router } from "expo-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { ticketsState } from "../atoms/Tickets";
import { loggedUserState } from "../atoms/Users";

const TicketSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

const CreateTicket = ({ navigation }) => {
  const [tickets, setTickets] = useRecoilState(ticketsState);
  const loggedUser = useRecoilValue(loggedUserState);
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <Container>
        <Title>Nos diga seu problema!!!</Title>
        <Formik
          initialValues={{ title: "", description: "" }}
          validationSchema={TicketSchema}
          onSubmit={(values) => {
            console.log(values);
            // Adicione a lógica para criar um novo ticket aqui
            setTickets([
              ...tickets,
              {
                id: tickets?.length,
                title: values.title,
                description: values.description,
                status: "Aberto",
                reportedBy: loggedUser.email,
              },
            ]);
            router.navigate("/ticketList");
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
                <InputComponent
                  placeholder="Title"
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  value={values.title}
                />
                {touched.title && errors.title && (
                  <ErrorText>{errors.title}</ErrorText>
                )}
                <TextAreaComponent
                  placeholder="Description"
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={values.description}
                />
              </InputArea>
              {touched.description && errors.description && (
                <ErrorText>{errors.description}</ErrorText>
              )}
              <Button onPress={handleSubmit}>
                <ButtonText>Criar Ticket</ButtonText>
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
  align-items: flex-start;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Title = styled.Text`
  color: black;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const InputArea = styled.KeyboardAvoidingView`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  background-color: #f5f5f5;
  margin-bottom: 25px;
`;

const InputComponent = styled(Input)`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const TextAreaComponent = styled(TextArea)`
  width: 100%;
  padding: 10px;
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

const ErrorText = styled.Text`
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
`;

export default CreateTicket;
