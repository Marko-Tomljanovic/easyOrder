export type LoginDataType = {
  username: string;
  password: string;
  timestamp: number;
};

export type FotterNavigationProps = {
  content?: string;
  // podnaslov?: string | React.ReactNode;
  // extra?: React.ReactNode;
  // children?: React.ReactNode;
};

export type PageHeaderNavigationProps = {
  subtitle?: string | React.ReactNode;
  color?: string;
};
