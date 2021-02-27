export interface ChatMessage {
  from: string,
  to: string,
  timestamp: string,
  text: string,
  alignment?: boolean;
}
