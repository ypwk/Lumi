#! /usr/bin/python3
import time
from flask import Flask, request, jsonify, Response
from transformers import AutoTokenizer, AutoModelForCausalLM, TextIteratorStreamer
from langchain.llms.base import LLM
from langchain.prompts import PromptTemplate
from typing import Optional
from threading import Thread
import torch.cuda

print("loading model...")

# model_id = "garage-bAInd/Platypus2-7B"
device = "cuda:0" if torch.cuda.is_available() else "cpu"
model_id = "mistralai/Mistral-7B-Instruct-v0.1"
model = AutoModelForCausalLM.from_pretrained(model_id, torch_dtype=torch.float16).to(
    device
)
tokenizer = AutoTokenizer.from_pretrained(model_id)


class CustomLLM(LLM):
    streamer: Optional[TextIteratorStreamer] = None
    history = []

    def _call(self, prompt, stop=None, run_manager=None) -> str:
        self.history = []
        self.streamer = TextIteratorStreamer(
            tokenizer=tokenizer, skip_prompt=True, timeout=5
        )
        inputs = tokenizer(prompt, return_tensors="pt").to(device)
        kwargs = dict(
            input_ids=inputs.input_ids,
            max_new_tokens=500,
            streamer=self.streamer,
            pad_token_id=tokenizer.eos_token_id,
        )
        thread = Thread(target=model.generate, kwargs=kwargs)
        thread.start()
        return ""

    @property
    def _llm_type(self) -> str:
        return "custom"

    def stream_tokens(self):
        try:
            for token in self.streamer:
                time.sleep(0.05)
                yield 'data: %s\n\n' % token
        except Exception:
            self.stream_tokens()


tokenizer.pad_token_id = model.config.eos_token_id

template = """You are a virtual assistant named Lumi. 
Question: {question}
Answer: """
prompt = PromptTemplate.from_template(template)
llm = CustomLLM()
chain = prompt | llm

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "This is my first API sadf!"


@app.route("/query", methods=["GET"])
def query():
    question = request.args.get("question")
    print(question)
    chain.invoke(input=dict({"question": question}))
    return Response(llm.stream_tokens(), mimetype="text/event-stream")


if __name__ == '__main__':
    app.debug = True
    app.run(threaded=True)
