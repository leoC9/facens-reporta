import { atom } from "recoil";

const tickets = [
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

export const userState = atom({
  key: "usersState",
  default: [],
});

export const loggedUserState = atom({
  key: "loggedUserState",
  default: null,
});
