from flask import Flask, request, jsonify
from flask_cors import CORS
from gen_ai import generate_recipe

app = Flask(__name__)
CORS(app)

@app.route('/api/genai', methods=['POST'])
def get_recipe():
    try:
        data = request.get_json(force=True)
        res = generate_recipe(data['ingredients'])
        return res
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=4000, host='0.0.0.0')