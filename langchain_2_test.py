import os

from dotenv import load_dotenv
from langchain.chains import RetrievalQA
from langchain_community.document_loaders import CSVLoader
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.llms import OpenAI
from langchain_community.vectorstores import DocArrayInMemorySearch
import warnings

# Ignore specific warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)


load_dotenv()


loader = CSVLoader(
    file_path="woolworths_specials.csv", encoding="utf-8"
)
data = loader.load()

embeddings = OpenAIEmbeddings()
vector_store = DocArrayInMemorySearch.from_documents(data, embeddings)

qa = RetrievalQA.from_chain_type(
    llm=OpenAI(),
    chain_type="stuff",
    retriever=vector_store.as_retriever(),
    return_source_documents=True,
)

prompt = "You are a JSON-generating kiosk, incapable of responding in English sentences. I will be giving you a " \
    "set of ingredients with their corresponding costs."
prompt += "Take EXCLUSIVELY the ingredients I provide, and create a nutritious meal-plan for beginner-to-average " \
    "home-cooks, for the lowest cost possible."
prompt += "You will give me EXCLUSIVELY the meal plan for monday and tuesday, as an array of json objects and " \
    "nothing more or less."
prompt += "You will give me NO introductory statements such as 'Here is your meal plan'. "
prompt += "recipeDescriptions will be in the format 'with key_ingredient_1 and key_ingredient_2', choosing those " \
    "key ingredients based on the recipe."
prompt += "These are the ingredients and each of their corresponding costs: \n"

result = qa({"query": prompt})

print(result)
