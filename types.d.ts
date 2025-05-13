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

export interface YTVideo {
  etag: string;
  id: {
    kind: string;
    videoId: string;
  }
  kind: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishTime: string;
    publishedAt: string;
    thumbnails: {
      default: {
        height: number;
        url: string;
        width: number;
      }
      high: {
        height: number;
        url: string;
        width: number;
      }
      medium: {
        height: number;
        url: string;
        width: number;
      }
    }
    title: string;
  }
}