export interface IMember {
  id: number;
  userName: string;
  photoUrl: string;
  lookingFor: string;
  knownAs: string;
  introduction: string;
  interests: string;
  email: string;
  country: string;
  city: string;
  gender: number; // 0 : female || 1 : male
  age: number;
  lastActive: string;
  dateOfBirth: Date;
  created: string;
  photos: Photo[];
}

export interface IMemberUpdate{
  
  email: string,
  introduction: string,
  interests: string,
  lookingFor: string,
  knownAs: string,
  city: string,
  country: string

}

export interface Photo {
  id: number;
  url: string;
  isMain: boolean;
}

export class UserParams{

 
  pageNumber  = 1;
  gender = Gender.male;
  minAge = 18 ;
  maxAge = 150;
  pageSize = 8 ;
  orderBy = OrderBy.age;
  typeSort = TypeSort.asc

}

export enum Gender{
  female,
  male
}

 export enum OrderBy  {
     lastActive,
     created,
      age,
    }


  export enum TypeSort  {
        asc,
        desc
    }