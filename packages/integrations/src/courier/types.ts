export type ShipmentStatus =
  | "quoted"
  | "created"
  | "pickup_scheduled"
  | "picked_up"
  | "in_transit"
  | "delivered"
  | "failed_delivery"
  | "returned"
  | "cancelled";

export interface QuoteParams {
  originCity: string;
  destinationCity: string;
  weightKg: number;
}

export interface CreateShipmentParams {
  orderId: string;
  originAddressRef: string;
  destinationAddressRef: string;
}

export interface CourierProvider {
  quote(params: QuoteParams): Promise<{ amountMinor: number; currency: string; etaDays: number }>;
  createOrder(params: CreateShipmentParams): Promise<{ shipmentId: string; trackingNumber: string }>;
  schedulePickup(shipmentId: string, windowStart: string, windowEnd: string): Promise<void>;
  cancelPickup(shipmentId: string): Promise<void>;
  getStatus(shipmentId: string): Promise<ShipmentStatus>;
  createReturnShipment(params: CreateShipmentParams): Promise<{ shipmentId: string; trackingNumber: string }>;
}
