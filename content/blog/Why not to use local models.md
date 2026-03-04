# Why Not to Use Local Models: The Honest Truth

*Category: AI & Development | Read Time: 6 min*

In the last few days I've seen a lot of posts and videos saying "you can save $200 a month in Claude Code by using local models", but here is the honest truth that these videos and posts aren't telling you.

First: most posts would tell you to use small models like Qwen2.5 3B or 7B which, even when quantized and shrunk down, are 4GB and 10GB models on disk. That means you need at least this amount of video memory on your graphics card to run them with decent speeds.

If you have enough VRAM to run them, congratulations — this is not the main problem for you.

Second: when you run local models on your computer (desktops and specifically laptops), you are allocating resources to run them, which (when actively running and generating tokens) are as consuming as crypto mining is. So you have to be always plugged in, and it will slow down your computer. Your builds are going to be slower, your dev server is going to be slower. Especially with budget computers, it would make your development experience more of a nightmare.

Third: when you are using a 3B, 7B, or even a 32 billion parameter model, you get nowhere near the performance of the models that are used with Claude Code. You can't even compare the quality of the output of Claude Opus or Sonnet — these are two different worlds.

When someone tells you "you could save $200 a month by using a local model", they are not telling you what you are spending instead of the $200. You are getting an otherworldly lower quality model and you are getting a significantly lower quality output.

You are spending your electricity; you are generating heat, and slowing your computer down, especially on a laptop, while getting fewer tokens per second. You are making your experience as a developer worse, and this is the wrong way of saving money.

## So What Are the Alternatives?

There are lots of alternatives that you can use instead of paying hundreds of dollars a month. Claude offers a $20 Pro plan; you can use it in Claude Code, and it is enough for casual use. If that is too much or you don't want to spend a penny for using AI, you can try something else like running Claude Code via Ollama. Ollama has a lot of free cloud models that you can use, like MiniMax M-2.5, that is completely free. You can run it by using the command `ollama launch claude --model minimax-m2.5:cloud`. It is completely free with generous rate limits and it is far more advanced than anything that you can run locally on a budget laptop or any consumer PC. Even with a MacBook Pro with 128 GB of memory (which is the best case scenario for a consumer), you can't run this model locally because it is 457 GB on disk and you need at least 457 GB of available memory to load it.

There are also lots of cheap alternatives to Anthropic, like running GLM models with their $10 plan that gives you access to GLM 5, which is at the same level as Claude Opus 4.5 and near to the state-of-the-art. You can even try Moonshot's Kimi K2.5, which is also affordable and very capable. It's not as capable as the state-of-the-art models but it is on the higher end of the spectrum.

There are also other ecosystems with big communities, like Opencode, that offers free models all the time like the same MiniMax M2.5 and other free models that you can try. They are also offering a generous $10 with the big 3 open weight models (Kimi K2.5, GLM5 and MiniMax M2.5), while being able to bring other AI models from other labs like GPT models (via API or even ChatGPT subscription), Gemini models, or even Claude models via API, and others.

That said, using a small model that runs on your laptop isn't really replacing Claude models because it isn't competing with Claude models.

So why would you ever try running local small models if you have a budget laptop or desktop with the amount of video memory? You can run local models to experiment and get your foot in the door in the AI world so you can know:

- What is the difference between one model and another
- What is the model sizes
- What are parameters
- What is quantization

You can use it to play with them. I used to download local models and play with them. You should use them to research what AI is and how those models work so you can get how big models work and to get an idea about AI. You should not use them to replace big models because these are two different worlds.

The best way to know the difference between big models is to use small models to see the vast difference in quality and in output. You might think that all models are the same but you wouldn't get the huge difference unless you tried small models like these.

## The Price of Privacy

Privacy is a big concern if you are working with sensitive information, company information, or governmental information. In these cases, using cloud models is simply not an option.

But we have to talk about the real price of privacy.

Obviously, we can't run very small models here because is privacy really a concern when the tool is not even doing the job? Let's be brutally honest: if you can't afford to run real working models, the best way to get your privacy is to code by hand. Either that or you will be a babysitter for models that don't even know how to use tools or call functions correctly.

If you really care about privacy, you should invest in the hardware that runs the inference locally. Privacy costs significantly more than $200 a month. It costs thousands of dollars to get hardware capable of running models that are playing catch-up with the state of the art.

To get a model like GLM5 or MiniMax M2.5 running locally, you have to get enterprise-grade systems. They cost thousands of dollars, but they are a one-time payment instead of a recurring monthly fee. This is the true price of privacy. We can't be serious saying that you can get your privacy by running a local model on 10 GB of memory. Whoever says that is just a snake oil salesman who doesn't even use the tools they recommend to you.

