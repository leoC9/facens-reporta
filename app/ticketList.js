import { router } from "expo-router";
import { Link } from "expo-router";
import React from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components/native";
import { ticketsState } from "../atoms/Tickets";
import { loggedUserState } from "../atoms/Users";

const tickets1 = [
  {
    id: "1",
    title: "Issue 1",
    description: "Description 1",
    status: "Aberto",
    reportedBy: "Student A",
  },
  {
    id: "2",
    title: "Issue 2",
    description: "Description 2",
    status: "Resolvido",
    reportedBy: "Student B",
  },
  // Adicione mais tickets conforme necessário
];

const TicketListScreen = ({ navigation, route }) => {
  //const isAdmin = route.params?.isAdmin;
  const [loggedUser, setLoggedUser] = useRecoilState(loggedUserState);

  const isAdmin = loggedUser?.role === "admin";
  const tickets = useRecoilValue(ticketsState);
  const ticketsRendered = isAdmin
    ? tickets.filter(
        (item) => item.status !== "INCOMPLETO" && item.status !== "RESOLVIDO"
      )
    : tickets.filter((item) => item?.reportedBy === loggedUser?.email);

  const renderTicket = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "ticketDetails",
          params: { ticket: JSON.stringify(item), isAdmin },
        })
      }
    >
      <TicketCard>
        <CardTitle>{item.title}</CardTitle>
        <Description>{item.description}</Description>
        <Status status={item.status}>{item.status}</Status>
        {isAdmin && (
          <ReportedBy>{`Reportado pelo email: ${item.reportedBy}`}</ReportedBy>
        )}
      </TicketCard>
    </TouchableOpacity>
  );

  return (
    <>
      <Container>
        <TitleArea>
          <View></View>
          <Title
            onPress={() => {
              router.back();
              setLoggedUser(null);
            }}
            style={{ color: "red", fontSize: "12px" }}
          >
            Sair
          </Title>
        </TitleArea>
        <TitleArea>
          <Title>Tickets</Title>
          {!isAdmin && (
            <Link href="/createTicket">
              <Title>+</Title>
            </Link>
          )}
        </TitleArea>
        <FlatList
          ListEmptyComponent={<EmptyTitle>Sem tickets para mostrar</EmptyTitle>}
          data={ticketsRendered}
          renderItem={renderTicket}
          keyExtractor={(item) => item?.id}
        />
      </Container>
    </>
  );
};
const ContainerKing = styled.View`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Container = styled.View`
  flex: 1;
  padding: 90px 13px 0px 13px;
  gap: 25px;
  background-color: #f5f5f5;
`;

const ContainerTop = styled.View`
  flex: 1;
  padding: 20px 13px 0px 13px;
  background-color: #f5f5f5;
`;

const TicketCard = styled.View`
  padding: 15px;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 5px;
  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-radius: 3.84;
  elevation: 5;
`;

const TitleArea = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;

const EmptyTitle = styled.Text`
  padding: 190px 0 10px 0;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

const CardTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const Description = styled.Text`
  font-size: 14px;
  color: #666;
  margin: 5px 0;
`;

const Status = styled.Text`
  font-size: 12px;
  color: ${(props) =>
    props.status === "Aberto"
      ? "green"
      : props.status === "Pendente"
      ? "yellow"
      : "red"};
`;

const ReportedBy = styled.Text`
  font-size: 12px;
  color: #333;
  margin-top: 5px;
`;

export default TicketListScreen;
