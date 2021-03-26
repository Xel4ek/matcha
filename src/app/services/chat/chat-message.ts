import { Observable } from "rxjs";

export interface ChatMessage {
  from: string,
  to: string,
  timestamp: number,
  text: string,
  alignment?: boolean,
  img: Observable<string>,
  isRead: boolean;
}
