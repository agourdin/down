const pop = () => "popped";

jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: jest.fn(() => ({
      pop: jest.fn(pop),
    })),
  };
});

jest.mock("firebase/firestore", () => ({
  ...jest.requireActual("firebase/firestore"),
  setDoc: jest.fn(),
}));

jest.mock("../../../firebase/firestore/users", () => ({
  ...jest.requireActual("../../../firebase/firestore/users"),
  setUserDoc: jest.fn(),
}));
