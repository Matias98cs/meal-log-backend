interface SeedIngredient {
  name: string;
  categoria_ing: string;
}

interface seedIngredientsData {
  ingredients: SeedIngredient[];
}

export const INGREDIENTS_SEED_DATA: seedIngredientsData = {
  ingredients: [
    // PROTEINAS
    { name: 'Pechuga de Pollo', categoria_ing: 'Proteína' },
    { name: 'Carne de Vaca (Magra)', categoria_ing: 'Proteína' },
    { name: 'Huevo', categoria_ing: 'Proteína' },
    { name: 'Pescado (Merluza/Salmón)', categoria_ing: 'Proteína' },
    { name: 'Cerdo (Solomillo)', categoria_ing: 'Proteína' },
    { name: 'Lentejas', categoria_ing: 'Proteína Vegetal' },
    { name: 'Garbanzos', categoria_ing: 'Proteína Vegetal' },

    // CARBOHIDRATOS
    { name: 'Arroz Blanco', categoria_ing: 'Carbohidrato' },
    { name: 'Arroz Integral', categoria_ing: 'Carbohidrato' },
    { name: 'Papa / Patata', categoria_ing: 'Carbohidrato' },
    { name: 'Batata / Camote', categoria_ing: 'Carbohidrato' },
    { name: 'Fideos / Pasta', categoria_ing: 'Carbohidrato' },
    { name: 'Pan Integral', categoria_ing: 'Carbohidrato' },
    { name: 'Avena', categoria_ing: 'Carbohidrato' },

    // GRASAS
    { name: 'Aceite de Oliva', categoria_ing: 'Grasa' },
    { name: 'Palta / Aguacate', categoria_ing: 'Grasa' },
    { name: 'Nueces', categoria_ing: 'Grasa/Fruto Seco' },
    { name: 'Almendras', categoria_ing: 'Grasa/Fruto Seco' },
    { name: 'Manteca / Mantequilla', categoria_ing: 'Grasa' },

    // VEGETALES Y OTROS
    { name: 'Tomate', categoria_ing: 'Vegetal' },
    { name: 'Lechuga', categoria_ing: 'Vegetal' },
    { name: 'Cebolla', categoria_ing: 'Vegetal' },
    { name: 'Espinaca', categoria_ing: 'Vegetal' },
    { name: 'Zanahoria', categoria_ing: 'Vegetal' },
    { name: 'Brócoli', categoria_ing: 'Vegetal' },
    { name: 'Leche', categoria_ing: 'Lácteo' },
    { name: 'Queso', categoria_ing: 'Lácteo' },
    { name: 'Yogurt', categoria_ing: 'Lácteo' },
  ],
};
