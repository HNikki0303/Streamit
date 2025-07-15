import React, { useState } from 'react';

const AI_Assistant = () => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      console.log("📤 Sending to Mistral-7B-Instruct:", userInput);

      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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' // Replace with your key or use env variable
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: [
            { role: "system", content: "You are a fast, helpful AI assistant tailored for user queries in a friendly and concise tone." },
            { role: "user", content: userInput }
          ]
        })
      });

      const data = await res.json();
      console.log("📥 Mistral Response:", data);

      const aiReply = data?.choices?.[0]?.message?.content || "No response from AI.";
      setResponse(aiReply);
    } catch (error) {
      console.error("💥 Error talking to Mistral:", error);
      setResponse("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow space-y-4 bg-white">
      <h2 className="text-xl font-bold text-center">🚀 AI Assistant (Mistral-7B)</h2>

      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ask me anything..."
        className="w-full border p-2 rounded resize-none"
        rows="4"
      />

      <button
        onClick={handleAskAI}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {response && (
        <div className="p-3 bg-gray-100 rounded border text-sm whitespace-pre-wrap">
          <strong>AI:</strong> {response}
        </div>
      )}
    </div>
  );
};

export default AI_Assistant;
