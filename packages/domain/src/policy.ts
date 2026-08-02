export type PolicyDocumentType = "terms" | "privacy_policy" | "seller_terms";

export interface PolicyDocument {
  id: string;
  type: PolicyDocumentType;
  version: string;
  language: string;
  publishedAt: string;
  status: "draft" | "published" | "superseded";
  contentRef: string;
}

export interface PolicyAcceptance {
  id: string;
  userId: string;
  documentId: string;
  version: string;
  acceptedAt: string;
  context: string; // e.g. "account_creation", "pre_first_listing", "pre_first_purchase"
}
