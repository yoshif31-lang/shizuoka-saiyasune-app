const API_KEYS: Record<string, string | undefined> = {
  luna: process.env.NEXT_PUBLIC_DIFY_1 || process.env.DIFY_1,
  nagi: process.env.NEXT_PUBLIC_DIFY_2 || process.env.DIFY_2,
  koku: process.env.NEXT_PUBLIC_DIFY_3 || process.env.DIFY_3,
  rei: process.env.NEXT_PUBLIC_DIFY_4 || process.env.DIFY_4,
  hibiki: process.env.NEXT_PUBLIC_DIFY_5 || process.env.DIFY_5,
};

export const sendMessageToDify = async (unitId: string, message: string) => {
  const apiKey = API_KEYS[unitId];
  if (!apiKey) throw new Error(`トークン未設定: ${unitId}`);

  const response = await fetch('https://api.dify.ai/v1/chat-messages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: {},
      query: message,
      response_mode: 'blocking',
      user: 'genesis-commander',
    }),
  });
  return response.json();
};
