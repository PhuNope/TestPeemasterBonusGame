enum TypeBlocks {
    LEFT_TOP = 1,
    TOP_RIGHT = 2,
    TOP = 3,
    LEFT_BOT = 4,
    LEFT = 5,
    RIGHT = 6,
    LEFT_BOT2 = 7,
    BOT_RIGHT = 8,
    LEFT_BOT_RIGHT = 9,
    TOP_LEFT_BOT = 10,
    LEFT_TOP_RIGHT = 11,
    TOP_RIGHT_BOT = 12,
    EMPTY = 13,
    TOP_BOT = 14,
    LEFT_RIGHT = 15
}

enum DirectMove {
    LEFT,
    RIGHT,
    TOP,
    BOT
}

export { TypeBlocks, DirectMove };