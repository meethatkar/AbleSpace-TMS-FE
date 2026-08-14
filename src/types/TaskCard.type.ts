export interface TaskCardData {
  id: string;
  title: string;
  assignee: {
    name: string;
    image?: string;
  };
  dueDate: string;
  tags: Array<{
    id: string;
    text: string;
  }>;
}

interface TaskCardProps {
  task: TaskCardData;
  onMenuClick?: () => void;
  onClick?: () => void;
}
