const API_KEYS: Record<string, string | undefined> = {
  luna: process.env.NEXT_PUBLIC_DIFY_API_KEY_1,
  nagi: process.env.NEXT_PUBLIC_DIFY_API_KEY_2,
  koku: process.env.NEXT_PUBLIC_DIFY_API_KEY_3,
  rei: process.env.NEXT_PUBLIC_DIFY_API_KEY_4,
  hibiki: process.env.NEXT_PUBLIC_DIFY_API_KEY_5,
};

export const sendMessageToDify = async (unitId: string, message: string) => {
  const apiKey = API_KEYS[unitId];
  if (!apiKey) throw new Error(`APIキーが設定されていません: ${unitId}`);

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
