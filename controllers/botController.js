const { askQuesction, getResponce } = require('./assistant')

const messageController = async (message) => {
    try {
        if (message.author.bot) return

        const { run, thread } = await askQuesction(message.content)

        let isCompleted = false

        while (!isCompleted) {
            console.log(isCompleted);
            const { isCompleted: complete, msg } = await getResponce(thread, run)
            isCompleted = complete

            if (isCompleted == null)
                return await message.reply(msg)

            if (isCompleted)
                return await message.reply(msg)
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = { messageController }