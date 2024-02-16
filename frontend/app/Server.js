import axios from "axios";

export default class Server {
  static server = axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_PHASE == "dev"
        ? "http://127.0.0.1:5000/api"
        : "http://13.126.109.92:5000/api",
  });

  static method = "1";

  static async getRecipes(ingredients) {
    return await this.server.post("/recipes", {
      ingredients,
      method: this.method,
    });
  }

  static async getRecipe(recipe) {
    return await this.server.post(`/recipe`, { name: recipe });
  }
}
