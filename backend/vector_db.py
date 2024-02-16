from pinecone import Pinecone
from sentence_transformers import SentenceTransformer
from recipe_model import get_recipe_by_name

model = SentenceTransformer('all-mpnet-base-v2')

def get_recipe_vector(ingredients):
    ingredients = list(map(lambda x: '"' + x + '"', ingredients))
    ingredients_str = ",".join(ingredients)
    ingredients_str = "{"+ingredients_str+"}"
    pc = Pinecone(api_key='8826d29b-4906-4625-81bd-0be8cadb92f3')
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
        #### Database updatetion(Vector DB) required for escape characters
        if recipe=={}:
            recipe = get_recipe_by_name(result['metadata']['title'].replace("&#39;","'"))
        recipes.append(recipe)
    
    return recipes

