"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_js_1 = require("../models/User.js");
const Branch_js_1 = require("../models/Branch.js");
const Category_js_1 = require("../models/Category.js");
const Product_js_1 = require("../models/Product.js");
const Coupon_js_1 = require("../models/Coupon.js");
const Settings_js_1 = require("../models/Settings.js");
dotenv_1.default.config();
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/chefscakeworld';
const seedDatabase = async () => {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log('[Seed] Connected to database for seeding...');
        // 1. Settings
        const existingSettings = await Settings_js_1.Settings.findOne();
        if (!existingSettings) {
            await Settings_js_1.Settings.create({
                businessName: "Chef's Cake World",
                tagline: 'Crafting Moments of Pure Bliss & Sweetness',
                email: 'contact@chefscakeworld.com',
                phone: '+91 98200 12345',
                whatsappNumber: '+91 98200 12345',
                address: 'Shop 4, Hill Road, Bandra West, Mumbai, MH 400050',
                gstNumber: '27AAAAA0000A1Z5',
                fssaiNumber: '11521000000123',
                socialLinks: {
                    instagram: 'https://instagram.com/chefscakeworld',
                    facebook: 'https://facebook.com/chefscakeworld',
                    youtube: 'https://youtube.com/chefscakeworld'
                },
                announcementBar: {
                    enabled: true,
                    text: '🎉 Special Celebration Offer: Get 10% OFF on all Birthday & Custom Designer Cakes! Use code: CHEF10',
                    link: '/cakes'
                },
                taxRatePercent: 5,
                codEnabled: true,
                deliveryEnabled: true
            });
            console.log('[Seed] Settings initialized');
        }
        // 2. Super Admin User
        const existingAdmin = await User_js_1.User.findOne({ email: 'admin@chefscakeworld.com' });
        if (!existingAdmin) {
            await User_js_1.User.create({
                name: "Chef's Executive Director",
                email: 'admin@chefscakeworld.com',
                phone: '+91 98200 12345',
                password: 'AdminPassword@123',
                role: User_js_1.UserRole.SUPER_ADMIN,
                isActive: true
            });
            console.log('[Seed] Super Admin user created: admin@chefscakeworld.com / AdminPassword@123');
        }
        // 3. Branches
        const branchesData = [
            {
                branchCode: 'CCW-MUM-01',
                name: "Chef's Cake World - Bandra West Flagship",
                address: 'Shop 4, Hill Road, Bandra West',
                city: 'Mumbai',
                state: 'Maharashtra',
                pincode: '400050',
                phone: '+91 98200 12345',
                email: 'bandra@chefscakeworld.com',
                coordinates: { lat: 19.0596, lng: 72.8295 },
                serviceablePincodes: ['400050', '400051', '400052', '400054', '400055'],
                deliveryZones: [
                    { pincode: '400050', deliveryFee: 49, estimatedDeliveryHours: 2, minOrderValue: 499 },
                    { pincode: '400051', deliveryFee: 79, estimatedDeliveryHours: 3, minOrderValue: 499 },
                    { pincode: '400052', deliveryFee: 79, estimatedDeliveryHours: 3, minOrderValue: 499 },
                    { pincode: '400054', deliveryFee: 99, estimatedDeliveryHours: 3, minOrderValue: 499 },
                    { pincode: '400055', deliveryFee: 99, estimatedDeliveryHours: 3, minOrderValue: 499 }
                ],
                openingHours: '09:00 AM - 11:00 PM',
                operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                isActive: true,
                deliverySlots: [
                    { slotId: 'slot-1', label: '10:00 AM - 01:00 PM (Morning)', startTime: '10:00', endTime: '13:00', maxCapacity: 25, isActive: true },
                    { slotId: 'slot-2', label: '02:00 PM - 05:00 PM (Afternoon)', startTime: '14:00', endTime: '17:00', maxCapacity: 30, isActive: true },
                    { slotId: 'slot-3', label: '06:00 PM - 09:00 PM (Evening)', startTime: '18:00', endTime: '21:00', maxCapacity: 35, isActive: true },
                    { slotId: 'slot-4', label: '11:00 PM - 12:00 AM (Midnight Special)', startTime: '23:00', endTime: '00:00', maxCapacity: 15, isActive: true }
                ]
            },
            {
                branchCode: 'CCW-MUM-02',
                name: "Chef's Cake World - Andheri Lokhandwala",
                address: 'Shop 12, Main Market, Lokhandwala Complex, Andheri West',
                city: 'Mumbai',
                state: 'Maharashtra',
                pincode: '400053',
                phone: '+91 98200 54321',
                email: 'andheri@chefscakeworld.com',
                coordinates: { lat: 19.1307, lng: 72.8267 },
                serviceablePincodes: ['400053', '400058', '400059', '400069', '400102'],
                deliveryZones: [
                    { pincode: '400053', deliveryFee: 49, estimatedDeliveryHours: 2, minOrderValue: 499 },
                    { pincode: '400058', deliveryFee: 69, estimatedDeliveryHours: 2, minOrderValue: 499 },
                    { pincode: '400059', deliveryFee: 79, estimatedDeliveryHours: 3, minOrderValue: 499 },
                    { pincode: '400069', deliveryFee: 89, estimatedDeliveryHours: 3, minOrderValue: 499 },
                    { pincode: '400102', deliveryFee: 89, estimatedDeliveryHours: 3, minOrderValue: 499 }
                ],
                openingHours: '09:00 AM - 11:30 PM',
                operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                isActive: true,
                deliverySlots: [
                    { slotId: 'slot-1', label: '10:00 AM - 01:00 PM (Morning)', startTime: '10:00', endTime: '13:00', maxCapacity: 25, isActive: true },
                    { slotId: 'slot-2', label: '02:00 PM - 05:00 PM (Afternoon)', startTime: '14:00', endTime: '17:00', maxCapacity: 30, isActive: true },
                    { slotId: 'slot-3', label: '06:00 PM - 09:00 PM (Evening)', startTime: '18:00', endTime: '21:00', maxCapacity: 35, isActive: true },
                    { slotId: 'slot-4', label: '11:00 PM - 12:00 AM (Midnight Special)', startTime: '23:00', endTime: '00:00', maxCapacity: 15, isActive: true }
                ]
            },
            {
                branchCode: 'CCW-MUM-03',
                name: "Chef's Cake World - Powai Hiranandani",
                address: 'Galleria Mall, Ground Floor, Central Ave, Hiranandani Gardens, Powai',
                city: 'Mumbai',
                state: 'Maharashtra',
                pincode: '400076',
                phone: '+91 98200 98765',
                email: 'powai@chefscakeworld.com',
                coordinates: { lat: 19.1197, lng: 72.9051 },
                serviceablePincodes: ['400076', '400072', '400087', '400078', '400083'],
                deliveryZones: [
                    { pincode: '400076', deliveryFee: 49, estimatedDeliveryHours: 2, minOrderValue: 499 },
                    { pincode: '400072', deliveryFee: 69, estimatedDeliveryHours: 2, minOrderValue: 499 },
                    { pincode: '400087', deliveryFee: 79, estimatedDeliveryHours: 3, minOrderValue: 499 },
                    { pincode: '400078', deliveryFee: 89, estimatedDeliveryHours: 3, minOrderValue: 499 },
                    { pincode: '400083', deliveryFee: 89, estimatedDeliveryHours: 3, minOrderValue: 499 }
                ],
                openingHours: '09:00 AM - 11:00 PM',
                operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                isActive: true,
                deliverySlots: [
                    { slotId: 'slot-1', label: '10:00 AM - 01:00 PM (Morning)', startTime: '10:00', endTime: '13:00', maxCapacity: 20, isActive: true },
                    { slotId: 'slot-2', label: '02:00 PM - 05:00 PM (Afternoon)', startTime: '14:00', endTime: '17:00', maxCapacity: 25, isActive: true },
                    { slotId: 'slot-3', label: '06:00 PM - 09:00 PM (Evening)', startTime: '18:00', endTime: '21:00', maxCapacity: 30, isActive: true },
                    { slotId: 'slot-4', label: '11:00 PM - 12:00 AM (Midnight Special)', startTime: '23:00', endTime: '00:00', maxCapacity: 10, isActive: true }
                ]
            }
        ];
        for (const b of branchesData) {
            await Branch_js_1.Branch.findOneAndUpdate({ branchCode: b.branchCode }, b, { upsert: true, new: true });
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
            }
        ];
        const categoryMap = {};
        for (const c of categoriesData) {
            const cat = await Category_js_1.Category.findOneAndUpdate({ slug: c.slug }, c, { upsert: true, new: true });
            categoryMap[c.slug] = cat._id;
        }
        console.log('[Seed] Categories upserted');
        // 5. Master Products
        const productsData = [
            {
                name: 'Royal Belgian Chocolate Truffle Cake',
                slug: 'royal-belgian-chocolate-truffle-cake',
                description: 'Our signature masterpiece. Layers of moist dark chocolate sponge draped in rich, silky smooth 70% Callebaut Belgian chocolate ganache and finished with handcrafted artisan chocolate curls.',
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
                description: 'Velvety crimson cocoa sponge layered with luscious whipped Philadelphia cream cheese frosting and dusted with delicate red velvet sponge crumble.',
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
                description: 'A modern dessert sensation featuring caramelized cinnamon sponge, creamy Lotus Biscoff spread mousse, topped with crunchy caramelized biscuit drizzle.',
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
                description: 'Light and airy vanilla sponge filled with delicate whipped mascarpone and crowned with fresh kiwi, strawberries, sweet blueberries, dragon fruit, and sun-ripened mangoes.',
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
                description: 'Traditional European artisan recipe made with rich chocolate sponge soaked in dark cherry compote, enveloped with fresh whipped cream and French maraschino cherries.',
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
                description: 'Bespoke three-tiered royal wedding cake adorned with edible 24K gold leaf detailing, ivory fondant drape, and handcrafted sugar peony blossoms. Flavor customisable per tier.',
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
                description: 'Multi-colored rainbow sponge layers with strawberry buttercream, golden fondant horn, and pastel floral rosettes. The ultimate dream cake for children birthdays.',
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
                description: 'High resolution photo printed on 100% edible sugar sheet with food-grade organic inks, seated over your choice of luscious chocolate or vanilla sponge.',
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
            }
        ];
        for (const p of productsData) {
            await Product_js_1.Product.findOneAndUpdate({ slug: p.slug }, p, { upsert: true, new: true });
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
            await Coupon_js_1.Coupon.findOneAndUpdate({ code: cp.code }, cp, { upsert: true, new: true });
        }
        console.log('[Seed] Coupons upserted');
        console.log('[Seed] Seeding completed successfully!');
    }
    catch (error) {
        console.error('[Seed] Seeding failed:', error);
    }
    finally {
        await mongoose_1.default.disconnect();
    }
};
exports.seedDatabase = seedDatabase;
// Execute if run directly
if (process.argv[1] && process.argv[1].includes('seedData')) {
    (0, exports.seedDatabase)();
}
