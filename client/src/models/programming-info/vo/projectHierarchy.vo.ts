export type ProjectDuration = {project: string[], duration: number};

export type ProjectHierarchyVO = {
  name: string;
  children: ProjectHierarchyVO[];
  value: number;
  size: number; // value와 size는 같은 값
};

