import React from "react";
import { useState } from "react";

const AI_Assistance = () => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDy7qrF3QzmXWiH4JSOaLenvXjMkrxTFWw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: userInput }]
            }
          ]
        })
      });

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      setResponse(text || 'No response.');
    } catch (err) {
      console.error('Error:', err);
      setResponse('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow space-y-4">
      <h2 className="text-xl font-bold text-center">AI Assistant 🤖</h2>
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ask me anything..."
        className="w-full border p-2 rounded"
        rows="4"
      />
      <button
        onClick={handleAskAI}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Thinking...' : 'Ask Gemini'}
      </button>
      {response && (
        <div className="mt-4 p-3 bg-gray-100 rounded border text-sm whitespace-pre-wrap">
          <strong>AI:</strong> {response}
        </div>
      )}
    </div>
  );
};

export default AI_Assistance;