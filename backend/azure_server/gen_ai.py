# from transformers import GPT2LMHeadModel, GPT2Tokenizer

# model = 'AkshayPM/gpt2_ingredient'
# tokenizer = GPT2Tokenizer.from_pretrained(model)
# model = GPT2LMHeadModel.from_pretrained(model)

# input_ids = tokenizer(prompt, return_tensors="pt").input_ids
# gen_tokens = model.generate(
#     input_ids,
#     do_sample=True,
#     temperature=0.9,
#     max_length=512,
#     pad_token_id=tokenizer.pad_token_id,
# )
# gen_text = tokenizer.batch_decode(gen_tokens, skip_special_tokens=True)[0]
# return gen_text

import requests
import re

API_URL = "https://api-inference.huggingface.co/models/AkshayPM/gpt2_ingredient"
headers = {"Authorization": "Bearer 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"}

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()
	

def generate_recipe(ingredientList):
    ingredients = ", ".join('"'+ingredient+'"' for ingredient in ingredientList)
    prompt =  "Ingredients:\n" + ingredients + "\n\nRecipe:"
    
    output = query({
        "inputs": prompt,
        "parameters": {
            "max_new_tokens": 230,
            "return_full_text": False,
        }
    })
    recipeStr = output[0]['generated_text']
    title = recipeStr.split("\n\n")[0]
    title = re.search(r'Title:\n(.*)', title).group(1)
    recipe = {
        "title": title,
        "ingredients": [ ingredient for ingredient in ingredientList ],
        "instructions": recipeStr.split("\n\n")[1].split("\n")[1],
    }
    return recipe

