export interface  IMember{
  id: number
  userName: string
  email: string
  birthday: string
  lastActive: string
  knowAs: string
  city: string
  contry: string
  photoURL: string
  age: number
  photos: Photo[]
}

export interface Photo {
  id: number
  url: string
  isMain: boolean
}
