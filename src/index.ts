import { config } from 'dotenv';
import { MistralClient } from './mistral-client';
import { MistralModels } from './mistral-client/models';
import { createModel } from './gemini';

config();

const run = async () => {
    let geminiModel = createModel();
    let name = "Krep's Restaurant";

    /*
    let client = new MistralClient(process.env.MISTRAL_API_KEY || "");
    let models = await client.createChatCompletion({
        model: MistralModels.medium,
        temperature: .7,
        messages: [
            {
                role: "user", content: `
            Generate a tag using plain english characters, based on the restaurant's name I'll provide you.
            Constraints:
                - No space.
                - No underscore or hyphen.
                - Maximum 8 characters. It cannot be exceeded.
                - Must be lowercased.
            ` },
            {
                role: "user",
                content: `
                Answer constraints you must strictly follow:
                    Your answer must be formatted as JSON.
                    The answer format:
                    {
                        "slug": The generated tag,
                        "comments": A string. Any comments you have must be added to this key.
                    }
                `
            },
            { role: "user", content: `Name: ${name}` }
        ]
    });

    if (models?.choices) {
        let choice = models?.choices[0];
        if (choice.message) {
            let decoded = JSON.parse(choice.message.content);
            console.log(decoded);
        }
    }*/

    let idea = `
    1XC is a platform offering digital payment solutions to SMEs in order to enable neighborhood and global merchants to collect card payments (1XCARD) through a mobile POS (1XPOS) and provides a 1XCARD payment card loadable by mobile money, cryptocurrencies or bank account to its users.
    `
    let result = await geminiModel.generateContent(
        [
            {
                text: `
                THIS IS A GREAT IDEA! Analyze and expand it 
                by conducting a comprehensive research.
            
                Final answer MUST be a comprehensive idea report 
                detailing why this is a great idea, the value 
                proposition, unique selling points, why people should 
                care about it and distinguishing features. 
            
                IDEA: 
                ----------
                ${idea}
                `
            },
            {
                text: `
                Expand idea report with a Why, How, and What 
                messaging strategy using the Golden Circle 
                Communication technique, based on the idea report.
                
                Your final answer MUST be the updated complete 
                comprehensive idea report with WHY, HOW, WHAT, 
                a core message, key features and supporting arguments.
                
                YOU MUST RETURN THE COMPLETE IDEA REPORT AND 
                THE DETAILS, You'll get a $100 tip if you do your best work!
                `
            }
        ]
    );

    console.log(result.response.text());
}

run();