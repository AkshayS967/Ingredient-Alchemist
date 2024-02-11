from flask import Flask, request, jsonify
from flask_cors import CORS
from recipe_model import get_recommended_recipes, get_recipe_by_name

app = Flask(__name__)
CORS(app)

@app.route('/api/recipes', methods=['POST'])
def get_recipes():
    try:
        data = request.get_json(force=True)
        res =  get_recommended_recipes(data['ingredients'])
        return res
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/api/recipe', methods=['POST'])
def get_recipe():
    try:
        data = request.get_json(force=True)
        res = get_recipe_by_name(data['name'])
        return res
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})


if __name__ == "__main__":
    app.run(debug=True, port=5000, host='0.0.0.0')