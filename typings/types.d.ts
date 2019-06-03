
interface Constructable<T> {
  new(...args: any): T;
  name: string;
}