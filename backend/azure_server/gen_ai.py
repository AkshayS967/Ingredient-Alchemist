from transformers import AutoModelForSeq2SeqLM
from transformers import AutoTokenizer

model = "AkshayPM/ingredient_to_recipe"
tokenizer = AutoTokenizer.from_pretrained(model)
model = AutoModelForSeq2SeqLM.from_pretrained(model)

generation_kwargs = {
    "max_length": 512,
    "min_length": 256,
    "no_repeat_ngram_size": 3,
    "do_sample": True,
    "top_k": 60,
    "top_p": 0.95
}


def generate_recipe(ingredients):
    ingredients = "Ingredients: " + ", ".join('"'+ingredient+'"' for ingredient in ingredients)
    print(ingredients)
    inputs = tokenizer(
        ingredients, 
        max_length=512, 
        padding="max_length",
        truncation=True, 
        return_tensors="pt"
    )

    input_ids = inputs.input_ids
    attention_mask = inputs.attention_mask
    generate_ids = model.generate(input_ids=input_ids, attention_mask=attention_mask, **generation_kwargs)
    return tokenizer.batch_decode(generate_ids, skip_special_tokens=True)[0]


