import OpenAi, { type ClientOptions } from 'openai';

export default class GptService {
  private conversation: Array<OpenAi.Chat.Completions.ChatCompletionMessageParam> =
    [];

  private constructor(
    private readonly openAi: OpenAi,
    private readonly model: OpenAi.Chat.ChatModel,
    private readonly maxRetries: number,
  ) {}

  public static async createInstance(
    clientOptions: ClientOptions & {
      model?: OpenAi.Chat.ChatModel;
      maxRetries?: number;
    },
  ): Promise<GptService> {
    const { model, maxRetries, ...rest } = clientOptions;
    const openAi = new OpenAi(rest);
    const instance = new GptService(
      openAi,
      model ?? 'gpt-3.5-turbo',
      maxRetries ?? 5,
    );
    return instance;
  }

  public async sendMessage(
    payload: OpenAi.Chat.Completions.ChatCompletionMessageParam & {
      retries?: number;
    },
  ): Promise<string> {
    const { retries: r, ...rest } = payload;
    const retries = r ?? 0;
    const response = await this.openAi.chat.completions.create({
      messages: [...this.conversation, payload],
      model: this.model,
    });
    const message = response.choices?.at(0)?.message;
    const content = message?.content;
    if (!message || (!content && retries < this.maxRetries)) {
      return await this.sendMessage({ ...rest, retries: retries + 1 });
    }
    if (retries >= this.maxRetries) return '';
    this.conversation.push(rest, message);
    return message.content!;
  }
}
