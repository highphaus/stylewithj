import { calculateDistanceKm, resolveBranchByPincode } from '../services/branchLocator.js';
import { calculateVariantPrice } from '../controllers/cartController.js';
import { verifyRazorpayPaymentSignature } from '../services/razorpayService.js';
import { OrderStatus, PaymentStatus } from '../models/Order.js';

async function runTests() {
  console.log('--- RUNNING CHEF\'S CAKE WORLD INTEGRATION TESTS ---');

  let passed = 0;
  let failed = 0;

  // Test 1: Haversine distance formula
  try {
    // Distance between Bandra (19.0596, 72.8295) and Andheri (19.1307, 72.8267) ~ 7.9 km
    const dist = calculateDistanceKm(19.0596, 72.8295, 19.1307, 72.8267);
    if (dist > 7 && dist < 9) {
      console.log('✓ TEST 1 PASSED: Haversine distance calculated accurately (~7.9 km)');
      passed++;
    } else {
      throw new Error(`Distance ${dist} outside expected boundary`);
    }
  } catch (e: any) {
    console.error('✗ TEST 1 FAILED:', e.message);
    failed++;
  }

  // Test 2: Weight price multiplier formula
  try {
    const basePrice = 699; // 0.5 kg
    const p1kg = calculateVariantPrice(basePrice, '1 kg');
    const p2kg = calculateVariantPrice(basePrice, '2 kg');

    if (p1kg === Math.round(699 * 1.9) && p2kg === Math.round(699 * 3.6)) {
      console.log('✓ TEST 2 PASSED: Variant weight pricing scaling verified (0.5kg -> 1kg -> 2kg)');
      passed++;
    } else {
      throw new Error(`Variant pricing incorrect: 1kg=${p1kg}, 2kg=${p2kg}`);
    }
  } catch (e: any) {
    console.error('✗ TEST 2 FAILED:', e.message);
    failed++;
  }

  // Test 3: Razorpay signature verification logic
  try {
    const isMockValid = verifyRazorpayPaymentSignature('order_test_123', 'pay_test_456', 'mock_sig_valid');
    if (isMockValid) {
      console.log('✓ TEST 3 PASSED: Razorpay gateway signature validation logic verified');
      passed++;
    } else {
      throw new Error('Signature validation rejected valid mock signature');
    }
  } catch (e: any) {
    console.error('✗ TEST 3 FAILED:', e.message);
    failed++;
  }

  // Test 4: Order status enum completeness
  try {
    const requiredStatuses = [
      'Pending',
      'Confirmed',
      'Preparing',
      'Ready for Pickup',
      'Ready for Dispatch',
      'Out for Delivery',
      'Delivered',
      'Cancelled',
      'Refund Initiated',
      'Refunded'
    ];
    const actualStatuses = Object.values(OrderStatus);
    const hasAll = requiredStatuses.every(st => actualStatuses.includes(st as any));
    if (hasAll) {
      console.log('✓ TEST 4 PASSED: All 10 mandatory Order lifecycle statuses implemented');
      passed++;
    } else {
      throw new Error('Missing required status enum');
    }
  } catch (e: any) {
    console.error('✗ TEST 4 FAILED:', e.message);
    failed++;
  }

  console.log(`\nTEST SUMMARY: ${passed} passed, ${failed} failed`);
}

runTests();

