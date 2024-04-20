import itertools
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import psycopg2
from psycopg2 import extras
import os
from dotenv import load_dotenv

load_dotenv()

PHASE = os.getenv('PHASE')
DATABASE = os.getenv('DATABASE')
PASSWORD = os.getenv('PASSWORD')
HOST = os.getenv('HOST')
PORT = os.getenv('PORT')

def establish_db_conn():
    try:
        if PHASE == 'dev':
            conn = psycopg2.connect(database=DATABASE, user='postgres', password=PASSWORD, host=HOST, port=PORT)
        else:
            conn = psycopg2.connect(database=DATABASE, user='postgres', password=PASSWORD, host=HOST, port=PORT, sslmode='require', sslrootcert='ap-south-1-bundle.pem')
        cursor = conn.cursor(cursor_factory=extras.DictCursor)
    except Exception as e:
        print(e)
    
    return conn, cursor

conn, cursor = establish_db_conn()

def get_recipes():
    initialBaseSQL = "select * from recipe where img_url != 'https://img.sndimg.com/food/image/upload/q_92,fl_progressive,w_1200,c_scale/v1/gk-static/fdc-new/img/fdc-shareGraphic.png' and img_url != 'https://food.fnr.sndimg.com/content/dam/images/food/editorial/homepage/fn-feature.jpg.rend.hgtvcom.1280.1280.suffix/1474463768097.jpeg'"
    if PHASE == 'dev':
        cursor.execute(initialBaseSQL)
    else:
        cursor.execute(initialBaseSQL+'limit 10000')
    recipes = cursor.fetchall()
    return recipes

data = get_recipes()
import time
start = time.process_time()
recipes = [ dict(i) for i in data ]
print(time.process_time() - start)
for recipe in recipes:
    recipe['ingredients'] = ','.join(recipe['ingredients'])
tfidf_vectorizer = TfidfVectorizer(stop_words='english')
recipe_descriptions = [recipe['title'] + ' ' + recipe['ingredients'] for recipe in recipes]
tfidf_matrix = tfidf_vectorizer.fit_transform(recipe_descriptions)

baseSQL = "SELECT * FROM recipe WHERE calories BETWEEN %s AND %s AND carbohydrate BETWEEN %s AND %s AND protein BETWEEN %s AND %s AND fat BETWEEN %s AND %s AND cholesterol BETWEEN %s AND %s AND sodium BETWEEN %s AND %s AND sugar BETWEEN %s AND %s AND img_url not like 'https://img.sndimg.com/food/image/upload/q_92,fl_progressive,w_1200,c_scale/v1/gk-static/fdc-new/img/fdc-shareGraphic.png'"

def powerset(iterable):
    s = list(iterable)
    return itertools.chain.from_iterable(itertools.combinations(s, r) for r in range(len(s) + 1))

def match_ingredients(recipe_ingredients, given_ingredients):
    recipe_ingredients_lowercase = [ingredient.lower() for ingredient in recipe_ingredients]
    given_ingredients_lowercase = [ingredient.lower() for ingredient in given_ingredients]

    exact_match = True
    for given_ingredient in given_ingredients_lowercase:
        if given_ingredient not in recipe_ingredients_lowercase:
            exact_match = False
            break

    subset_match = True
    for recipe_ingredient in recipe_ingredients_lowercase:
        if recipe_ingredient not in given_ingredients_lowercase:
            subset_match = False
            break

    return exact_match or subset_match

class FCI:
  def _init_(self, min_support):
    self.min_support = min_support
    self.frequent_itemsets = set()

  def fit(self, transactions):
    item_counts = {}
    for transaction in transactions:
      for item in transaction.split(','):
        item = item.strip()
        item_counts[item] = item_counts.get(item, 0) + 1

    min_support_count = self.min_support * len(transactions)
    frequent_items = set([item for item, count in item_counts.items() if count >= min_support_count])

    self.frequent_itemsets = self.find_closed_itemsets(frequent_items, transactions)

  def find_closed_itemsets(self, itemset, transactions):
    item={}
    closed_itemsets = set()
    for transaction in transactions:
      transaction_items = set(transaction.split(','))
      if itemset.issubset(transaction_items):
        new_transactions = [t for t in transactions if set(t.split(',')).issuperset(itemset)]
        frequent_subsets = self.find_closed_itemsets(itemset - {item}, new_transactions)
        closed_itemsets.add(itemset)
        for subset in frequent_subsets:
          if subset.issubset(itemset):
            closed_itemsets.remove(subset)

    return closed_itemsets


def generate_frequent_itemsets(recipe_ingredients, min_support):
    item_counts = {}
    for recipe in recipe_ingredients:
        for ingredient in recipe.split(','):
            ingredient = ingredient.strip()
            item_counts[ingredient] = item_counts.get(ingredient, 0) + 1

    min_support_count = min_support * len(recipe_ingredients)
    frequent_itemsets = set()
    for item, count in item_counts.items():
        if count >= min_support_count:
            frequent_itemsets.add(frozenset([item]))

    candidate_itemsets = frequent_itemsets
    while candidate_itemsets:
        new_candidate_itemsets = set()
        for itemset1 in candidate_itemsets:
            for itemset2 in candidate_itemsets:
                if len(itemset1) == len(itemset2) - 1 and itemset1.issubset(itemset2):
                    new_candidate = frozenset(itemset1 | itemset2)
                    support = 0
                    for recipe in recipe_ingredients:
                        if new_candidate.issubset(set(recipe.split(','))):
                            support += 1

                    if support >= min_support_count:
                        new_candidate_itemsets.add(new_candidate)

        candidate_itemsets = new_candidate_itemsets

    return frequent_itemsets
    
def generate_association_rules(frequent_itemsets, min_confidence):
    association_rules = []

    for itemset in frequent_itemsets:
        recipe_ingredients = [recipe.split(',') for recipe in recipes]
        for antecedent in powerset(itemset):
            if len(antecedent) > 0:
                consequent = itemset - antecedent

                support = len([recipe for recipe in recipe_ingredients if antecedent.issubset(set(recipe.split(',')))]) / len(recipe_ingredients)

                confidence = len([recipe for recipe in recipe_ingredients if antecedent.issubset(set(recipe.split(','))) and consequent.issubset(set(recipe.split(',')))]) / len([recipe for recipe in recipe_ingredients if antecedent.issubset(set(recipe.split(',')))])

                if confidence >= min_confidence:
                    rule = AssociationRule(antecedent, consequent, support, confidence)
                    association_rules.append(rule)

    return association_rules
    
def recommend_recipes(given_ingredients, association_rules):
    recommended_recipes = []
    recipe_ingredients = [recipe['ingredients'] for recipe in recipes]

    for rule in association_rules:
        if rule.antecedent.issubset(given_ingredients):
            for recipe in recipe_ingredients:
                if rule.consequent.issubset(set(recipe.split(','))) and not rule.antecedent.issubset(set(recipe.split(','))):
                    recipe_str = ' '.join(set(recipe.split(',')))
                    recommended_recipes.append(recipe_str)

    return recommended_recipes

class AssociationRule:
    def _init_(self, antecedent, consequent, support, confidence):
        self.antecedent = antecedent
        self.consequent = consequent
        self.support = support
        self.confidence = confidence

    def _str_(self):
        return str(self.antecedent) + " -> " + str(self.consequent) + " (" + str(self.confidence * 100) + "% confidence)"


def get_suggested_recipes(ingredients):
    given_ingredients = ingredients
    min_support = 0.2
    min_confidence = 0.5

    recipe_data = data

    recipes = []
    for index, row in recipe_data.iterrows():
        recipe_ingredients = row['ingredients'].split(',')
        recipes.append(recipe_ingredients)

    frequent_itemsets = generate_frequent_itemsets(recipes, min_support)
    association_rules = generate_association_rules(frequent_itemsets, min_confidence)
    recommended_recipe_list = recommend_recipes(given_ingredients, association_rules)
    return recommended_recipe_list

def get_recommended_recipes(ingredients):
    user_input_ingredients = ','.join(ingredients)
    user_input_tfidf = tfidf_vectorizer.transform([user_input_ingredients])
    cosine_similarities = linear_kernel(user_input_tfidf, tfidf_matrix).flatten()
    similar_recipe_indices = cosine_similarities.argsort()[::-1]
    num_recommendations = 9
    recommeded_recipes = []

    for i in range(num_recommendations):
        recipe_index = similar_recipe_indices[i]
        recipe = recipes[recipe_index]
        recommeded_recipes.append(recipe)
    return recommeded_recipes

def get_recipe_by_name(name):
    try:
        cursor.execute("""select * from recipe where title = %s""", ([name]))
        data = cursor.fetchall()
        recipe = dict(data[0]) if data else {}
    except Exception as e:
        raise e
    return recipe

def get_recommended_recipes_with_filter(ingredients, nutrition):
    sqlParams = (
        nutrition['calories'][0], nutrition['calories'][1],
        nutrition['carbs'][0], nutrition['carbs'][1],
        nutrition['protein'][0], nutrition['protein'][1],
        nutrition['fat'][0], nutrition['fat'][1],
        nutrition['cholesterol'][0], nutrition['cholesterol'][1],
        nutrition['sodium'][0], nutrition['sodium'][1],
        nutrition['sugar'][0], nutrition['sugar'][1]
    )
    try:
        if PHASE == 'dev':
            cursor.execute(baseSQL, sqlParams)
        else:
            cursor.execute(baseSQL+'limit 5000', sqlParams)
        data = cursor.fetchall()
        if data == []:
           return []
    except Exception as e:
        raise e
    
    recipes = [ dict(i) for i in data ]
    for recipe in recipes:
        recipe['ingredients'] = ','.join(recipe['ingredients'])
    tfidf_vectorizer = TfidfVectorizer(stop_words='english')
    recipe_descriptions = [recipe['title'] + ' ' + recipe['ingredients'] for recipe in recipes]
    tfidf_matrix = tfidf_vectorizer.fit_transform(recipe_descriptions)

    user_input_ingredients = ','.join(ingredients)
    user_input_tfidf = tfidf_vectorizer.transform([user_input_ingredients])
    cosine_similarities = linear_kernel(user_input_tfidf, tfidf_matrix).flatten()
    similar_recipe_indices = cosine_similarities.argsort()[::-1]
    num_recommendations = 9
    recommeded_recipes = []
   
    for i in range(min(num_recommendations, len(similar_recipe_indices))):
        recipe_index = similar_recipe_indices[i]
        recipe = recipes[recipe_index]
        recommeded_recipes.append(recipe)
    return recommeded_recipes
