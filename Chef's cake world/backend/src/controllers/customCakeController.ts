import { Request, Response } from 'express';
import { CustomCakeRequest, CustomCakeStatus } from '../models/CustomCakeRequest.js';
import { Branch } from '../models/Branch.js';
import { Order, OrderStatus, PaymentMethod, PaymentStatus } from '../models/Order.js';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';

export const submitCustomCakeRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      customerName,
      mobile,
      email,
      occasion,
      flavour,
      weight,
      shape,
      theme,
      isEggless = true,
      cakeDesignDescription,
      referenceImages = [],
      deliveryDate,
      deliveryLocation,
      pincode,
      preferredBranchId
    } = req.body;

    if (!customerName || !mobile || !email || !occasion || !cakeDesignDescription || !deliveryDate || !pincode) {
      res.status(400).json({ success: false, message: 'Please fill in all mandatory fields for your custom cake design.' });
      return;
    }

    const requestNumber = `CCW-CUST-${Date.now().toString().slice(-6)}`;

    const customRequest = await CustomCakeRequest.create({
      requestNumber,
      customerName,
      mobile,
      email,
      occasion,
      flavour: flavour || 'Custom Flavour',
      weight: weight || '1.5 kg',
      shape: shape || 'Round',
      theme: theme || 'Artisan Custom',
      isEggless,
      cakeDesignDescription,
      referenceImages,
      deliveryDate,
      deliveryLocation,
      pincode,
      preferredBranchId: preferredBranchId || null,
      status: CustomCakeStatus.SUBMITTED
    });

    res.status(201).json({
      success: true,
      message: 'Your custom cake request has been submitted! Our master cake artisan will review and provide a quotation shortly.',
      requestNumber: customRequest.requestNumber,
      customRequest
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error submitting custom cake request' });
  }
};

export const getCustomCakeRequests = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const filter: any = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }
    const requests = await CustomCakeRequest.find(filter).populate('preferredBranchId', 'name city').sort({ createdAt: -1 });
    res.status(200).json({ success: true, requests });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error retrieving custom cake requests' });
  }
};

export const provideQuotation = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { quotationAmount, quotationNotes, adminNotes } = req.body;

    if (!quotationAmount || quotationAmount <= 0) {
      res.status(400).json({ success: false, message: 'Please provide a valid quotation price amount.' });
      return;
    }

    const customRequest = await CustomCakeRequest.findById(id);
    if (!customRequest) {
      res.status(404).json({ success: false, message: 'Custom cake inquiry not found.' });
      return;
    }

    customRequest.quotationAmount = Number(quotationAmount);
    customRequest.quotationNotes = quotationNotes || '';
    if (adminNotes) customRequest.adminNotes = adminNotes;
    customRequest.status = CustomCakeStatus.QUOTED;

    await customRequest.save();

    res.status(200).json({
      success: true,
      message: `Quotation of ₹${quotationAmount} sent to customer.`,
      customRequest
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error providing quotation' });
  }
};

export const respondToQuotation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { action } = req.body; // 'ACCEPT' or 'REJECT'

    const customRequest = await CustomCakeRequest.findById(id);
    if (!customRequest) {
      res.status(404).json({ success: false, message: 'Request not found' });
      return;
    }

    if (action === 'ACCEPT') {
      customRequest.status = CustomCakeStatus.ACCEPTED;
      await customRequest.save();

      res.status(200).json({
        success: true,
        message: 'Quotation accepted! You can now proceed to finalize this custom cake order.',
        customRequest
      });
    } else {
      customRequest.status = CustomCakeStatus.REJECTED;
      await customRequest.save();

      res.status(200).json({
        success: true,
        message: 'Quotation declined.',
        customRequest
      });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error responding to quote' });
  }
};

