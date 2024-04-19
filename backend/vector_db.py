from pinecone import Pinecone
from sentence_transformers import SentenceTransformer
from recipe_model import get_recipe_by_name
import os

model = SentenceTransformer('all-mpnet-base-v2')
PINECONE_API_KEY = os.getenv('PINECONE_API_KEY')

def get_recipe_vector(ingredientsWithQuantity, quantityEnabled):
    ingredients = []
    if quantityEnabled:
        for ingredient, quantity in ingredientsWithQuantity:
            unit = ' '+quantity['unit']+' ' if quantity['unit'] else ''
            ingredients.append('"'+quantity['amount'] + unit + ' ' + ingredient+'"')
    else:
        for ingredient in ingredientsWithQuantity:
            ingredients.append('"'+ingredient+'"')
    ingredients_str = ",".join(ingredients)
    ingredients_str = "{"+ingredients_str+"}"
    pc = Pinecone(api_key=PINECONE_API_KEY)
    index = pc.Index('ingredients')

    search_vector = model.encode(ingredients_str)
    results = index.query(
        vector=search_vector.tolist(),
        top_k=9,
        include_values=True,
        include_metadata=True
    )
    
    recipes = []
    for result in results['matches']:
        recipe = get_recipe_by_name(result['metadata']['title'])
        #### Database updation(Vector DB) required for escape characters
        if recipe=={}:
            recipe = get_recipe_by_name(result['metadata']['title'].replace("&#39;","'"))
        recipes.append(recipe)
    
    return recipes


