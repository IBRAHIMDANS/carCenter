export default interface CarInterface {
  id?: string;
  name: string;
  brand: string;
  registration: string;
  color: string;
  state: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
