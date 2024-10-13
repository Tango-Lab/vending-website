export interface ProfileMe {
  username: string;
  email: string;
  password: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
  hasVerify: boolean;
  isExhibitor: boolean;
  profile: UserProfile;
  id: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  profileImageUrl: any;
  _id: string;
}
