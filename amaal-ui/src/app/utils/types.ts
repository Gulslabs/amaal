export interface DayAmaalsTableProps {
  token: string;
  startOfWeek: string;
  endOfWeek: string;
}

export interface AmaalTrackerProps {
  token: string;
}

export interface Amaal {
  category: string;
  kind: string;
  duration: number;
  perfomed: boolean;
}

export interface DayAmaal {
  date: string;
  isEditable: boolean;
  amaals: Amaal[];
}

export interface UserProfile {
  firstName: string;
  lastNAme: string;
  picture: string;
}

export interface DayAmaalRowProps {
  dayAmaal: DayAmaal;
  token?: string;
}

export interface UserProfileProps {
  token?: string;
}

export interface Momin {
  identity: number;
  id: number;
  firstName: string;
  lastName: string;
  initials: string;
  audha: string;
}

export interface TreeNode {
  identity: number;
  name: string;
  title: string;
  children?: TreeNode[];
}

export interface OrgData {
  id: number;
  parentId: string;
  name: string;
  positionName: string;
  phone: string;
  email: string;
  team: string;
  location: string;
  department: string;
  description: string;
  imageUrl: string;
}


export interface MyNodeData {
  data: OrgData;
}