

export interface Approver {
    email: string;
    id: number;
    management: string;
    name: string;
    value: string;
  }
  
 export interface System {
    code: string;
    id: number;
    systemDescription: string;
    systemName: string;
  }

export interface ProjectsData {
  data: {
    approvers: Record<string, Approver>;
    systems: Record<string, System>;
  };
  timestamp: number;
}

  
export interface SystemsData {
  
      approvers: Record<string, Approver>;
      systems: Record<string, System>;
    
   
  }

