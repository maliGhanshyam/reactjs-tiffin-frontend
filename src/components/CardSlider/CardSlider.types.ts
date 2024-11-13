export interface CardSliderProps<T extends { _id: string }> {
  data: T[];
  children: ((item: T) => React.ReactNode) | React.ReactNode;
  settings?: any;
}