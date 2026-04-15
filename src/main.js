import './pages/dashboard-page';

import { TaskDataManager } from './dm/task-data-manager';

const dm = new TaskDataManager();

dm.attach();

dm.load();
