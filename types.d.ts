export interface Video {
  _id: string;
  caption: string;
  comments: {
    _key: string;
    comment: string;
    postedBy: {
      _ref: string;
    };
  }[];
  likes: {
    postedBy: {
      _id: string;
      image: string;
      userName: string;
    };
  }[];
  postedBy: {
    _id: string;
    image: string;
    userName: string;
  };
  video: {
    asset: {
      _id: string;
      url: string;
    };
  };
  userId: string;
}

export interface IUser {
  _id: string;
  _type: string;
  image: string;
  userName: string;
}