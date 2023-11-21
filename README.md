# RAG system - A Customizable Retrieval Chatbot

<p>
This project allows you to quickly build out a customizable chatbot trained on your files. Just ingest your documents, edit the `src/configs` files, and deploy! 100% free and open to use 
</p>


#### Examples


#### Key Features of chatbot

- ✅ Chat with Multiple Documents & File Types
- ✅ API Streaming
- ✅ View Context Sources & Metadata
- ✅ Easy to Customize the Entire Project via the `src/configs` Folder
- ✅ Light/Dark Mode Theme Switching

## 📚 Tech Stack

- [Next.js 13](https://nextjs.org/docs)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Langchain](https://js.langchain.com/docs/get_started/introduction)
- [PineconeDB](https://docs.pinecone.io/docs/overview)
- [Tailwind](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)

## 🪜 API Setup

#### Prerequisites

1. Copy the .env example file: `cp .env.example .env`
2. Get an OpenAI API Key - [Link](https://openai.com/)
   - Enter as `OPENAI_API_KEY` in .env
3. Make a Pinecone Account (free) - [Link](https://www.pinecone.io/)

#### Pinecone Index Setup

**Create a new Index:**

- Give it a name
  - Enter as `PINECONE_INDEX_NAME` in .env

- Set Dimensions to exactly `1536` (required for embedding models)
- Set Metric to `cosine`
- Select the free `starter` Pod Type

**On the side panel, Click on "API Keys"**

- Copy the `ENVIRONMENT` location
  - Enter as `PINECONE_ENVIRONMENT`  in .env
- Reveal and Copy the `Value`
  - Enter as `PINECONE_API_KEY`  in .env

## 🖥️ Project Install & Document Ingest

#### 1.) Clone Repository

```shell
```

#### 2.) Install Dependancies

```shell
pnpm install
```

#### 3.) Copy your Documents into the `public/docs` Directory

- Note: The `public/docs` folder is reccomended because it allows Next.js to easily link to sources files.

#### 4.) Run `pnpm run ingest` to chuck and vectorize docs into Pincone Index

- Note: This can take a few minutes. Do not abort the command!
- You should see `Loading X chunks into pinecone...` where "X" is the number of vectors from your docs.

#### 5.) Go to `src/configs/ai-configs.ts` and edit the QA_TEMPLATE

- The `QA_TEMPLATE` is the "System Prompt" for the AI. Customize it to fit your documents or objective for your own goals.
- The `CONDENSE_TEMPLATE` is not as important, and I'm using the standard prompt from other Langchain projects.

#### 6.) 🏃‍♂️ Run the Project

- `pnpm run dev`

## 🎨 How to Customize

Use the `src/configs/` folder to make this project your own!

- `ai-configs.ts`: For Model Parameters, Ingest Settings, and Prompts

- `ui-configs.ts`: For Project Titles, UI Messages, Placeholders, and More

- `metadata.ts`: For the Next.js App's Metadata

- `env.ts`: Uses zod to validate env variables. Not needed, just used for basic type/error checking.

## 📋 Commands

All commands are run from the root of the project, from a terminal:

| Command       | Action                                                       |
| :------------ | :----------------------------------------------------------- |
| `pnpm i`      | Installs dependencies                                        |
| `pnpm ingest` | Chucks docs in the `public/docs/` folder and uploads vectors to Pinecone |
| `pnpm dev`    | Starts the local development server at `localhost:3000`      |






## 📓 Learn More

- Langchain Blog on [Similar Project](https://blog.langchain.dev/langchain-chat/)
- [Next.js Docs](https://nextjs.org/docs)
