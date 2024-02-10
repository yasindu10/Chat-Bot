const { OpenAI } = require('openai')

const openai = new OpenAI({
    apiKey: process.env.API_KEY
})

const askQuesction = async (question) => {
    const assistant = await openai.beta.assistants.retrieve(
        "asst_VZtxFe9b7PEqabMJ4teFEEkn",
    )
    const thread = await openai.beta.threads.create()

    await openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: question,
    });

    const run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: assistant.id,
        instructions: `answer the question`,
    });

    return { thread: thread.id, run: run.id }
}

const getResponce = async (threadId, runId) => {
    let runStatus = await openai.beta.threads.runs.retrieve(threadId, runId)
    const resultObject = { isCompleted: false }

    if (runStatus.status === "completed") {
        let messages = await openai.beta.threads.messages.list(threadId);
        messages.data.forEach((msg) => {
            const role = msg.role
            const content = msg.content[0].text.value

            if (role == 'assistant')
                resultObject.msg = content
        })
        resultObject.isCompleted = true
        return resultObject
    } else if (runStatus.status == "in_progress") {
        resultObject.isCompleted = false
        return resultObject
    } else {
        resultObject.msg = 'failed'
        resultObject.isCompleted = null
        return resultObject
    }
}

module.exports = { askQuesction, getResponce }