import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateInterviewFeedback = async (
  messages,
  techStack,
  difficulty,
) => {
  try {
    const systemPrompt = `
        You are an expert technical interviewer.

        Analyze the candidate interview.

        Tech Stack: ${techStack}
        Difficulty: ${difficulty}

        Return feedback in JSON format:

        {
          "score": number,
          "strengths": [],
          "weaknesses": [],
          "summary": ""
        }

        Rules:
        - Score should be out of 10
        - Give 3 strengths
        - Give 3 weaknesses
        - Keep summary concise
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

      temperature: 0.4,
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.log(error);

    throw new Error("Feedback generation failed");
  }
};
