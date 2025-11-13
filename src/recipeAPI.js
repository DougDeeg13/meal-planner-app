import axios from 'axios';

const SPOONACULAR_API_KEY = '04aade467a5340b3b361b66793ced4c0';

export const extractRecipe = async (url) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/extract?url=${encodeURIComponent(url)}&apiKey=${04aade467a5340b3b361b66793ced4c0}`
    );
    
    return {
      id: response.data.id,
      title: response.data.title,
      image: response.data.image,
      servings: response.data.servings,
      readyInMinutes: response.data.readyInMinutes,
      ingredients: response.data.extendedIngredients.map(ing => ({
        name: ing.original,
        amount: ing.amount,
        unit: ing.unit
      })),
      instructions: response.data.instructions || 
                   response.data.analyzedInstructions[0]?.steps.map(step => step.step).join(' ') || 
                   'No instructions available'
    };
  } catch (error) {
    console.error('Error extracting recipe:', error);
    throw error;
  }
};