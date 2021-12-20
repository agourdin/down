import { DownError } from "../errors";
import { mockAliceAuth } from "../../firebase/firestore/tests/firebase.mock";
import {
  NO_NO_WORDS_LIST,
  USERS,
} from "../../firebase/firestore/tests/firebase.testconfig";
import {
  validChatText,
  validEmails,
  validGroupOrUserIcon,
  validIcon,
  validName,
  validPasswords,
} from "../validators";

describe("unit:", () => {
  describe("validChatMessage", () => {
    test("should return true if message is valid", () => {
      expect(validChatText("this is a valid message.")).toBe(true);
    });
    test("should throw error if message is too long", () => {
      expect(() => {
        validChatText(
          `this message is much much much much much much much
        much much much much much much much much much much
        much much much much much much much much much much
        much much much much much much much much much much
        much much much much much much much much much much
        much much much much much much much much much much
        much much much much much much much much much much
        much much much much much much much much much much
        much much much much much much much much much much
        much much much much much much much much much much
        much much much much much much much much much much
        much much much much much much much much much much
        much much much much much much much much much much
        much much much much much much much much much much
        much much much much much much much much much much
        much much much much much much much much too long.`
        );
      }).toThrow(new DownError("message-too-long"));
    });

    NO_NO_WORDS_LIST.forEach((word) =>
      test(`should throw error if message has the word ${word} in it`, () => {
        expect(() => {
          validChatText(`this message has the word ${word} in it`);
        }).toThrow(new DownError("poor-word-choice"));
      })
    );
  });

  describe("validEmails", () => {
    test("should return true if one email is given and is valid", () => {
      expect(validEmails("a_valid@email.com")).toBe(true);
    });
    test("should return true if two emails are given and are valid and match", () => {
      expect(validEmails("a_valid@email.com", "a_valid@email.com")).toBe(true);
    });
    test("should throw error if email1 is blank", () => {
      expect(() => {
        validEmails("");
      }).toThrow(new DownError("email-empty"));
    });
    test("should throw error if email2 is blank", () => {
      expect(() => {
        validEmails("a_valid@email.com", "");
      }).toThrow(new DownError("email-empty"));
    });
    test("should throw error if emails don't match", () => {
      expect(() => {
        validEmails("a_valid@email.com", "another_valid@email.com");
      }).toThrow(new DownError("email-mismatch"));
    });
    test("should throw error if the provided email is the current user's email (i.e. Alice's)", () => {
      expect(() =>
        validEmails(USERS.ALICE.email, USERS.ALICE.email, mockAliceAuth)
      ).toThrow(new DownError("email-is-own-email"));
    });
  });

  describe("validName", () => {
    test("should return true if name is valid", () => {
      expect(validName("a valid name")).toBe(true);
    });
    test("should throw error if name is blank", () => {
      expect(() => {
        validName("");
      }).toThrow(new DownError("name-empty"));
    });
    test("should throw error if name is < 3 characters", () => {
      expect(() => {
        validName("a");
      }).toThrow(new DownError("name-too-short"));
    });
    test("should throw error if name is > 25 characters", () => {
      expect(() => {
        validName("a really really really really long name");
      }).toThrow(new DownError("name-too-long"));
    });
    NO_NO_WORDS_LIST.forEach((word) => {
      expect(() => {
        validName(word);
      }).toThrow(new DownError("poor-word-choice"));
    });
  });

  describe("validIcon", () => {
    test("should return true if icon is valid", () => {
      expect(validIcon("🎌")).toBe(true);
    });
    test("should throw error if icon is not in the valid icon list", () => {
      expect(() => {
        validIcon("A");
      }).toThrow(new DownError("icon-invalid"));
    });
  });

  describe("validGroupOrUserIcon", () => {
    test("should return true if icon is in the valid group/user icon list", () => {
      expect(validGroupOrUserIcon("🤓")).toBe(true);
    });
    test("should throw error if icon is not in the valid group/user icon list", () => {
      expect(() => {
        validGroupOrUserIcon("A");
      }).toThrow(new DownError("icon-invalid"));
    });
    test("should throw error if icon is not in the valid group/user icon list", () => {
      expect(() => {
        validGroupOrUserIcon("🎌");
      }).toThrow(new DownError("icon-invalid"));
    });
  });

  describe("validPasswords", () => {
    test("should return true if one password is given and is valid", () => {
      expect(validPasswords("a_valid_password_123")).toBe(true);
    });
    test("should return true if two passwords are given and are valid and match", () => {
      expect(
        validPasswords("a_valid_password_123", "a_valid_password_123")
      ).toBe(true);
    });
    test("should throw error if password1 is blank", () => {
      expect(() => {
        validPasswords("");
      }).toThrow(new DownError("password-empty"));
    });
    test("should throw error if password2 is blank", () => {
      expect(() => {
        validPasswords("a_valid_password_123", "");
      }).toThrow(new DownError("password-empty"));
    });
    test("should throw error if passwords don't match", () => {
      expect(() => {
        validPasswords(
          "a_valid_password_123",
          "a_different_valid_password_123"
        );
      }).toThrow(new DownError("password-mismatch"));
    });
  });
});
