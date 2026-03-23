export interface InsuranceProduct {
  id: string;
  name: string;
  type: 'Life' | 'Non-Life';
  category: string;
  description: string;
  premium: number;
  benefits: string[];
  imageUrl: string;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

export interface InsuranceApplication {
  id: string;
  userId: string;
  productId: string;
  status: 'Pending' | 'Paid' | 'Approved' | 'Rejected';
  customerDetails: CustomerDetails;
  paymentId?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  applicationId: string;
  amount: number;
  method: 'Credit Card' | 'Debit Card' | 'GCash' | 'PayMaya';
  status: 'Pending' | 'Completed' | 'Failed';
  qrCodeData?: string;
  createdAt: string;
}
