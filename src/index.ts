import { config } from 'dotenv';
import { MistralClient } from './mistral-client';

config();

const runner = async () => {
    let client = new MistralClient(process.env.MISTRAL_API_KEY || "");
    
    let models = await client.createChatCompletion({
        model: "mistral-medium",
        temperature: .7,
        messages: [
            { role: "system", content: "If you can, output a clean and concise result" },
            {role: "system", content: `You must output in French. Don't translate back to english.`},
            {role: "user", content: "Generate a bedtime story for children between 6 and 12"},
            {role: "user", content: "After the story, generate the visual description of your characters."}
        ]
    });

    console.log(models);
}

runner();