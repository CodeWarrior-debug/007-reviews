export interface UserDataEntry {
  id: number;
  year: number;
  userGain: number;
  userLoss: number;
}

export const UserData: UserDataEntry[] = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLoss: 823,
  },
  {
    id: 2,
    year: 2017,
    userGain: 40000,
    userLoss: 840,
  },
  {
    id: 3,
    year: 2018,
    userGain: 48000,
    userLoss: 823,
  },
  {
    id: 4,
    year: 2019,
    userGain: 500000,
    userLoss: 10000,
  },
];
