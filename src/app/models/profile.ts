export interface UserInfo {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profile: Profile;
  skills?: Array<Skill>;
  experiences?: Array<Experience>;
}

export interface Profile {
  id: string;
  gender: boolean;
  dob: Date;
  country: string;
  address: string;
  aboutMe: string;
  phoneNumber: string;
  hobbies: Array<string>;
  avatarUrl: string;
  coverUrl: string;
}

export interface Skill {
  id: string;
  skillName: string;
  certificationName: string;
}

export interface Experience {
  id: string;
  companyOrSchoolName: string;
  positionOrDegree: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
}
