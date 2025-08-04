export interface IMessage {
  id: number
  senterId: number
  senterUserName: string
  senderPhotoUrl: string
  receiverId: number
  receiverUserName: string
  receiverPhotoUrl: string
  content: string
  dateRead: Date
  messageSent: Date
  isRead: boolean
}

export class MessageParams{
    container : string = 'Inbox'
    pageNumber : number = 1;
    pageSize : number = 10 ; 
}