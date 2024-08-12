from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

app = FastAPI()

correct='TRAIN'

@app.get('/answer')
def get_correct():
    return correct

app.mount("/wordle", StaticFiles(directory="static", html=True), name="static")