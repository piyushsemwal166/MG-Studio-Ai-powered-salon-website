# Chatbot Setup Guide

Your AI Hair Style Assistant chatbot is now ready! Follow these steps to enable it:

## Step 1: Get Your Google Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com)
2. Click on "Get API Key" button
3. Create a new project (if prompted)
4. Copy your API key

## Step 2: Add Environment Variable

Add the API key to your environment:

### For Local Development:
Create or update `.env.local` in your frontend directory:

```env
GOOGLE_GEMINI_API_KEY=your_api_key_here
```

### For Production (Vercel/Deployment):
1. Go to your deployment platform settings
2. Add environment variable: `GOOGLE_GEMINI_API_KEY` = your API key
3. Redeploy your application

## Step 3: Test the Chatbot

1. Start your development server: `npm run dev`
2. Open your website in browser
3. Look for the chat bubble in the bottom-right corner
4. Click it and start chatting!

## Features

✅ **Hair Style Recommendations** - Get personalized style suggestions  
✅ **Hair Care Tips** - Learn about hair maintenance  
✅ **Grooming Advice** - Professional grooming guidance  
✅ **Face Shape Analysis** - Find styles that suit your face shape  
✅ **Conversation History** - The bot remembers context within the chat  

## Customization

### Change System Prompt
Edit the system prompt in `frontend/app/api/chatbot/route.ts`:

```typescript
const SYSTEM_PROMPT = \`You are a professional hair style assistant...\`;
```

### Adjust Response Settings
In the same file, modify the `generationConfig`:

```typescript
generationConfig: {
  maxOutputTokens: 200,      // Longer responses: increase this
  temperature: 0.7,           // More creative: increase to 1.0
  topP: 0.95,                // Diversity of responses
}
```

## Troubleshooting

**Chatbot doesn't respond:**
- Check if `GOOGLE_GEMINI_API_KEY` is set in environment variables
- Open browser DevTools (F12) → Console to see error messages
- Verify API key is correct

**Responses seem generic:**
- Try adjusting the system prompt
- Increase `temperature` for more varied responses

**Rate limiting issues:**
- Google Gemini Free tier has rate limits
- Consider upgrading to a paid plan for production use

## API Endpoint

The chatbot uses the following endpoint internally:
- **Route**: `POST /api/chatbot`
- **Body**: `{ message: string, conversationHistory: Message[] }`
- **Response**: `{ reply: string }`

## Free Tier Limits

Google Gemini API Free tier offers:
- 60 requests per minute
- Great for development and testing
- Can be scaled up with a paid plan

Happy chatting! 🎉
