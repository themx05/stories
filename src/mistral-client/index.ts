import { Axios, AxiosError, AxiosHeaders } from "axios";

interface ModelStructure {
    id: string;
    object: string;
    created: number;
    owned_by: string;
}

interface Message {
    role: "user" | "system";
    content: string;
}

const createCompletionSample = {
    "id": "cmpl-e5cc70bb28c444948073e77776eb30ef",
    "object": "chat.completion",
    "created": 1702256327,
    "model": "mistral-tiny",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "I don't have a favorite condiment as I don't consume food or condiments. However, I can tell you that many people enjoy using ketchup, mayonnaise, hot sauce, soy sauce, or mustard as condiments to enhance the flavor of their meals. Some people also enjoy using herbs, spices, or vinegars as condiments. Ultimately, the best condiment is a matter of personal preference."
            },
            "finish_reason": "stop"
        }
    ],
    "usage": {
        "prompt_tokens": 14,
        "completion_tokens": 93,
        "total_tokens": 107
    }
};

export type CreateCompletionType = typeof createCompletionSample;

export class MistralClient {
    client: Axios;
    apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.client = new Axios({ baseURL: 'https://api.mistral.ai/v1' });
        this.client.interceptors.request.use((request) => {
            if (!request.headers) {
                request.headers = new AxiosHeaders();
            }
            request.headers.set("Authorization", `Bearer ${this.apiKey}`);
            return request;
        });
    }


    get models() {
        return this.client.get("/models", { responseType: "json" })
            .then((res) => {
                let data = JSON.parse(res.data);
                return data as { object: string, data: ModelStructure }
            });
    }


    async createChatCompletion(params: {
        model: string,
        messages: Message[],
        temperature?: number;
        top_p?: number;
        max_tokens?: number;
        stream?: boolean;
        safe_mode?: boolean;
        random_seed?: number;
    }) {
        console.log(params);
        return this.client.post("/chat/completions", JSON.stringify(params), {
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            responseType: "json"
        })
            .then((res) => {
                return res.data as CreateCompletionType;
            })
            .catch((err: AxiosError) => {
                console.log(err);
                return undefined;
            })
    }
}