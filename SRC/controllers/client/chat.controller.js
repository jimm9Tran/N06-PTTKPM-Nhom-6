const Chat = require("../../models/chat.model");

module.exports.index = async (req, res) => {
    const userId = res.locals.user.id;

    _io.once('connection', (socket) => {
        // console.log('a user connected', socket.id);
        socket.on("ClIENT_SEND_MESSAGE", async (content) => {
            // console.log(content);
            const chat = new Chat({
                user_id: userId,
                content: content
            });
            await chat.save();
        });
    });

    res.render("client/pages/chat/index", {
        pageTile: "Chat",
    });
}
