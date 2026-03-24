import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Menu from './models/Menu';
import MenuItem from './models/MenuItem';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/deepnetsoft_menu';

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('✅ MongoDB connected for seeding...');

  // Clear existing data
  await Menu.deleteMany({});
  await MenuItem.deleteMany({});
  console.log('🗑️  Cleared existing data');

  // ── Top-level categories ──────────────────────────────────────────────────
  const drinks = await Menu.create({ name: 'Drinks', description: 'Refreshing beverages and cocktails' });
  const food = await Menu.create({ name: 'Food', description: 'Delicious main courses and starters' });
  const brunch = await Menu.create({ name: 'Brunch', description: 'Weekend brunch specials' });

  // ── Food sub-menus ────────────────────────────────────────────────────────
  const appetizers = await Menu.create({ name: 'Appetizers', description: 'Start your meal right', parentId: food._id });
  const salads = await Menu.create({ name: 'Salads', description: 'Option to add protein', parentId: food._id });
  const mains = await Menu.create({ name: 'Main Course', description: 'Hearty favourites', parentId: food._id });

  // ── Drinks sub-menus ──────────────────────────────────────────────────────
  const cocktails = await Menu.create({ name: 'Cocktails', description: 'Crafted cocktails', parentId: drinks._id });
  const mocktails = await Menu.create({ name: 'Mocktails', description: 'Non-alcoholic specials', parentId: drinks._id });
  const hotDrinks = await Menu.create({ name: 'Hot Drinks', description: 'Coffee & tea', parentId: drinks._id });

  // ── Brunch sub-menus ──────────────────────────────────────────────────────
  const eggs = await Menu.create({ name: 'Egg Dishes', description: 'Perfectly cooked eggs', parentId: brunch._id });
  const pastries = await Menu.create({ name: 'Pastries', description: 'Fresh baked daily', parentId: brunch._id });

  // ── Appetizer Items ───────────────────────────────────────────────────────
  await MenuItem.insertMany([
    { name: 'Fire Cracker Salmon', description: 'Broiled Cajun salmon bites – topped with bang bang sauce, red peppers and green chiles', price: 16, menuId: appetizers._id },
    { name: 'Lamb Chops', description: 'Garlic and rosemary marinated lamb chops topped with our signature ground mustard sauce', price: 26, menuId: appetizers._id },
    { name: 'Fried Red Snapper Bites', description: 'Deep fried red snapper, served with a house made Cajun remoulade', price: 18, menuId: appetizers._id },
  ]);

  // ── Salad Items ───────────────────────────────────────────────────────────
  await MenuItem.insertMany([
    { name: 'House Salad with Beans', description: 'Fresh garden salad with mixed beans and vinaigrette', price: 6, menuId: salads._id },
    { name: 'Caesar Salad', description: 'Crispy romaine, parmesan, croutons and house caesar dressing', price: 8, menuId: salads._id },
  ]);

  // ── Main Course Items ─────────────────────────────────────────────────────
  await MenuItem.insertMany([
    { name: 'Grilled Ribeye Steak', description: '12oz prime cut served with truffle mashed potatoes', price: 45, menuId: mains._id },
    { name: 'Pan Seared Salmon', description: 'Atlantic salmon with lemon butter sauce and seasonal vegetables', price: 32, menuId: mains._id },
  ]);

  // ── Cocktail Items ────────────────────────────────────────────────────────
  await MenuItem.insertMany([
    { name: 'Mojito', description: 'Fresh mint, lime, rum, and soda water', price: 12, menuId: cocktails._id },
    { name: 'Old Fashioned', description: 'Bourbon, bitters, sugar, and orange peel', price: 14, menuId: cocktails._id },
    { name: 'Margarita', description: 'Tequila, lime juice, and triple sec', price: 13, menuId: cocktails._id },
  ]);

  // ── Mocktail Items ────────────────────────────────────────────────────────
  await MenuItem.insertMany([
    { name: 'Virgin Piña Colada', description: 'Coconut cream, pineapple juice and ice', price: 8, menuId: mocktails._id },
    { name: 'Sunrise Punch', description: 'Orange, grenadine, and ginger ale', price: 7, menuId: mocktails._id },
  ]);

  // ── Hot Drinks Items ──────────────────────────────────────────────────────
  await MenuItem.insertMany([
    { name: 'Espresso', description: 'Double shot of premium arabica', price: 4, menuId: hotDrinks._id },
    { name: 'Cappuccino', description: 'Espresso with steamed milk foam', price: 5, menuId: hotDrinks._id },
  ]);

  // ── Brunch Items ──────────────────────────────────────────────────────────
  await MenuItem.insertMany([
    { name: 'Eggs Benedict', description: 'Poached eggs on English muffin with hollandaise', price: 14, menuId: eggs._id },
    { name: 'Shakshuka', description: 'Poached eggs in spiced tomato and pepper sauce', price: 12, menuId: eggs._id },
  ]);

  await MenuItem.insertMany([
    { name: 'Croissant', description: 'Buttery, flaky French croissant', price: 5, menuId: pastries._id },
    { name: 'Blueberry Muffin', description: 'House-baked with fresh blueberries', price: 4, menuId: pastries._id },
  ]);

  console.log('🌱 Seed data inserted successfully!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('❌ Seed error:', err);
  process.exit(1);
});
