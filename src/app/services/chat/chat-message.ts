export interface ChatMessage {
  from: string,
  to: string,
  date: string,
  text: string,
  alignment?: boolean;
}
