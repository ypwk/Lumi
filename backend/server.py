#! /usr/bin/python3
from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForCausalLM
from langchain.llms import HuggingFacePipeline
from langchain.prompts import PromptTemplate

llm = HuggingFacePipeline.from_model_id(
    model_id="garage-bAInd/Platypus2-7B",
    task="text-generation",
    model_kwargs={"temperature": 0, "max_length": 64},
)

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "This is my first API sadf!"


@app.route("/post", methods=["POST"])
def testpost():
    input_json = request.get_json(force=True)
    dictToReturn = {"text": input_json["text"]}
    return jsonify(dictToReturn)
