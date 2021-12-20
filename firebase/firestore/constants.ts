export declare type Paths = {
  users: "users";
  private: "private";
  groups: "groups";
  name: "name";
  icon: "icon";
  members: "members";
  down: "down";
  chat: "chat";
  messages: "messages";
  lastMessage: "lastMessage";
  seenBy: "seenBy";
  invites: "invites";
  mail: "mail";
  data: "data";
};

export declare type InviteStatuses = {
  pending: "pending";
  accepted: "accepted";
  ignored: "ignored";
  blocked: "blocked";
  all: "all";
};

type FIRESTORE = {
  PATHS: {
    USERS: Paths["users"];
    GROUPS: Paths["groups"];
    MEMBERS: Paths["members"];
    INVITES: Paths["invites"];
    PRIVATE: Paths["private"];
    DATA: Paths["data"];
    DOWN: Paths["down"];
    CHAT: Paths["chat"];
    MAIL: Paths["mail"];
    NAME: Paths["name"];
    ICON: Paths["icon"];
  };
  GROUPS: {
    DELETE_CHAT_DURATION: number;
  };
  INVITES: {
    STATUSES: {
      PENDING: InviteStatuses["pending"];
      ACCEPTED: InviteStatuses["accepted"];
      IGNORED: InviteStatuses["ignored"];
      BLOCKED: InviteStatuses["blocked"];
      ALL: InviteStatuses["all"];
    };
  };
  ERRORS: {
    NO_USER_ID_FOUND: "000--NO--USER--ID--FOUND--000";
    NO_USER_EMAIL_FOUND: "000--NO--USER--EMAIL--FOUND--000";
  };
};

export const FIRESTORE: FIRESTORE = {
  PATHS: {
    USERS: "users",
    GROUPS: "groups",
    MEMBERS: "members",
    INVITES: "invites",
    PRIVATE: "private",
    DATA: "data",
    DOWN: "down",
    CHAT: "chat",
    MAIL: "mail",
    NAME: "name",
    ICON: "icon",
  },
  GROUPS: {
    DELETE_CHAT_DURATION: 2 * 60 * 60 * 1000,
  },
  INVITES: {
    STATUSES: {
      PENDING: "pending",
      ACCEPTED: "accepted",
      IGNORED: "ignored",
      BLOCKED: "blocked",
      ALL: "all",
    },
  },
  ERRORS: {
    NO_USER_ID_FOUND: "000--NO--USER--ID--FOUND--000",
    NO_USER_EMAIL_FOUND: "000--NO--USER--EMAIL--FOUND--000",
  },
};

export const NO_NO_WORDS_REGEX =
  /((c|k|ck|q)un[t\+][s\$]?)|((c|k|ck|q)un[t\+][l1][i1](c|k|ck|q))|((c|k|ck|q)un[t\+][l1][i1](c|k|ck|q)[e3]r)|((c|k|ck|q)un[t\+][l1][i1](c|k|ck|q)[i1]ng)|((ph|f)[a@]g[s\$]?)|((ph|f)[a@]gg[i1]ng)|((ph|f)[a@]gg?[o0][t\+][s\$]?)|((ph|f)[a@]gg[s\$])|(h[o0]m?m[o0])|(n[i1]gg?[e3]r[s\$]?)|(pu[s\$][s\$][i1][e3][s\$])|(pu[s\$][s\$]y[s\$]?)|([s\$][l1]u[t\+][s\$]?)|([ck]+[i]+[ck]+[e3]+)|([t\+]w[a@][t\+][s\$]?)/;

export const VALID_USER_ICONS = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "🤣",
  "😂",
  "🙂",
  "🙃",
  "😉",
  "😊",
  "😇",
  "🥰",
  "😍",
  "🤩",
  "😘",
  "😗",
  "☺",
  "😚",
  "😙",
  "🥲",
  "😋",
  "😛",
  "😜",
  "🤪",
  "😝",
  "🤑",
  "🤗",
  "🤭",
  "🤫",
  "🤔",
  "🤐",
  "🤨",
  "😐",
  "😑",
  "😶",
  "😶‍🌫️",
  "😏",
  "😒",
  "🙄",
  "😬",
  "😮‍💨",
  "🤥",
  "😌",
  "😔",
  "😪",
  "🤤",
  "😴",
  "😷",
  "🤒",
  "🤕",
  "🤢",
  "🤮",
  "🤧",
  "🥵",
  "🥶",
  "🥴",
  "😵",
  "😵‍💫",
  "🤯",
  "🤠",
  "🥳",
  "🥸",
  "😎",
  "🤓",
  "🧐",
  "😕",
  "😟",
  "🙁",
  "☹",
  "😮",
  "😯",
  "😲",
  "😳",
  "🥺",
  "😦",
  "😧",
  "😨",
  "😰",
  "😥",
  "😢",
  "😭",
  "😱",
  "😖",
  "😣",
  "😞",
  "😓",
  "😩",
  "😫",
  "🥱",
  "😤",
  "😡",
  "😠",
  "🤬",
  "😈",
  "👿",
  "💀",
  "☠",
  "💩",
  "🤡",
  "👹",
  "👺",
  "👻",
  "👽",
  "👾",
  "🤖",
  "😺",
  "😸",
  "😹",
  "😻",
  "😼",
  "😽",
  "🙀",
  "😿",
  "😾",
  "🙈",
  "🙉",
  "🙊",
  "🧑‍⚕️",
  "🧑‍🎓",
  "🧑‍⚖️",
  "🧑‍🏭",
  "🧑‍💼",
  "🧑‍🔬",
  "🧑‍✈️",
  "🧑‍🚒",
  "👮",
  "🕵",
  "🧑‍🎄",
  "🦸",
  "🦹",
  "🧙",
  "🧚",
  "🧛",
  "🧜",
  "🧝",
  "🧞",
  "🧟",
];

export const VALID_GROUP_ICONS = [
  "💯",
  "💫",
  "🕳",
  "💣",
  "💬",
  "💭",
  "💤",
  "✍",
  "💅",
  "🤳",
  "💪",
  "🦾",
  "🦿",
  "🦵",
  "👀",
  "👁",
  "👅",
  "👄",
  "👶",
  "👧",
  "🧑",
  "👱",
  "🧔",
  "🧓",
  "🤦",
  "🤷",
  "🥷",
  "🤴",
  "👸",
  "🤵",
  "👰",
  "🤱",
  "🧑‍🍼",
  "👼",
  "🧑‍🎄",
  "🦸",
  "🦹",
  "🧙",
  "🧚",
  "🧛",
  "🧜‍♀️",
  "🧝",
  "🧞",
  "🧟",
  "🚶",
  "🧑‍🦯",
  "🧑‍🦼",
  "🏃",
  "👯",
  "🧖",
  "🧗",
  "🤺",
  "🏇",
  "⛷",
  "🏂",
  "🏌",
  "🏄",
  "🚣",
  "🏊",
  "⛹",
  "🏋",
  "🚴",
  "🚵",
  "🤸",
  "🤼",
  "🤽",
  "🤾",
  "🤹",
  "🧘",
  "💏",
  "👪",
  "🗣",
  "🫂", // hugging
  "🌷",
  "🌱",
  "🥞",
  "🍕",
  "🌮",
  "🌯",
  "🥣",
  "🍣",
  "🍩",
  "🍭",
  "🍶",
  "🍾",
  "🍻",
  "🥂",
  "🧃",
  "🔪",
  "🧭",
  "🌋",
  "🗻",
  "🏡",
  "🗽",
  "⛪",
  "🕌",
  "🛕",
  "🕍",
  "⛺",
  "🌃",
  "🌄",
  "🎢",
  "🏎",
  "🏍",
  "🛵",
  "🛴",
  "🛹",
  "⛵",
  "🛶",
  "🚤",
  "🛥",
  "✈",
  "🪂",
  "💺",
  "🚁",
  "🚠",
  "🚀",
  "🛸",
  "🧳",
  "⏰",
  "🌑",
  "🌕",
  "🌙",
  "🌚",
  "🌛",
  "🌜",
  "🌝",
  "🌞",
  "🪐",
  "⭐",
  "🌠",
  "🌌",
  "☁",
  "⛅",
  "🌈",
  "☔",
  "⛱",
  "⚡",
  "❄",
  "🔥",
  "💧",
  "🌊",
  "🎃",
  "🎄",
  "🧨",
  "✨",
  "🎈",
  "🎉",
  "🎁",
  "🏆",
  "⚽",
  "⚾",
  "🥎",
  "🏀",
  "🏐",
  "🏈",
  "🏉",
  "🎾",
  "🥏",
  "🎳",
  "🏏",
  "🏑",
  "🏒",
  "🥍",
  "🏓",
  "🏸",
  "🥊",
  "🥋",
  "🥅",
  "⛳",
  "⛸",
  "🎣",
  "🤿",
  "🎽",
  "🎿",
  "🛷",
  "🥌",
  "🎯",
  "🪀",
  "🪁",
  "🎱",
  "🔮",
  "🎮",
  "🕹",
  "🎲",
  "🧩",
  "🎭",
  "🎨",
  "🧵",
  "🧶",
  "🎼",
  "🎵",
  "🎶",
  "🎤",
  "🎧",
  "📻",
  "🎷",
  "🎸",
  "🎹",
  "🎺",
  "🎻",
  "🪕",
  "🥁",
  "💻",
  "🎥",
  "🎬",
  "📺",
  "📸",
  "📚",
  "📓",
  "✏",
  "🖋",
  "🖌",
  "⚒",
  "🛠",
  "🗡",
  "⚔",
  "🏹",
  "🧰",
  "🔬",
  "🔭",
  "🩸",
  "🩺",
  "🛋",
  "🧽",
  "🛒",
  "🪦",
  "🗿",
  "🚸",
  "🚭",
  "📵",
  "🔞",
  "🛐",
  "⚛",
  "🕉",
  "✡",
  "☸",
  "☯",
  "✝",
  "☦",
  "☪",
  "☮",
];

export const VALID_GROUP_AND_USER_ICONS = [
  ...VALID_USER_ICONS,
  ...VALID_GROUP_ICONS,
];

export const ALL_VALID_ICONS = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "🤣",
  "😂",
  "🙂",
  "🙃",
  "🫠",
  "😉",
  "😊",
  "😇",
  "🥰",
  "😍",
  "🤩",
  "😘",
  "😗",
  "☺",
  "😚",
  "😙",
  "🥲",
  "😋",
  "😛",
  "😜",
  "🤪",
  "😝",
  "🤑",
  "🤗",
  "🤭",
  "🫢",
  "🫣",
  "🤫",
  "🤔",
  "🫡",
  "🤐",
  "🤨",
  "😐",
  "😑",
  "😶",
  "🫥",
  "😶‍🌫️",
  "😏",
  "😒",
  "🙄",
  "😬",
  "😮‍💨",
  "🤥",
  "😌",
  "😔",
  "😪",
  "🤤",
  "😴",
  "😷",
  "🤒",
  "🤕",
  "🤢",
  "🤮",
  "🤧",
  "🥵",
  "🥶",
  "🥴",
  "😵",
  "😵‍💫",
  "🤯",
  "🤠",
  "🥳",
  "🥸",
  "😎",
  "🤓",
  "🧐",
  "😕",
  "🫤",
  "😟",
  "🙁",
  "☹",
  "😮",
  "😯",
  "😲",
  "😳",
  "🥺",
  "🥹",
  "😦",
  "😧",
  "😨",
  "😰",
  "😥",
  "😢",
  "😭",
  "😱",
  "😖",
  "😣",
  "😞",
  "😓",
  "😩",
  "😫",
  "🥱",
  "😤",
  "😡",
  "😠",
  "🤬",
  "😈",
  "👿",
  "💀",
  "☠",
  "💩",
  "🤡",
  "👹",
  "👺",
  "👻",
  "👽",
  "👾",
  "🤖",
  "😺",
  "😸",
  "😹",
  "😻",
  "😼",
  "😽",
  "🙀",
  "😿",
  "😾",
  "🙈",
  "🙉",
  "🙊",
  "💋",
  "💌",
  "💘",
  "💝",
  "💖",
  "💗",
  "💓",
  "💞",
  "💕",
  "💟",
  "❣",
  "💔",
  "❤️‍🔥",
  "❤️‍🩹",
  "❤",
  "🧡",
  "💛",
  "💚",
  "💙",
  "💜",
  "🤎",
  "🖤",
  "🤍",
  "💯",
  "💢",
  "💥",
  "💫",
  "💦",
  "💨",
  "🕳",
  "💣",
  "💬",
  "👁️‍🗨️",
  "🗨",
  "🗯",
  "💭",
  "💤",
  "👋",
  "🤚",
  "🖐",
  "✋",
  "🖖",
  "🫱",
  "🫲",
  "🫳",
  "🫴",
  "👌",
  "🤌",
  "🤏",
  "✌",
  "🤞",
  "🫰",
  "🤟",
  "🤘",
  "🤙",
  "👈",
  "👉",
  "👆",
  "🖕",
  "👇",
  "☝",
  "🫵",
  "👍",
  "👎",
  "✊",
  "👊",
  "🤛",
  "🤜",
  "👏",
  "🙌",
  "🫶",
  "👐",
  "🤲",
  "🤝",
  "🙏",
  "✍",
  "💅",
  "🤳",
  "💪",
  "🦾",
  "🦿",
  "🦵",
  "🦶",
  "👂",
  "🦻",
  "👃",
  "🧠",
  "🫀",
  "🫁",
  "🦷",
  "🦴",
  "👀",
  "👁",
  "👅",
  "👄",
  "🫦",
  "👶",
  "🧒",
  "👦",
  "👧",
  "🧑",
  "👱",
  "👨",
  "🧔",
  "🧔‍♂️",
  "🧔‍♀️",
  "👨‍🦰",
  "👨‍🦱",
  "👨‍🦳",
  "👨‍🦲",
  "👩",
  "👩‍🦰",
  "🧑‍🦰",
  "👩‍🦱",
  "🧑‍🦱",
  "👩‍🦳",
  "🧑‍🦳",
  "👩‍🦲",
  "🧑‍🦲",
  "👱‍♀️",
  "👱‍♂️",
  "🧓",
  "👴",
  "👵",
  "🙍",
  "🙍‍♂️",
  "🙍‍♀️",
  "🙎",
  "🙎‍♂️",
  "🙎‍♀️",
  "🙅",
  "🙅‍♂️",
  "🙅‍♀️",
  "🙆",
  "🙆‍♂️",
  "🙆‍♀️",
  "💁",
  "💁‍♂️",
  "💁‍♀️",
  "🙋",
  "🙋‍♂️",
  "🙋‍♀️",
  "🧏",
  "🧏‍♂️",
  "🧏‍♀️",
  "🙇",
  "🙇‍♂️",
  "🙇‍♀️",
  "🤦",
  "🤦‍♂️",
  "🤦‍♀️",
  "🤷",
  "🤷‍♂️",
  "🤷‍♀️",
  "🧑‍⚕️",
  "👨‍⚕️",
  "👩‍⚕️",
  "🧑‍🎓",
  "👨‍🎓",
  "👩‍🎓",
  "🧑‍🏫",
  "👨‍🏫",
  "👩‍🏫",
  "🧑‍⚖️",
  "👨‍⚖️",
  "👩‍⚖️",
  "🧑‍🌾",
  "👨‍🌾",
  "👩‍🌾",
  "🧑‍🍳",
  "👨‍🍳",
  "👩‍🍳",
  "🧑‍🔧",
  "👨‍🔧",
  "👩‍🔧",
  "🧑‍🏭",
  "👨‍🏭",
  "👩‍🏭",
  "🧑‍💼",
  "👨‍💼",
  "👩‍💼",
  "🧑‍🔬",
  "👨‍🔬",
  "👩‍🔬",
  "🧑‍💻",
  "👨‍💻",
  "👩‍💻",
  "🧑‍🎤",
  "👨‍🎤",
  "👩‍🎤",
  "🧑‍🎨",
  "👨‍🎨",
  "👩‍🎨",
  "🧑‍✈️",
  "👨‍✈️",
  "👩‍✈️",
  "🧑‍🚀",
  "👨‍🚀",
  "👩‍🚀",
  "🧑‍🚒",
  "👨‍🚒",
  "👩‍🚒",
  "👮",
  "👮‍♂️",
  "👮‍♀️",
  "🕵",
  "🕵️‍♂️",
  "🕵️‍♀️",
  "💂",
  "💂‍♂️",
  "💂‍♀️",
  "🥷",
  "👷",
  "👷‍♂️",
  "👷‍♀️",
  "🫅",
  "🤴",
  "👸",
  "👳",
  "👳‍♂️",
  "👳‍♀️",
  "👲",
  "🧕",
  "🤵",
  "🤵‍♂️",
  "🤵‍♀️",
  "👰",
  "👰‍♂️",
  "👰‍♀️",
  "🤰",
  "🫃",
  "🫄",
  "🤱",
  "👩‍🍼",
  "👨‍🍼",
  "🧑‍🍼",
  "👼",
  "🎅",
  "🤶",
  "🧑‍🎄",
  "🦸",
  "🦸‍♂️",
  "🦸‍♀️",
  "🦹",
  "🦹‍♂️",
  "🦹‍♀️",
  "🧙",
  "🧙‍♂️",
  "🧙‍♀️",
  "🧚",
  "🧚‍♂️",
  "🧚‍♀️",
  "🧛",
  "🧛‍♂️",
  "🧛‍♀️",
  "🧜",
  "🧜‍♂️",
  "🧜‍♀️",
  "🧝",
  "🧝‍♂️",
  "🧝‍♀️",
  "🧞",
  "🧞‍♂️",
  "🧞‍♀️",
  "🧟",
  "🧟‍♂️",
  "🧟‍♀️",
  "🧌",
  "💆",
  "💆‍♂️",
  "💆‍♀️",
  "💇",
  "💇‍♂️",
  "💇‍♀️",
  "🚶",
  "🚶‍♂️",
  "🚶‍♀️",
  "🧍",
  "🧍‍♂️",
  "🧍‍♀️",
  "🧎",
  "🧎‍♂️",
  "🧎‍♀️",
  "🧑‍🦯",
  "👨‍🦯",
  "👩‍🦯",
  "🧑‍🦼",
  "👨‍🦼",
  "👩‍🦼",
  "🧑‍🦽",
  "👨‍🦽",
  "👩‍🦽",
  "🏃",
  "🏃‍♂️",
  "🏃‍♀️",
  "💃",
  "🕺",
  "🕴",
  "👯",
  "👯‍♂️",
  "👯‍♀️",
  "🧖",
  "🧖‍♂️",
  "🧖‍♀️",
  "🧗",
  "🧗‍♂️",
  "🧗‍♀️",
  "🤺",
  "🏇",
  "⛷",
  "🏂",
  "🏌",
  "🏌️‍♂️",
  "🏌️‍♀️",
  "🏄",
  "🏄‍♂️",
  "🏄‍♀️",
  "🚣",
  "🚣‍♂️",
  "🚣‍♀️",
  "🏊",
  "🏊‍♂️",
  "🏊‍♀️",
  "⛹",
  "⛹️‍♂️",
  "⛹️‍♀️",
  "🏋",
  "🏋️‍♂️",
  "🏋️‍♀️",
  "🚴",
  "🚴‍♂️",
  "🚴‍♀️",
  "🚵",
  "🚵‍♂️",
  "🚵‍♀️",
  "🤸",
  "🤸‍♂️",
  "🤸‍♀️",
  "🤼",
  "🤼‍♂️",
  "🤼‍♀️",
  "🤽",
  "🤽‍♂️",
  "🤽‍♀️",
  "🤾",
  "🤾‍♂️",
  "🤾‍♀️",
  "🤹",
  "🤹‍♂️",
  "🤹‍♀️",
  "🧘",
  "🧘‍♂️",
  "🧘‍♀️",
  "🛀",
  "🛌",
  "🧑‍🤝‍🧑",
  "👭",
  "👫",
  "👬",
  "💏",
  "👩‍❤️‍💋‍👨",
  "👨‍❤️‍💋‍👨",
  "👩‍❤️‍💋‍👩",
  "💑",
  "👩‍❤️‍👨",
  "👨‍❤️‍👨",
  "👩‍❤️‍👩",
  "👪",
  "👨‍👩‍👦",
  "👨‍👩‍👧",
  "👨‍👩‍👧‍👦",
  "👨‍👩‍👦‍👦",
  "👨‍👩‍👧‍👧",
  "👨‍👨‍👦",
  "👨‍👨‍👧",
  "👨‍👨‍👧‍👦",
  "👨‍👨‍👦‍👦",
  "👨‍👨‍👧‍👧",
  "👩‍👩‍👦",
  "👩‍👩‍👧",
  "👩‍👩‍👧‍👦",
  "👩‍👩‍👦‍👦",
  "👩‍👩‍👧‍👧",
  "👨‍👦",
  "👨‍👦‍👦",
  "👨‍👧",
  "👨‍👧‍👦",
  "👨‍👧‍👧",
  "👩‍👦",
  "👩‍👦‍👦",
  "👩‍👧",
  "👩‍👧‍👦",
  "👩‍👧‍👧",
  "🗣",
  "👤",
  "👥",
  "🫂",
  "👣",
  "🦰",
  "🦱",
  "🦳",
  "🦲",
  "🐵",
  "🐒",
  "🦍",
  "🦧",
  "🐶",
  "🐕",
  "🦮",
  "🐕‍🦺",
  "🐩",
  "🐺",
  "🦊",
  "🦝",
  "🐱",
  "🐈",
  "🐈‍⬛",
  "🦁",
  "🐯",
  "🐅",
  "🐆",
  "🐴",
  "🐎",
  "🦄",
  "🦓",
  "🦌",
  "🦬",
  "🐮",
  "🐂",
  "🐃",
  "🐄",
  "🐷",
  "🐖",
  "🐗",
  "🐽",
  "🐏",
  "🐑",
  "🐐",
  "🐪",
  "🐫",
  "🦙",
  "🦒",
  "🐘",
  "🦣",
  "🦏",
  "🦛",
  "🐭",
  "🐁",
  "🐀",
  "🐹",
  "🐰",
  "🐇",
  "🐿",
  "🦫",
  "🦔",
  "🦇",
  "🐻",
  "🐻‍❄️",
  "🐨",
  "🐼",
  "🦥",
  "🦦",
  "🦨",
  "🦘",
  "🦡",
  "🐾",
  "🦃",
  "🐔",
  "🐓",
  "🐣",
  "🐤",
  "🐥",
  "🐦",
  "🐧",
  "🕊",
  "🦅",
  "🦆",
  "🦢",
  "🦉",
  "🦤",
  "🪶",
  "🦩",
  "🦚",
  "🦜",
  "🐸",
  "🐊",
  "🐢",
  "🦎",
  "🐍",
  "🐲",
  "🐉",
  "🦕",
  "🦖",
  "🐳",
  "🐋",
  "🐬",
  "🦭",
  "🐟",
  "🐠",
  "🐡",
  "🦈",
  "🐙",
  "🐚",
  "🪸",
  "🐌",
  "🦋",
  "🐛",
  "🐜",
  "🐝",
  "🪲",
  "🐞",
  "🦗",
  "🪳",
  "🕷",
  "🕸",
  "🦂",
  "🦟",
  "🪰",
  "🪱",
  "🦠",
  "💐",
  "🌸",
  "💮",
  "🪷",
  "🏵",
  "🌹",
  "🥀",
  "🌺",
  "🌻",
  "🌼",
  "🌷",
  "🌱",
  "🪴",
  "🌲",
  "🌳",
  "🌴",
  "🌵",
  "🌾",
  "🌿",
  "☘",
  "🍀",
  "🍁",
  "🍂",
  "🍃",
  "🪹",
  "🪺",
  "🍇",
  "🍈",
  "🍉",
  "🍊",
  "🍋",
  "🍌",
  "🍍",
  "🥭",
  "🍎",
  "🍏",
  "🍐",
  "🍑",
  "🍒",
  "🍓",
  "🫐",
  "🥝",
  "🍅",
  "🫒",
  "🥥",
  "🥑",
  "🍆",
  "🥔",
  "🥕",
  "🌽",
  "🌶",
  "🫑",
  "🥒",
  "🥬",
  "🥦",
  "🧄",
  "🧅",
  "🍄",
  "🥜",
  "🫘",
  "🌰",
  "🍞",
  "🥐",
  "🥖",
  "🫓",
  "🥨",
  "🥯",
  "🥞",
  "🧇",
  "🧀",
  "🍖",
  "🍗",
  "🥩",
  "🥓",
  "🍔",
  "🍟",
  "🍕",
  "🌭",
  "🥪",
  "🌮",
  "🌯",
  "🫔",
  "🥙",
  "🧆",
  "🥚",
  "🍳",
  "🥘",
  "🍲",
  "🫕",
  "🥣",
  "🥗",
  "🍿",
  "🧈",
  "🧂",
  "🥫",
  "🍱",
  "🍘",
  "🍙",
  "🍚",
  "🍛",
  "🍜",
  "🍝",
  "🍠",
  "🍢",
  "🍣",
  "🍤",
  "🍥",
  "🥮",
  "🍡",
  "🥟",
  "🥠",
  "🥡",
  "🦀",
  "🦞",
  "🦐",
  "🦑",
  "🦪",
  "🍦",
  "🍧",
  "🍨",
  "🍩",
  "🍪",
  "🎂",
  "🍰",
  "🧁",
  "🥧",
  "🍫",
  "🍬",
  "🍭",
  "🍮",
  "🍯",
  "🍼",
  "🥛",
  "☕",
  "🫖",
  "🍵",
  "🍶",
  "🍾",
  "🍷",
  "🍸",
  "🍹",
  "🍺",
  "🍻",
  "🥂",
  "🥃",
  "🫗",
  "🥤",
  "🧋",
  "🧃",
  "🧉",
  "🧊",
  "🥢",
  "🍽",
  "🍴",
  "🥄",
  "🔪",
  "🫙",
  "🏺",
  "🌍",
  "🌎",
  "🌏",
  "🌐",
  "🗺",
  "🗾",
  "🧭",
  "🏔",
  "⛰",
  "🌋",
  "🗻",
  "🏕",
  "🏖",
  "🏜",
  "🏝",
  "🏞",
  "🏟",
  "🏛",
  "🏗",
  "🧱",
  "🪨",
  "🪵",
  "🛖",
  "🏘",
  "🏚",
  "🏠",
  "🏡",
  "🏢",
  "🏣",
  "🏤",
  "🏥",
  "🏦",
  "🏨",
  "🏩",
  "🏪",
  "🏫",
  "🏬",
  "🏭",
  "🏯",
  "🏰",
  "💒",
  "🗼",
  "🗽",
  "⛪",
  "🕌",
  "🛕",
  "🕍",
  "⛩",
  "🕋",
  "⛲",
  "⛺",
  "🌁",
  "🌃",
  "🏙",
  "🌄",
  "🌅",
  "🌆",
  "🌇",
  "🌉",
  "♨",
  "🎠",
  "🛝",
  "🎡",
  "🎢",
  "💈",
  "🎪",
  "🚂",
  "🚃",
  "🚄",
  "🚅",
  "🚆",
  "🚇",
  "🚈",
  "🚉",
  "🚊",
  "🚝",
  "🚞",
  "🚋",
  "🚌",
  "🚍",
  "🚎",
  "🚐",
  "🚑",
  "🚒",
  "🚓",
  "🚔",
  "🚕",
  "🚖",
  "🚗",
  "🚘",
  "🚙",
  "🛻",
  "🚚",
  "🚛",
  "🚜",
  "🏎",
  "🏍",
  "🛵",
  "🦽",
  "🦼",
  "🛺",
  "🚲",
  "🛴",
  "🛹",
  "🛼",
  "🚏",
  "🛣",
  "🛤",
  "🛢",
  "⛽",
  "🛞",
  "🚨",
  "🚥",
  "🚦",
  "🛑",
  "🚧",
  "⚓",
  "🛟",
  "⛵",
  "🛶",
  "🚤",
  "🛳",
  "⛴",
  "🛥",
  "🚢",
  "✈",
  "🛩",
  "🛫",
  "🛬",
  "🪂",
  "💺",
  "🚁",
  "🚟",
  "🚠",
  "🚡",
  "🛰",
  "🚀",
  "🛸",
  "🛎",
  "🧳",
  "⌛",
  "⏳",
  "⌚",
  "⏰",
  "⏱",
  "⏲",
  "🕰",
  "🕛",
  "🕧",
  "🕐",
  "🕜",
  "🕑",
  "🕝",
  "🕒",
  "🕞",
  "🕓",
  "🕟",
  "🕔",
  "🕠",
  "🕕",
  "🕡",
  "🕖",
  "🕢",
  "🕗",
  "🕣",
  "🕘",
  "🕤",
  "🕙",
  "🕥",
  "🕚",
  "🕦",
  "🌑",
  "🌒",
  "🌓",
  "🌔",
  "🌕",
  "🌖",
  "🌗",
  "🌘",
  "🌙",
  "🌚",
  "🌛",
  "🌜",
  "🌡",
  "☀",
  "🌝",
  "🌞",
  "🪐",
  "⭐",
  "🌟",
  "🌠",
  "🌌",
  "☁",
  "⛅",
  "⛈",
  "🌤",
  "🌥",
  "🌦",
  "🌧",
  "🌨",
  "🌩",
  "🌪",
  "🌫",
  "🌬",
  "🌀",
  "🌈",
  "🌂",
  "☂",
  "☔",
  "⛱",
  "⚡",
  "❄",
  "☃",
  "⛄",
  "☄",
  "🔥",
  "💧",
  "🌊",
  "🎃",
  "🎄",
  "🎆",
  "🎇",
  "🧨",
  "✨",
  "🎈",
  "🎉",
  "🎊",
  "🎋",
  "🎍",
  "🎎",
  "🎏",
  "🎐",
  "🎑",
  "🧧",
  "🎀",
  "🎁",
  "🎗",
  "🎟",
  "🎫",
  "🎖",
  "🏆",
  "🏅",
  "🥇",
  "🥈",
  "🥉",
  "⚽",
  "⚾",
  "🥎",
  "🏀",
  "🏐",
  "🏈",
  "🏉",
  "🎾",
  "🥏",
  "🎳",
  "🏏",
  "🏑",
  "🏒",
  "🥍",
  "🏓",
  "🏸",
  "🥊",
  "🥋",
  "🥅",
  "⛳",
  "⛸",
  "🎣",
  "🤿",
  "🎽",
  "🎿",
  "🛷",
  "🥌",
  "🎯",
  "🪀",
  "🪁",
  "🎱",
  "🔮",
  "🪄",
  "🧿",
  "🪬",
  "🎮",
  "🕹",
  "🎰",
  "🎲",
  "🧩",
  "🧸",
  "🪅",
  "🪩",
  "🪆",
  "♠",
  "♥",
  "♦",
  "♣",
  "♟",
  "🃏",
  "🀄",
  "🎴",
  "🎭",
  "🖼",
  "🎨",
  "🧵",
  "🪡",
  "🧶",
  "🪢",
  "👓",
  "🕶",
  "🥽",
  "🥼",
  "🦺",
  "👔",
  "👕",
  "👖",
  "🧣",
  "🧤",
  "🧥",
  "🧦",
  "👗",
  "👘",
  "🥻",
  "🩱",
  "🩲",
  "🩳",
  "👙",
  "👚",
  "👛",
  "👜",
  "👝",
  "🛍",
  "🎒",
  "🩴",
  "👞",
  "👟",
  "🥾",
  "🥿",
  "👠",
  "👡",
  "🩰",
  "👢",
  "👑",
  "👒",
  "🎩",
  "🎓",
  "🧢",
  "🪖",
  "⛑",
  "📿",
  "💄",
  "💍",
  "💎",
  "🔇",
  "🔈",
  "🔉",
  "🔊",
  "📢",
  "📣",
  "📯",
  "🔔",
  "🔕",
  "🎼",
  "🎵",
  "🎶",
  "🎙",
  "🎚",
  "🎛",
  "🎤",
  "🎧",
  "📻",
  "🎷",
  "🪗",
  "🎸",
  "🎹",
  "🎺",
  "🎻",
  "🪕",
  "🥁",
  "🪘",
  "📱",
  "📲",
  "☎",
  "📞",
  "📟",
  "📠",
  "🔋",
  "🪫",
  "🔌",
  "💻",
  "🖥",
  "🖨",
  "⌨",
  "🖱",
  "🖲",
  "💽",
  "💾",
  "💿",
  "📀",
  "🧮",
  "🎥",
  "🎞",
  "📽",
  "🎬",
  "📺",
  "📷",
  "📸",
  "📹",
  "📼",
  "🔍",
  "🔎",
  "🕯",
  "💡",
  "🔦",
  "🏮",
  "🪔",
  "📔",
  "📕",
  "📖",
  "📗",
  "📘",
  "📙",
  "📚",
  "📓",
  "📒",
  "📃",
  "📜",
  "📄",
  "📰",
  "🗞",
  "📑",
  "🔖",
  "🏷",
  "💰",
  "🪙",
  "💴",
  "💵",
  "💶",
  "💷",
  "💸",
  "💳",
  "🧾",
  "💹",
  "✉",
  "📧",
  "📨",
  "📩",
  "📤",
  "📥",
  "📦",
  "📫",
  "📪",
  "📬",
  "📭",
  "📮",
  "🗳",
  "✏",
  "✒",
  "🖋",
  "🖊",
  "🖌",
  "🖍",
  "📝",
  "💼",
  "📁",
  "📂",
  "🗂",
  "📅",
  "📆",
  "🗒",
  "🗓",
  "📇",
  "📈",
  "📉",
  "📊",
  "📋",
  "📌",
  "📍",
  "📎",
  "🖇",
  "📏",
  "📐",
  "✂",
  "🗃",
  "🗄",
  "🗑",
  "🔒",
  "🔓",
  "🔏",
  "🔐",
  "🔑",
  "🗝",
  "🔨",
  "🪓",
  "⛏",
  "⚒",
  "🛠",
  "🗡",
  "⚔",
  "🔫",
  "🪃",
  "🏹",
  "🛡",
  "🪚",
  "🔧",
  "🪛",
  "🔩",
  "⚙",
  "🗜",
  "⚖",
  "🦯",
  "🔗",
  "⛓",
  "🪝",
  "🧰",
  "🧲",
  "🪜",
  "⚗",
  "🧪",
  "🧫",
  "🧬",
  "🔬",
  "🔭",
  "📡",
  "💉",
  "🩸",
  "💊",
  "🩹",
  "🩼",
  "🩺",
  "🩻",
  "🚪",
  "🛗",
  "🪞",
  "🪟",
  "🛏",
  "🛋",
  "🪑",
  "🚽",
  "🪠",
  "🚿",
  "🛁",
  "🪤",
  "🪒",
  "🧴",
  "🧷",
  "🧹",
  "🧺",
  "🧻",
  "🪣",
  "🧼",
  "🫧",
  "🪥",
  "🧽",
  "🧯",
  "🛒",
  "🚬",
  "⚰",
  "🪦",
  "⚱",
  "🗿",
  "🪧",
  "🪪",
  "🏧",
  "🚮",
  "🚰",
  "♿",
  "🚹",
  "🚺",
  "🚻",
  "🚼",
  "🚾",
  "🛂",
  "🛃",
  "🛄",
  "🛅",
  "⚠",
  "🚸",
  "⛔",
  "🚫",
  "🚳",
  "🚭",
  "🚯",
  "🚱",
  "🚷",
  "📵",
  "🔞",
  "☢",
  "☣",
  "⬆",
  "↗",
  "➡",
  "↘",
  "⬇",
  "↙",
  "⬅",
  "↖",
  "↕",
  "↔",
  "↩",
  "↪",
  "⤴",
  "⤵",
  "🔃",
  "🔄",
  "🔙",
  "🔚",
  "🔛",
  "🔜",
  "🔝",
  "🛐",
  "⚛",
  "🕉",
  "✡",
  "☸",
  "☯",
  "✝",
  "☦",
  "☪",
  "☮",
  "🕎",
  "🔯",
  "♈",
  "♉",
  "♊",
  "♋",
  "♌",
  "♍",
  "♎",
  "♏",
  "♐",
  "♑",
  "♒",
  "♓",
  "⛎",
  "🔀",
  "🔁",
  "🔂",
  "▶",
  "⏩",
  "⏭",
  "⏯",
  "◀",
  "⏪",
  "⏮",
  "🔼",
  "⏫",
  "🔽",
  "⏬",
  "⏸",
  "⏹",
  "⏺",
  "⏏",
  "🎦",
  "🔅",
  "🔆",
  "📶",
  "📳",
  "📴",
  "♀",
  "♂",
  "⚧",
  "✖",
  "➕",
  "➖",
  "➗",
  "🟰",
  "♾",
  "‼",
  "⁉",
  "❓",
  "❔",
  "❕",
  "❗",
  "〰",
  "💱",
  "💲",
  "⚕",
  "♻",
  "⚜",
  "🔱",
  "📛",
  "🔰",
  "⭕",
  "✅",
  "☑",
  "✔",
  "❌",
  "❎",
  "➰",
  "➿",
  "〽",
  "✳",
  "✴",
  "❇",
  "©",
  "®",
  "™",
  "#️⃣",
  "*️⃣",
  "0️⃣",
  "1️⃣",
  "2️⃣",
  "3️⃣",
  "4️⃣",
  "5️⃣",
  "6️⃣",
  "7️⃣",
  "8️⃣",
  "9️⃣",
  "🔟",
  "🔠",
  "🔡",
  "🔢",
  "🔣",
  "🔤",
  "🅰",
  "🆎",
  "🅱",
  "🆑",
  "🆒",
  "🆓",
  "ℹ",
  "🆔",
  "Ⓜ",
  "🆕",
  "🆖",
  "🅾",
  "🆗",
  "🅿",
  "🆘",
  "🆙",
  "🆚",
  "🈁",
  "🈂",
  "🈷",
  "🈶",
  "🈯",
  "🉐",
  "🈹",
  "🈚",
  "🈲",
  "🉑",
  "🈸",
  "🈴",
  "🈳",
  "㊗",
  "㊙",
  "🈺",
  "🈵",
  "🔴",
  "🟠",
  "🟡",
  "🟢",
  "🔵",
  "🟣",
  "🟤",
  "⚫",
  "⚪",
  "🟥",
  "🟧",
  "🟨",
  "🟩",
  "🟦",
  "🟪",
  "🟫",
  "⬛",
  "⬜",
  "◼",
  "◻",
  "◾",
  "◽",
  "▪",
  "▫",
  "🔶",
  "🔷",
  "🔸",
  "🔹",
  "🔺",
  "🔻",
  "💠",
  "🔘",
  "🔳",
  "🔲",
  "🏁",
  "🚩",
  "🎌",
  "🏴",
  "🏳",
  "🏳️‍🌈",
  "🏳️‍⚧️",
  "🏴‍☠️",
  "🇦🇨",
  "🇦🇩",
  "🇦🇪",
  "🇦🇫",
  "🇦🇬",
  "🇦🇮",
  "🇦🇱",
  "🇦🇲",
  "🇦🇴",
  "🇦🇶",
  "🇦🇷",
  "🇦🇸",
  "🇦🇹",
  "🇦🇺",
  "🇦🇼",
  "🇦🇽",
  "🇦🇿",
  "🇧🇦",
  "🇧🇧",
  "🇧🇩",
  "🇧🇪",
  "🇧🇫",
  "🇧🇬",
  "🇧🇭",
  "🇧🇮",
  "🇧🇯",
  "🇧🇱",
  "🇧🇲",
  "🇧🇳",
  "🇧🇴",
  "🇧🇶",
  "🇧🇷",
  "🇧🇸",
  "🇧🇹",
  "🇧🇻",
  "🇧🇼",
  "🇧🇾",
  "🇧🇿",
  "🇨🇦",
  "🇨🇨",
  "🇨🇩",
  "🇨🇫",
  "🇨🇬",
  "🇨🇭",
  "🇨🇮",
  "🇨🇰",
  "🇨🇱",
  "🇨🇲",
  "🇨🇳",
  "🇨🇴",
  "🇨🇵",
  "🇨🇷",
  "🇨🇺",
  "🇨🇻",
  "🇨🇼",
  "🇨🇽",
  "🇨🇾",
  "🇨🇿",
  "🇩🇪",
  "🇩🇬",
  "🇩🇯",
  "🇩🇰",
  "🇩🇲",
  "🇩🇴",
  "🇩🇿",
  "🇪🇦",
  "🇪🇨",
  "🇪🇪",
  "🇪🇬",
  "🇪🇭",
  "🇪🇷",
  "🇪🇸",
  "🇪🇹",
  "🇪🇺",
  "🇫🇮",
  "🇫🇯",
  "🇫🇰",
  "🇫🇲",
  "🇫🇴",
  "🇫🇷",
  "🇬🇦",
  "🇬🇧",
  "🇬🇩",
  "🇬🇪",
  "🇬🇫",
  "🇬🇬",
  "🇬🇭",
  "🇬🇮",
  "🇬🇱",
  "🇬🇲",
  "🇬🇳",
  "🇬🇵",
  "🇬🇶",
  "🇬🇷",
  "🇬🇸",
  "🇬🇹",
  "🇬🇺",
  "🇬🇼",
  "🇬🇾",
  "🇭🇰",
  "🇭🇲",
  "🇭🇳",
  "🇭🇷",
  "🇭🇹",
  "🇭🇺",
  "🇮🇨",
  "🇮🇩",
  "🇮🇪",
  "🇮🇱",
  "🇮🇲",
  "🇮🇳",
  "🇮🇴",
  "🇮🇶",
  "🇮🇷",
  "🇮🇸",
  "🇮🇹",
  "🇯🇪",
  "🇯🇲",
  "🇯🇴",
  "🇯🇵",
  "🇰🇪",
  "🇰🇬",
  "🇰🇭",
  "🇰🇮",
  "🇰🇲",
  "🇰🇳",
  "🇰🇵",
  "🇰🇷",
  "🇰🇼",
  "🇰🇾",
  "🇰🇿",
  "🇱🇦",
  "🇱🇧",
  "🇱🇨",
  "🇱🇮",
  "🇱🇰",
  "🇱🇷",
  "🇱🇸",
  "🇱🇹",
  "🇱🇺",
  "🇱🇻",
  "🇱🇾",
  "🇲🇦",
  "🇲🇨",
  "🇲🇩",
  "🇲🇪",
  "🇲🇫",
  "🇲🇬",
  "🇲🇭",
  "🇲🇰",
  "🇲🇱",
  "🇲🇲",
  "🇲🇳",
  "🇲🇴",
  "🇲🇵",
  "🇲🇶",
  "🇲🇷",
  "🇲🇸",
  "🇲🇹",
  "🇲🇺",
  "🇲🇻",
  "🇲🇼",
  "🇲🇽",
  "🇲🇾",
  "🇲🇿",
  "🇳🇦",
  "🇳🇨",
  "🇳🇪",
  "🇳🇫",
  "🇳🇬",
  "🇳🇮",
  "🇳🇱",
  "🇳🇴",
  "🇳🇵",
  "🇳🇷",
  "🇳🇺",
  "🇳🇿",
  "🇴🇲",
  "🇵🇦",
  "🇵🇪",
  "🇵🇫",
  "🇵🇬",
  "🇵🇭",
  "🇵🇰",
  "🇵🇱",
  "🇵🇲",
  "🇵🇳",
  "🇵🇷",
  "🇵🇸",
  "🇵🇹",
  "🇵🇼",
  "🇵🇾",
  "🇶🇦",
  "🇷🇪",
  "🇷🇴",
  "🇷🇸",
  "🇷🇺",
  "🇷🇼",
  "🇸🇦",
  "🇸🇧",
  "🇸🇨",
  "🇸🇩",
  "🇸🇪",
  "🇸🇬",
  "🇸🇭",
  "🇸🇮",
  "🇸🇯",
  "🇸🇰",
  "🇸🇱",
  "🇸🇲",
  "🇸🇳",
  "🇸🇴",
  "🇸🇷",
  "🇸🇸",
  "🇸🇹",
  "🇸🇻",
  "🇸🇽",
  "🇸🇾",
  "🇸🇿",
  "🇹🇦",
  "🇹🇨",
  "🇹🇩",
  "🇹🇫",
  "🇹🇬",
  "🇹🇭",
  "🇹🇯",
  "🇹🇰",
  "🇹🇱",
  "🇹🇲",
  "🇹🇳",
  "🇹🇴",
  "🇹🇷",
  "🇹🇹",
  "🇹🇻",
  "🇹🇼",
  "🇹🇿",
  "🇺🇦",
  "🇺🇬",
  "🇺🇲",
  "🇺🇳",
  "🇺🇸",
  "🇺🇾",
  "🇺🇿",
  "🇻🇦",
  "🇻🇨",
  "🇻🇪",
  "🇻🇬",
  "🇻🇮",
  "🇻🇳",
  "🇻🇺",
  "🇼🇫",
  "🇼🇸",
  "🇽🇰",
  "🇾🇪",
  "🇾🇹",
  "🇿🇦",
  "🇿🇲",
  "🇿🇼",
  "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
];
