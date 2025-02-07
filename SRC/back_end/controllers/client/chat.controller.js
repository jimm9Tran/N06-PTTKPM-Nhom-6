const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");

module.exports.index = async (req, res) => {
    const userId = res.locals.user.id;
    // console.log(userId);
    _io.once('connection', (socket) => {
        // console.log('a user connected', socket.id);
        socket.on("CLIENT_SEND_MESSAGE", async (content) => {
            // console.log(content);
            const chat = new Chat({
                user_id: userId,
                content: content
            });
            await chat.save();

            // Trả về date cho client
            _io.emit("SERVER_RETURN_MASSAGE", {
                userId: userId,
                fullName: "",
                content: content,
            });
        });
    });

    const chats = await Chat.find({
        deleted: false,
    });

    for (const chat of chats) {
        const inforUser = await User.findOne({
            _id: chat.user_id
        }).select("fullName");

        chat.inforUser = inforUser;
        // console.log(chat.inforUser);
    }

    // console.log(chats);

    res.render("client/pages/chat/index", {
        pageTile: "Chat",
        chats: chats
    });
}
