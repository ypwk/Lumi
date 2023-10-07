#! /usr/bin/python3
from flask import Flask, request, jsonify
from optimum.onnxruntime import ORTModelForQuestionAnswering
from transformers import AutoTokenizer, pipeline, AutoModelForCausalLM
from langchain.llms import HuggingFacePipeline
from langchain.prompts import PromptTemplate
import time

# model_id = "garage-bAInd/Platypus2-7B"
model_id = "mistralai/Mistral-7B-v0.1"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id)
pipe = pipeline("text-generation", model=model, tokenizer=tokenizer, max_new_tokens=30)

tokenizer.pad_token_id = model.config.eos_token_id

llm = HuggingFacePipeline(pipeline=pipe)

template = """Question: {question}

Answer: Let's think step by step."""
prompt = PromptTemplate.from_template(template)
chain = prompt | llm

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "This is my first API sadf!"


@app.route("/query/<question>", methods=["GET"])
def query(question):
    start = time.time()
    response = chain.invoke({"question": question})
    end = time.time()
    dictToReturn = {
        "response": response,
        "time_to_compute": str(end - start)
    }
    return jsonify(dictToReturn)
