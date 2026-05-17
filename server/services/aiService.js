import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateAIResponse = async (messages, techStack, difficulty) => {
  try {
    const systemPrompt = `
You are a professional technical interviewer.

Conduct a realistic ${difficulty} level interview
for ${techStack}.

Rules:
- Ask only ONE question at a time
- Do NOT evaluate or comment on previous answers
- Directly ask the next interview question
- Keep questions concise and professional
- Focus only on technical interview flow
`;

    const formattedMessages = [
      {
        role: "system",
        content: systemPrompt,
      },

      ...messages,
    ];

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: formattedMessages,

      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.log(error);

    throw new Error("AI response generation failed");
  }
};
