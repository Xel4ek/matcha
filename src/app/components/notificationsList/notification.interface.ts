export type NotificationType = 'chat' | 'like' | 'unlike' | 'checked' | 'match';
export interface NotificationMessage {
  user: string,
  time: number,
  text: string,
  checked: boolean,
  id: number,
  type: NotificationType;
}
