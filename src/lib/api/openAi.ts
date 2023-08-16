import {
  Configuration,
  CreateCompletionRequestPrompt,
  OpenAIApi,
} from "openai";

export default class OPENAI {
  private openai: OpenAIApi;
  private textModel: string;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);

    if (!configuration.apiKey) {
      throw new Error(
        "OpenAI API key not configured, please follow instructions in README.md"
      );
    }
    this.textModel = "text-davinci-003";
  }

  public async generateRequest(
    prompt: CreateCompletionRequestPrompt,
    temperature: number = 0.6,
    max_tokens: number = 100
  ) {
    return await this.openai.createCompletion({
      model: this.textModel,
      prompt,
      temperature,
      max_tokens,
    });
  }
}
