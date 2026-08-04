/** Public user shape — never carries password material. */
export interface User {
  id: string;
  email: string;
  displayName: string;
  createdAt: string;
}
