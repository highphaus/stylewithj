import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User, UserRole } from '../models/User.js';
import { Branch } from '../models/Branch.js';
import { Category } from '../models/Category.js';
import { Product } from '../models/Product.js';
import { Coupon } from '../models/Coupon.js';
import { Settings } from '../models/Settings.js';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/chefscakeworld';

export const seedDatabase = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to database for seeding...');

    // 1. Settings
    const existingSettings = await Settings.findOne();
    if (!existingSettings) {
      await Settings.create({
        businessName: "Chef's Cake World",
        tagline: 'Crafting Moments of Pure Bliss & Sweetness',
        email: 'contact@chefscakeworld.com',
        phone: '+91 98470 12345',
        whatsappNumber: '+91 98470 12345',
        address: 'Near KSRTC Bus Stand, Main Road, Attingal, Kerala 695101',
        gstNumber: '32AAAAA0000A1Z5',
        fssaiNumber: '11521000000123',
        socialLinks: {
          instagram: 'https://instagram.com/chefscakeworld',
          facebook: 'https://facebook.com/chefscakeworld',
          youtube: 'https://youtube.com/chefscakeworld'
        },
        announcementBar: {
          enabled: true,
          text: 'Special Celebration Offer: Get 10% OFF on all Birthday & Custom Designer Cakes! Use code: CHEF10',
          link: '/cakes'
        },
        taxRatePercent: 5,
        codEnabled: true,
        deliveryEnabled: true
      });
      console.log('[Seed] Settings initialized');
    }

    // 2. Super Admin User
    const existingAdmin = await User.findOne({ email: 'admin@chefscakeworld.com' });
    if (!existingAdmin) {
      await User.create({
        name: "Chef's Executive Director",
        email: 'admin@chefscakeworld.com',
        phone: '+91 98470 12345',
        password: 'AdminPassword@123',
        role: UserRole.SUPER_ADMIN,
        isActive: true
      });
      console.log('[Seed] Super Admin user created: admin@chefscakeworld.com / AdminPassword@123');
    }

    // 3. Branches
    const branchesData = [
      {
        branchCode: 'CCW-KL-01',
        name: "Chef's Cake World - Alamcode",
        address: 'Near Alamcode Junction, Attingal',
        city: 'Attingal',
        state: 'Kerala',
        pincode: '695102',
        phone: '+91 98479 60677',
        email: 'alamcode@chefscakeworld.com',
        coordinates: { lat: 8.7092, lng: 76.8285 },
        serviceablePincodes: ['695102', '695101', '695103', '695104'],
        deliveryZones: [
          { pincode: '695102', deliveryFee: 40, estimatedDeliveryHours: 2, minOrderValue: 399 },
          { pincode: '695101', deliveryFee: 49, estimatedDeliveryHours: 2, minOrderValue: 499 }
        ],
        openingHours: '09:00 AM - 10:30 PM',
        operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        isActive: true
      },
      {
        branchCode: 'CCW-KL-02',
        name: "Chef's Cake World - Ambalathinkara",
        address: 'Ambalathinkara, Kazhakootam',
        city: 'Kazhakootam',
        state: 'Kerala',
        pincode: '695582',
        phone: '+91 70252 17777',
        email: 'ambalathinkara@chefscakeworld.com',
        coordinates: { lat: 8.5721, lng: 76.8682 },
        serviceablePincodes: ['695582', '695581', '695583'],
        deliveryZones: [
          { pincode: '695582', deliveryFee: 40, estimatedDeliveryHours: 2, minOrderValue: 399 }
        ],
        openingHours: '09:00 AM - 11:00 PM',
        operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        isActive: true
      },
      {
        branchCode: 'CCW-KL-03',
        name: "Chef's Cake World - Kumarapuram",
        address: 'Kumarapuram, Medical College PO',
        city: 'Thiruvananthapuram',
        state: 'Kerala',
        pincode: '695011',
        phone: '+91 90722 22655',
        email: 'kumarapuram@chefscakeworld.com',
        coordinates: { lat: 8.5147, lng: 76.9284 },
        serviceablePincodes: ['695011', '695033', '695004'],
        deliveryZones: [
          { pincode: '695011', deliveryFee: 40, estimatedDeliveryHours: 2, minOrderValue: 399 }
        ],
        openingHours: '09:00 AM - 10:30 PM',
        operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        isActive: true
      },
      {
        branchCode: 'CCW-KL-04',
        name: "Chef's Cake World - Ulloor",
        address: 'Ulloor Junction, Medical College Road',
        city: 'Thiruvananthapuram',
        state: 'Kerala',
        pincode: '695011',
        phone: '+91 80866 66207',
        email: 'ulloor@chefscakeworld.com',
        coordinates: { lat: 8.5303, lng: 76.9208 },
        serviceablePincodes: ['695011', '695017', '695015'],
        deliveryZones: [
          { pincode: '695011', deliveryFee: 40, estimatedDeliveryHours: 2, minOrderValue: 399 }
        ],
        openingHours: '09:00 AM - 10:30 PM',
        operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        isActive: true
      },
      {
        branchCode: 'CCW-KL-05',
        name: "Chef's Cake World - Vattappara",
        address: 'Main Road, Vattappara',
        city: 'Thiruvananthapuram',
        state: 'Kerala',
        pincode: '695028',
        phone: '+91 97458 41777',
        email: 'vattappara@chefscakeworld.com',
        coordinates: { lat: 8.6015, lng: 76.9537 },
        serviceablePincodes: ['695028', '695015', '695043'],
        deliveryZones: [
          { pincode: '695028', deliveryFee: 40, estimatedDeliveryHours: 2, minOrderValue: 399 }
        ],
        openingHours: '09:00 AM - 10:30 PM',
        operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        isActive: true
      },
      {
        branchCode: 'CCW-KL-06',
        name: "Chef's Cake World - Vetturoad",
        address: 'Vetturoad Junction, Kaniyapuram, Kazhakootam',
        city: 'Kazhakootam',
        state: 'Kerala',
        pincode: '695301',
        phone: '+91 89210 29932',
        email: 'vetturoad@chefscakeworld.com',
        coordinates: { lat: 8.583323, lng: 76.8626016 },
        serviceablePincodes: ['695301', '695582', '695584'],
        deliveryZones: [
          { pincode: '695301', deliveryFee: 40, estimatedDeliveryHours: 2, minOrderValue: 399 }
        ],
        openingHours: '09:00 AM - 11:00 PM',
        operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        isActive: true
      },
      {
        branchCode: 'CCW-KL-07',
        name: "Chef's Cake World - Attingal",
        address: 'Near KSRTC Bus Stand, Main Road, Attingal',
        city: 'Attingal',
        state: 'Kerala',
        pincode: '695101',
        phone: '+91 98479 60677',
        email: 'attingal@chefscakeworld.com',
        coordinates: { lat: 8.6965, lng: 76.8142 },
        serviceablePincodes: ['695101', '695102', '695103', '695104', '695301'],
        deliveryZones: [
          { pincode: '695101', deliveryFee: 49, estimatedDeliveryHours: 2, minOrderValue: 499 }
        ],
        openingHours: '09:00 AM - 10:30 PM',
        operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        isActive: true
      },
      {
        branchCode: 'CCW-KL-08',
        name: "Chef's Cake World - Kazhakootam",
        address: 'Near Technopark Campus, Kazhakootam, Thiruvananthapuram',
        city: 'Kazhakootam',
        state: 'Kerala',
        pincode: '695582',
        phone: '+91 89210 29932',
        email: 'kazhakootam@chefscakeworld.com',
        coordinates: { lat: 8.5686, lng: 76.8731 },
        serviceablePincodes: ['695582', '695581', '695583', '695584', '695585'],
        deliveryZones: [
          { pincode: '695582', deliveryFee: 49, estimatedDeliveryHours: 2, minOrderValue: 499 }
        ],
        openingHours: '09:00 AM - 11:00 PM',
        operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        isActive: true
      }
    ];

    for (const b of branchesData) {
      await Branch.findOneAndUpdate({ branchCode: b.branchCode }, b, { upsert: true, new: true });
    }
    console.log('[Seed] Branches upserted');

    // 4. Categories
    const categoriesData = [
      {
        name: 'Birthday Cakes',
        slug: 'birthday-cakes',
        description: 'Vibrant handcrafted celebration cakes designed to turn birthdays into cherished memories.',
        image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=800&auto=format&fit=crop',
        displayOrder: 1,
        isActive: true
      },
      {
        name: 'Wedding Cakes',
        slug: 'wedding-cakes',
        description: 'Majestic tiered centerpieces baked with pure luxury and royal artistic aesthetics.',
        image: 'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=800&auto=format&fit=crop',
        displayOrder: 2,
        isActive: true
      },
      {
        name: 'Anniversary Cakes',
        slug: 'anniversary-cakes',
        description: 'Exquisite romantic confections celebrating eternal love and heartfelt milestones.',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop',
        displayOrder: 3,
        isActive: true
      },
      {
        name: 'Chocolate Cakes',
        slug: 'chocolate-cakes',
        description: 'Decadent 70% dark Belgian truffle, ganache, and silky smooth Dutch chocolate indulgences.',
        image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=800&auto=format&fit=crop',
        displayOrder: 4,
        isActive: true
      },
      {
        name: 'Photo Cakes',
        slug: 'photo-cakes',
        description: 'Personalized edible sugar prints rendering your favorite moments in crystal clarity.',
        image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=800&auto=format&fit=crop',
        displayOrder: 5,
        isActive: true
      },
      {
        name: 'Designer Cakes',
        slug: 'designer-cakes',
        description: 'Sculpted fondant, floral artistry, metallic leafing and bespoke artistic creations.',
        image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=800&auto=format&fit=crop',
        displayOrder: 6,
        isActive: true
      },
      {
        name: "Kids' Cakes",
        slug: 'kids-cakes',
        description: 'Enchanting cartoon themes, superhero emblems, and playful colorful fantasy cakes.',
        image: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?q=80&w=800&auto=format&fit=crop',
        displayOrder: 7,
        isActive: true
      },
      {
        name: 'Eggless Delights',
        slug: 'eggless-cakes',
        description: '100% pure vegetarian, feather-light sponge cakes made with premium fresh dairy.',
        image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=800&auto=format&fit=crop',
        displayOrder: 8,
        isActive: true
      },
      {
        name: 'Artisan Pastries',
        slug: 'pastries',
        description: 'Individual artisanal pastry slices layered with pure Callebaut chocolate, fresh mascarpone, and fruit compotes.',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop',
        displayOrder: 9,
        isActive: true
      },
      {
        name: 'Sweets & Desserts',
        slug: 'sweets-desserts',
        description: 'Fusion Indian sweets, Parisian macarons, authentic Italian tiramisu, and rich walnut brownies.',
        image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=800&auto=format&fit=crop',
        displayOrder: 10,
        isActive: true
      }
    ];

    const categoryMap: Record<string, mongoose.Types.ObjectId> = {};
    for (const c of categoriesData) {
      const cat = await Category.findOneAndUpdate({ slug: c.slug }, c, { upsert: true, new: true });
      categoryMap[c.slug] = cat._id as any;
    }
    console.log('[Seed] Categories upserted');

    // 5. Master Products
    const productsData = [
      {
        name: 'Royal Belgian Chocolate Truffle Cake',
        slug: 'royal-belgian-chocolate-truffle-cake',
        description:
          'Our signature masterpiece. Layers of moist dark chocolate sponge draped in rich, silky smooth 70% Callebaut Belgian chocolate ganache and finished with handcrafted artisan chocolate curls.',
        category: categoryMap['chocolate-cakes'] || categoryMap['birthday-cakes'],
        basePrice: 699,
        images: [
          'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop'
        ],
        availableWeights: ['0.5 kg', '1 kg', '1.5 kg', '2 kg', '3 kg'],
        availableFlavours: ['Belgian Dark Truffle', 'Dutch Milk Chocolate', 'Ferrero Hazelnut'],
        egglessAvailable: true,
        eggOptionAvailable: true,
        ingredients: ['70% Belgian Dark Chocolate', 'Dutch Cocoa Powder', 'Heavy Dairy Cream', 'Brown Cane Sugar', 'Madagascar Vanilla'],
        allergens: ['Dairy', 'Gluten'],
        preparationTimeHours: 3,
        isBestSeller: true,
        isFeatured: true,
        isActive: true,
        averageRating: 4.9,
        reviewCount: 142
      },
      {
        name: 'Fresh Red Velvet Cream Cheese Luxe',
        slug: 'fresh-red-velvet-cream-cheese-luxe',
        description:
          'Velvety crimson cocoa sponge layered with luscious whipped Philadelphia cream cheese frosting and dusted with delicate red velvet sponge crumble.',
        category: categoryMap['anniversary-cakes'] || categoryMap['birthday-cakes'],
        basePrice: 749,
        images: [
          'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1616031037011-087161033a2a?q=80&w=800&auto=format&fit=crop'
        ],
        availableWeights: ['0.5 kg', '1 kg', '1.5 kg', '2 kg'],
        availableFlavours: ['Classic Cream Cheese', 'White Chocolate Infusion'],
        egglessAvailable: true,
        eggOptionAvailable: true,
        ingredients: ['Cream Cheese', 'Cocoa Butter', 'Fresh Buttermilk', 'Beetroot Extract', 'Organic Flour'],
        allergens: ['Dairy', 'Gluten'],
        preparationTimeHours: 4,
        isBestSeller: true,
        isFeatured: true,
        isActive: true,
        averageRating: 4.85,
        reviewCount: 98
      },
      {
        name: 'Lotus Biscoff Speculoos Dream Cake',
        slug: 'lotus-biscoff-speculoos-dream-cake',
        description:
          'A modern dessert sensation featuring caramelized cinnamon sponge, creamy Lotus Biscoff spread mousse, topped with crunchy caramelized biscuit drizzle.',
        category: categoryMap['designer-cakes'] || categoryMap['chocolate-cakes'],
        basePrice: 799,
        images: [
          'https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=800&auto=format&fit=crop'
        ],
        availableWeights: ['0.5 kg', '1 kg', '1.5 kg', '2 kg'],
        availableFlavours: ['Original Lotus Biscoff', 'Caramel Buttercrunch'],
        egglessAvailable: true,
        eggOptionAvailable: false,
        ingredients: ['Lotus Biscoff Spread', 'Caramelized Biscuit Crunch', 'Fresh Cream', 'Sea Salt Butter'],
        allergens: ['Dairy', 'Gluten', 'Soy'],
        preparationTimeHours: 4,
        isBestSeller: true,
        isFeatured: true,
        isActive: true,
        averageRating: 4.95,
        reviewCount: 76
      },
      {
        name: 'Exotic Fresh Seasonal Fruit Ambrosia',
        slug: 'exotic-fresh-seasonal-fruit-ambrosia',
        description:
          'Light and airy vanilla sponge filled with delicate whipped mascarpone and crowned with fresh kiwi, strawberries, sweet blueberries, dragon fruit, and sun-ripened mangoes.',
        category: categoryMap['birthday-cakes'] || categoryMap['anniversary-cakes'],
        basePrice: 699,
        images: [
          'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=800&auto=format&fit=crop'
        ],
        availableWeights: ['0.5 kg', '1 kg', '1.5 kg', '2 kg'],
        availableFlavours: ['Fresh Fruit Mascarpone', 'Vanilla Pineapple Fusion'],
        egglessAvailable: true,
        eggOptionAvailable: true,
        ingredients: ['Handpicked Seasonal Fruits', 'Tahitian Vanilla Pods', 'Light Dairy Cream', 'Sponge Flour'],
        allergens: ['Dairy', 'Gluten'],
        preparationTimeHours: 3,
        isBestSeller: false,
        isFeatured: true,
        isActive: true,
        averageRating: 4.8,
        reviewCount: 64
      },
      {
        name: 'Classic Black Forest Cherry Jubilee',
        slug: 'classic-black-forest-cherry-jubilee',
        description:
          'Traditional European artisan recipe made with rich chocolate sponge soaked in dark cherry compote, enveloped with fresh whipped cream and French maraschino cherries.',
        category: categoryMap['birthday-cakes'],
        basePrice: 599,
        images: [
          'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop'
        ],
        availableWeights: ['0.5 kg', '1 kg', '1.5 kg', '2 kg'],
        availableFlavours: ['Classic Black Forest', 'Dark Cherry Truffle'],
        egglessAvailable: true,
        eggOptionAvailable: true,
        ingredients: ['Sour German Cherries', 'Dark Chocolate Shavings', 'Fresh Heavy Cream'],
        allergens: ['Dairy', 'Gluten'],
        preparationTimeHours: 3,
        isBestSeller: false,
        isFeatured: false,
        isActive: true,
        averageRating: 4.75,
        reviewCount: 52
      },
      {
        name: 'Grand Tiered Golden Wedding Masterpiece',
        slug: 'grand-tiered-golden-wedding-masterpiece',
        description:
          'Bespoke three-tiered royal wedding cake adorned with edible 24K gold leaf detailing, ivory fondant drape, and handcrafted sugar peony blossoms. Flavor customisable per tier.',
        category: categoryMap['wedding-cakes'],
        basePrice: 3499,
        images: [
          'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=800&auto=format&fit=crop'
        ],
        availableWeights: ['3 kg', '4 kg', '5 kg'],
        availableFlavours: ['Tier 1: Belgian Truffle / Tier 2: Red Velvet / Tier 3: White Chocolate Berry'],
        egglessAvailable: true,
        eggOptionAvailable: true,
        ingredients: ['Edible 24K Gold Leaf', 'Satin Ice Fondant', 'Callebaut White & Dark Couverture'],
        allergens: ['Dairy', 'Gluten'],
        preparationTimeHours: 24,
        isBestSeller: false,
        isFeatured: true,
        isActive: true,
        averageRating: 5.0,
        reviewCount: 31
      },
      {
        name: 'Magical Unicorn Rainbow Kids Fantasy Cake',
        slug: 'magical-unicorn-rainbow-kids-fantasy-cake',
        description:
          'Multi-colored rainbow sponge layers with strawberry buttercream, golden fondant horn, and pastel floral rosettes. The ultimate dream cake for children birthdays.',
        category: categoryMap['kids-cakes'],
        basePrice: 899,
        images: [
          'https://images.unsplash.com/photo-1562440499-64c9a111f713?q=80&w=800&auto=format&fit=crop'
        ],
        availableWeights: ['1 kg', '1.5 kg', '2 kg'],
        availableFlavours: ['Strawberry Buttercream', 'Vanilla Confetti Surprise'],
        egglessAvailable: true,
        eggOptionAvailable: false,
        ingredients: ['Natural Food Colors', 'Organic Strawberry Puree', 'Fondant Embellishments'],
        allergens: ['Dairy', 'Gluten'],
        preparationTimeHours: 6,
        isBestSeller: true,
        isFeatured: false,
        isActive: true,
        averageRating: 4.9,
        reviewCount: 47
      },
      {
        name: 'Custom Edible Memories Photo Cake',
        slug: 'custom-edible-memories-photo-cake',
        description:
          'High resolution photo printed on 100% edible sugar sheet with food-grade organic inks, seated over your choice of luscious chocolate or vanilla sponge.',
        category: categoryMap['photo-cakes'],
        basePrice: 799,
        images: [
          'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=800&auto=format&fit=crop'
        ],
        availableWeights: ['1 kg', '1.5 kg', '2 kg', '3 kg'],
        availableFlavours: ['Belgian Chocolate', 'Vanilla Truffle', 'Butterscotch Delight'],
        egglessAvailable: true,
        eggOptionAvailable: true,
        ingredients: ['Edible Sugar Paper', 'Organic Food Inks', 'Whipped Cream', 'Cocoa Sponge'],
        allergens: ['Dairy', 'Gluten'],
        preparationTimeHours: 4,
        isBestSeller: false,
        isFeatured: true,
        isActive: true,
        averageRating: 4.85,
        reviewCount: 88
      },
      // Pastries
      {
        name: 'Signature Belgian Chocolate Truffle Pastry',
        slug: 'signature-belgian-chocolate-truffle-pastry',
        description: 'Layers of moist cocoa sponge soaked in sugar syrup, smothered in rich 70% Callebaut Belgian dark chocolate ganache with crisp cocoa pearls.',
        category: categoryMap['pastries'] || categoryMap['chocolate-cakes'],
        basePrice: 129,
        images: [
          'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=800&auto=format&fit=crop'
        ],
        availableWeights: ['1 Slice', 'Box of 2', 'Box of 4'],
        availableFlavours: ['Belgian Dark Truffle', 'Dutch Milk Chocolate'],
        egglessAvailable: true,
        eggOptionAvailable: true,
        ingredients: ['70% Belgian Dark Chocolate', 'Dutch Cocoa', 'Heavy Dairy Cream', 'Brown Cane Sugar'],
        allergens: ['Dairy', 'Gluten'],
        preparationTimeHours: 1,
        isBestSeller: true,
        isFeatured: true,
        isActive: true,
        averageRating: 4.95,
        reviewCount: 182
      },
      {
        name: 'Red Velvet Cream Cheese Pastry',
        slug: 'red-velvet-cream-cheese-pastry',
        description: 'Tender crimson sponge infused with Madagascar vanilla, layered with whipped Philadelphia cream cheese frosting and velvet cake crumble.',
        category: categoryMap['pastries'] || categoryMap['anniversary-cakes'],
        basePrice: 139,
        images: [
          'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1616031037011-087161033a2a?q=80&w=800&auto=format&fit=crop'
        ],
        availableWeights: ['1 Slice', 'Box of 2', 'Box of 4'],
        availableFlavours: ['Classic Cream Cheese', 'White Chocolate Infusion'],
        egglessAvailable: true,
        eggOptionAvailable: true,
        ingredients: ['Philadelphia Cream Cheese', 'Cocoa Butter', 'Fresh Buttermilk', 'Beetroot Extract'],
        allergens: ['Dairy', 'Gluten'],
        preparationTimeHours: 1,
        isBestSeller: true,
        isFeatured: true,
        isActive: true,
        averageRating: 4.89,
        reviewCount: 145
      },
      {
        name: 'Blueberry Mascarpone Cheesecake Pastry',
        slug: 'blueberry-mascarpone-cheesecake-pastry',
        description: 'Velvety baked New York style cheesecake slice on a buttery graham biscuit crust, crowned with French wild blueberry coulis.',
        category: categoryMap['pastries'] || categoryMap['birthday-cakes'],
        basePrice: 159,
        images: [
          'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=800&auto=format&fit=crop'
        ],
        availableWeights: ['1 Slice', 'Box of 2', 'Box of 4'],
        availableFlavours: ['Wild Blueberry Compote'],
        egglessAvailable: true,
        eggOptionAvailable: false,
        ingredients: ['Italian Mascarpone', 'Cream Cheese', 'Wild Blueberries', 'Graham Cracker Crust'],
        allergens: ['Dairy', 'Gluten'],
        preparationTimeHours: 2,
        isBestSeller: true,
        isFeatured: true,
        isActive: true,
        averageRating: 4.92,
        reviewCount: 96
      },
      {
        name: 'Lotus Biscoff Speculoos Pastry',
        slug: 'lotus-biscoff-speculoos-pastry',
        description: 'Spiced cinnamon speculoos sponge layered with creamy Lotus Biscoff spread mousse and finished with crunchy caramelized biscuit crumb.',
        category: categoryMap['pastries'] || categoryMap['designer-cakes'],
        basePrice: 149,
        images: [
          'https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=800&auto=format&fit=crop'
        ],
        availableWeights: ['1 Slice', 'Box of 2', 'Box of 4'],
        availableFlavours: ['Original Lotus Biscoff'],
        egglessAvailable: true,
        eggOptionAvailable: false,
        ingredients: ['Lotus Biscoff Cookies', 'Biscoff Spread', 'Fresh Cream', 'Sea Salt Butter'],
        allergens: ['Dairy', 'Gluten', 'Soy'],
        preparationTimeHours: 1,
        isBestSeller: true,
        isFeatured: false,
        isActive: true,
        averageRating: 4.96,
        reviewCount: 110
      },
      {
        name: 'German Black Forest Gateau Pastry',
        slug: 'german-black-forest-gateau-pastry',
        description: 'Traditional European recipe made with cocoa sponge soaked in dark cherry compote, fresh whipped cream, and shaved Belgian chocolate curls.',
        category: categoryMap['pastries'] || categoryMap['birthday-cakes'],
        basePrice: 119,
        images: [
          'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=800&auto=format&fit=crop'
        ],
        availableWeights: ['1 Slice', 'Box of 2', 'Box of 4'],
        availableFlavours: ['Classic Black Forest'],
        egglessAvailable: true,
        eggOptionAvailable: true,
        ingredients: ['Dark Cherries', 'Dark Chocolate Shavings', 'Fresh Heavy Cream', 'Cocoa Sponge'],
        allergens: ['Dairy', 'Gluten'],
        preparationTimeHours: 1,
        isBestSeller: false,
        isFeatured: false,
        isActive: true,
        averageRating: 4.82,
        reviewCount: 88
      },
      {
        name: 'Ratnagiri Alphonso Mango Mousse Pastry',
        slug: 'mango-alphonso-mousse-pastry',
        description: 'Sun-ripened Alphonso mango mousse over tender vanilla sponge, glazed with tropical mango nectar and white chocolate curls.',
        category: categoryMap['pastries'] || categoryMap['birthday-cakes'],
        basePrice: 129,
        images: [
          'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=800&auto=format&fit=crop'
        ],
        availableWeights: ['1 Slice', 'Box of 2', 'Box of 4'],
        availableFlavours: ['Alphonso Mango Mousse'],
        egglessAvailable: true,
        eggOptionAvailable: false,
        ingredients: ['Alphonso Mango Puree', 'Tahitian Vanilla', 'Light Dairy Cream', 'White Chocolate'],
        allergens: ['Dairy', 'Gluten'],
        preparationTimeHours: 1,
        isBestSeller: false,
        isFeatured: false,
        isActive: true,
        averageRating: 4.88,
        reviewCount: 74
      },
      // Sweets & Desserts
      {
        name: 'Royal Gulab Jamun Fusion Dessert Cup',
        slug: 'royal-gulab-jamun-fusion-dessert-cup',
        description: 'Warm cardamom saffron sponge soaked in light floral syrup, layered with rabdi mousse and crowned with melt-in-mouth miniature Gulab Jamuns & pistachio slivers.',
        category: categoryMap['sweets-desserts'] || categoryMap['birthday-cakes'],
        basePrice: 139,
        images: [
          'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=800&auto=format&fit=crop'
        ],
        availableWeights: ['1 Cup', 'Pack of 2', 'Pack of 4'],
        availableFlavours: ['Saffron Rabdi Fusion'],
        egglessAvailable: true,
        eggOptionAvailable: false,
        ingredients: ['Khoya Gulab Jamun', 'Pure Saffron Rabdi', 'Cardamom', 'Pistachio Flakes'],
        allergens: ['Dairy', 'Nuts', 'Gluten'],
        preparationTimeHours: 1,
        isBestSeller: true,
        isFeatured: true,
        isActive: true,
        averageRating: 4.97,
        reviewCount: 138
      },
      {
        name: 'Artisan French Macarons Gift Box',
        slug: 'artisan-french-macarons-gift-box',
        description: 'Delicate Parisian almond meringue shells filled with handcrafted ganaches: Pistachio, Belgian Dark Truffle, Salted Caramel, Raspberry, Vanilla, and Passion Fruit.',
        category: categoryMap['sweets-desserts'] || categoryMap['designer-cakes'],
        basePrice: 349,
        images: [
          'https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=800&auto=format&fit=crop'
        ],
        availableWeights: ['Box of 6', 'Box of 12'],
        availableFlavours: ['Assorted Parisian Flavors'],
        egglessAvailable: true,
        eggOptionAvailable: false,
        ingredients: ['California Almond Flour', 'Callebaut Couverture', 'Pure Fruit Purees', 'Powdered Cane Sugar'],
        allergens: ['Dairy', 'Nuts'],
        preparationTimeHours: 2,
        isBestSeller: true,
        isFeatured: true,
        isActive: true,
        averageRating: 4.94,
        reviewCount: 160
      },
      {
        name: 'Classic Italian Espresso Tiramisu Cup',
        slug: 'classic-italian-espresso-tiramisu-cup',
        description: 'Authentic Savoiardi ladyfingers steeped in dark roast Arabica espresso, enveloped in whipped mascarpone cream and dusted with French Valrhona cocoa.',
        category: categoryMap['sweets-desserts'] || categoryMap['chocolate-cakes'],
        basePrice: 169,
        images: [
          'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=800&auto=format&fit=crop'
        ],
        availableWeights: ['1 Cup', 'Pack of 2', 'Pack of 4'],
        availableFlavours: ['Espresso Mascarpone'],
        egglessAvailable: true,
        eggOptionAvailable: true,
        ingredients: ['Italian Mascarpone', 'Arabica Espresso', 'Ladyfingers', 'Valrhona Cocoa'],
        allergens: ['Dairy', 'Gluten'],
        preparationTimeHours: 2,
        isBestSeller: true,
        isFeatured: true,
        isActive: true,
        averageRating: 4.91,
        reviewCount: 124
      },
      {
        name: 'Saffron Rasmalai Tres Leches Dessert',
        slug: 'saffron-rasmalai-tres-leches-dessert',
        description: 'Airy cardamom sponge drenched in saffron-infused three-milk rabdi, garnished with fresh tender Rasmalai discs and toasted almond flakes.',
        category: categoryMap['sweets-desserts'] || categoryMap['birthday-cakes'],
        basePrice: 159,
        images: [
          'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=800&auto=format&fit=crop'
        ],
        availableWeights: ['1 Cup', 'Pack of 2', 'Pack of 4'],
        availableFlavours: ['Kesar Rasmalai Tres Leches'],
        egglessAvailable: true,
        eggOptionAvailable: false,
        ingredients: ['Fresh Rasmalai', 'Kashmiri Saffron', 'Condensed Milk', 'Cardamom', 'Almonds'],
        allergens: ['Dairy', 'Nuts', 'Gluten'],
        preparationTimeHours: 2,
        isBestSeller: true,
        isFeatured: true,
        isActive: true,
        averageRating: 4.98,
        reviewCount: 210
      },
      {
        name: 'Belgian Chocolate Walnut Fudge Brownie',
        slug: 'belgian-chocolate-walnut-fudge-brownie',
        description: 'Decadently dense, fudgy artisan brownie baked with 70% Callebaut dark chocolate and loaded with roasted California walnuts.',
        category: categoryMap['sweets-desserts'] || categoryMap['chocolate-cakes'],
        basePrice: 119,
        images: [
          'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop'
        ],
        availableWeights: ['1 Piece', 'Box of 2', 'Box of 4', 'Box of 6'],
        availableFlavours: ['Double Chocolate Walnut'],
        egglessAvailable: true,
        eggOptionAvailable: true,
        ingredients: ['70% Belgian Couverture', 'California Walnuts', 'Cultured Dairy Butter', 'Cane Sugar'],
        allergens: ['Dairy', 'Nuts', 'Gluten'],
        preparationTimeHours: 1,
        isBestSeller: false,
        isFeatured: false,
        isActive: true,
        averageRating: 4.86,
        reviewCount: 175
      },
      {
        name: 'Motichoor Ladoo Rabdi Mousse Parfait',
        slug: 'motichoor-ladoo-rabdi-mousse-parfait',
        description: 'A celebratory Indian-Western fusion parfait with pure ghee motichoor crumble, velvety condensed milk rabdi mousse, and edible silver vark.',
        category: categoryMap['sweets-desserts'] || categoryMap['birthday-cakes'],
        basePrice: 139,
        images: [
          'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop'
        ],
        availableWeights: ['1 Jar', 'Pack of 2', 'Pack of 4'],
        availableFlavours: ['Pure Ghee Motichoor Rabdi'],
        egglessAvailable: true,
        eggOptionAvailable: false,
        ingredients: ['Pure Ghee Motichoor', 'Malai Rabdi Mousse', 'Pistachios', 'Edible Silver Foil'],
        allergens: ['Dairy', 'Nuts'],
        preparationTimeHours: 1,
        isBestSeller: false,
        isFeatured: false,
        isActive: true,
        averageRating: 4.93,
        reviewCount: 102
      }
    ];

    for (const p of productsData) {
      await Product.findOneAndUpdate({ slug: p.slug }, p, { upsert: true, new: true });
    }
    console.log('[Seed] Master Products upserted');

    // 6. Promotional Coupons
    const couponsData = [
      {
        code: 'CHEF10',
        discountType: 'PERCENTAGE',
        discountValue: 10,
        minOrderValue: 499,
        maxDiscount: 200,
        expiryDate: new Date('2028-12-31'),
        usageLimit: 1000,
        isActive: true
      },
      {
        code: 'WELCOME50',
        discountType: 'FLAT',
        discountValue: 50,
        minOrderValue: 499,
        maxDiscount: 50,
        expiryDate: new Date('2028-12-31'),
        usageLimit: 500,
        isActive: true
      },
      {
        code: 'SWEET15',
        discountType: 'PERCENTAGE',
        discountValue: 15,
        minOrderValue: 999,
        maxDiscount: 350,
        expiryDate: new Date('2028-12-31'),
        usageLimit: 250,
        isActive: true
      }
    ];

    for (const cp of couponsData) {
      await Coupon.findOneAndUpdate({ code: cp.code }, cp, { upsert: true, new: true });
    }
    console.log('[Seed] Coupons upserted');

    console.log('[Seed] Seeding completed successfully!');
  } catch (error) {
    console.error('[Seed] Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
  }
};

// Execute if run directly
if (process.argv[1] && process.argv[1].includes('seedData')) {
  seedDatabase();
}

