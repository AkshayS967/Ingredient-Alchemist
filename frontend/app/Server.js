import axios from "axios";

export default class Server {
    constructor() {
        this.server = axios.create({
        baseURL: process.env.NEXT_PUBLIC_PHASE=="dev"?"http://127.0.0.1:5000/api":"http://13.126.109.92/api",
        });
    }
    
    async getRecipes(ingredients) {
        return await this.server.post("/recipes", { ingredients });
    }

    async getRecipe(recipe) {
        return await this.server.post(`/recipe`, { name: recipe });
    }
    
    // async getIngredients() {
    //     return await this.server.get("/ingredients");
    // }
    
    // async getRecipesByIngredients(ingredients) {
    //     return await this.server.post("/recipes", { ingredients });
    // }
}