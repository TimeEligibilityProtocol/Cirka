import { CourierProvider, CreateShipmentParams, QuoteParams, ShipmentStatus } from "./types.js";

export class MockCourierProvider implements CourierProvider {
  async quote(_params: QuoteParams) {
    return { amountMinor: 1500, currency: "AED", etaDays: 2 };
  }

  async createOrder(params: CreateShipmentParams) {
    return { shipmentId: `mock_ship_${params.orderId}`, trackingNumber: `MOCK-${params.orderId}` };
  }

  async schedulePickup(): Promise<void> {}

  async cancelPickup(): Promise<void> {}

  async getStatus(_shipmentId: string): Promise<ShipmentStatus> {
    return "created";
  }

  async createReturnShipment(params: CreateShipmentParams) {
    return { shipmentId: `mock_return_${params.orderId}`, trackingNumber: `MOCK-RET-${params.orderId}` };
  }
}
