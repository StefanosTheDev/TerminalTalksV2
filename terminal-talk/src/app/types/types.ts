// Framework Side Bar
export interface FrameworkItem {
  id: string;
  name: string;
}

export interface Framework {
  id: string;
  name: string;
  icon: React.ReactNode;
  items: FrameworkItem[];
}
