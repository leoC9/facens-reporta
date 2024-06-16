import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, TextArea } from "native-base";
import RNPickerSelect from "react-native-picker-select";
import React from "react";
import { Keyboard, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { useRecoilState, useRecoilValue } from "recoil";
import { ticketsState } from "../atoms/Tickets";
import { loggedUserState } from "../atoms/Users";

const TicketDetailScreen = () => {
  const params = useLocalSearchParams();
  const [tickets, setTickets] = useRecoilState(ticketsState);
  const loggedUser = useRecoilValue(loggedUserState);
  const isAdmin = loggedUser?.role === "admin";
  const ticket = JSON.parse(params?.ticket);

  console.log("AAAAAAAAAAAAAAAAAAAAAAAA", { ticket });
  const [observation, setObservation] = React.useState("");
  const [status, setStatus] = React.useState(ticket?.status);

  const handleResolve = () => {
    console.log("Ticket resolved");
    setTickets([
      ...tickets.filter((item) => item.id !== ticket.id),
      { ...ticket, status: status, observacao: observation },
    ]);
    router.back();
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <Container onPress={Keyboard.dismiss}>
        <Title>{ticket.title}</Title>
        <Description>{ticket.description}</Description>
        <InputContainer>
          <TitleLabel>Status do ticket:</TitleLabel>
          <RNPickerSelect
            style={pickerSelectStyles}
            disabled={!isAdmin}
            value={status}
            onValueChange={(value) => setStatus(value)}
            items={[
              { label: "Aberto", value: "Aberto" },
              { label: "Pendente", value: "Pendente" },
              { label: "Incompleto", value: "Incompleto" },
              { label: "Resolvido", value: "Resolvido" },
            ]}
          />
        </InputContainer>
        {isAdmin ? (
          <>
            <InputContainer>
              <TitleLabel>Observações (Opcional)</TitleLabel>
              <InputArea
                placeholder="Observação"
                value={observation}
                onChangeText={setObservation}
              />
            </InputContainer>
            <Button onPress={handleResolve}>
              <ButtonText>Confirmar</ButtonText>
            </Button>
          </>
        ) : (
          <>
            {ticket?.observacao && (
              <InputContainer>
                <TitleLabel>Observações</TitleLabel>
                <InputArea
                  isDisabled
                  placeholder="Observação"
                  value={ticket?.observacao}
                />
              </InputContainer>
            )}
            <Button
              onPress={() => {
                router.back();
              }}
            >
              <ButtonText>Voltar para listagem</ButtonText>
            </Button>
          </>
        )}
      </Container>
    </ScrollView>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
  gap: 10px;
  background-color: #f5f5f5;
`;

const Title = styled.Text`
  color: black;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const TitleLabel = styled.Text`
  color: black;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const InputContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 1px;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Description = styled.Text`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

const InputArea = styled(TextArea)`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Observation = styled.Text`
  font-size: 14px;
  color: #333;
`;

const Button = styled.TouchableOpacity`
  background-color: #3498db;
  padding: 15px;
  align-items: center;
  border-radius: 5px;
  width: 100%;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    borderStyle: "solid",
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

export default TicketDetailScreen;
