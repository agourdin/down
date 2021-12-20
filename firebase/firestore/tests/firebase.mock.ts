import { USERS } from "./firebase.testconfig";

// setup testing environment
const mockEMAIL = USERS.ALICE.email;
const mockUID = USERS.ALICE.uid;

export const mockAliceUser = {
  emailVerified: true,
  isAnonymous: false,
  metadata: {},
  providerData: [],
  refreshToken: "",
  tenantId: "",
  delete: jest.fn(),
  getIdToken: jest.fn(),
  getIdTokenResult: jest.fn(),
  reload: jest.fn(),
  toJSON: jest.fn(),
  email: mockEMAIL,
  phoneNumber: "",
  displayName: "",
  photoURL: "",
  providerId: "",
  uid: mockUID,
};

export const mockAliceAuth = {
  auth: jest.fn().mockReturnThis(),
  currentUser: mockAliceUser,
  getProvider: () => {
    return {};
  },
  app: { name: "", options: {}, automaticDataCollectionEnabled: false },
  name: "",
  config: {
    apiKey: "",
    apiHost: "",
    apiScheme: "",
    tokenApiHost: "",
    sdkClientVersion: "",
  },
  setPersistence: jest.fn(),
  languageCode: "",
  tenantId: "",
  settings: { appVerificationDisabledForTesting: false },
  onAuthStateChanged: jest.fn(),
  onIdTokenChanged: jest.fn(),
  emulatorConfig: {
    _canInitEmulator: false,
    protocol: "",
    host: "",
    port: 0,
    options: { disableWarnings: false },
  },
  updateCurrentUser: jest.fn(),
  useDeviceLanguage: jest.fn(),
  signOut: jest.fn(),
};

const mockFirebaseAuth = () => {
  const UserCredentialMock = {
    user: {
      sendEmailVerification: jest.fn(),
      ...mockAliceUser,
    },
  };
  return {
    createUserWithEmailAndPassword: jest.fn(() => UserCredentialMock),
    signInWithEmailAndPassword: jest.fn(),
    sendPasswordResetEmail: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChanged: jest.fn(),
    initializeApp: jest.fn(),
    updatePassword: jest.fn(),
    updateEmail: jest.fn(),
    getAuth: () => {
      return mockAliceAuth;
    },
  };
};

jest.mock("firebase/auth", () => mockFirebaseAuth());
jest.mock("@firebase/auth", () => mockFirebaseAuth());
