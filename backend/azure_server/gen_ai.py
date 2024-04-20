from transformers import GPT2LMHeadModel, GPT2Tokenizer

model = 'AkshayPM/gpt2_ingredient'
tokenizer = GPT2Tokenizer.from_pretrained(model)
model = GPT2LMHeadModel.from_pretrained(model)

def generate_recipe(ingredients):
    ingredients = ", ".join('"'+ingredient+'"' for ingredient in ingredients)
    prompt =  "Ingredients:\n" + ingredients + "\n\nRecipe:"
    input_ids = tokenizer(prompt, return_tensors="pt").input_ids

    gen_tokens = model.generate(
        input_ids,
        do_sample=True,
        temperature=0.9,
        max_length=512,
        pad_token_id=tokenizer.pad_token_id,
    )
    gen_text = tokenizer.batch_decode(gen_tokens, skip_special_tokens=True)[0]
    return gen_text

