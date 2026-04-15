export class TaskDataManager {
  constructor() {
    this.tasks = [];
  }

  async load() {
    const response = await fetch('/tasks.json');

    const data = await response.json();

    this._setTasks(data.data);
  }

  _setTasks(nextTasks) {
    if (JSON.stringify(this.tasks) === JSON.stringify(nextTasks)) return;

    this.tasks = nextTasks;

    window.dispatchEvent(
      new CustomEvent('tasks-updated', { detail: { tasks: this.tasks } }),
    );
  }

  _onDeleteTask = (e) => {
    const { id } = e.detail;

    const nextTasks = this.tasks.filter((task) => task.id !== id);

    this._setTasks(nextTasks);
  };

  _onUpdateTask = (e) => {
    const { id, patch } = e.detail;

    const nextTasks = this.tasks.map((task) =>
      task.id === id ? { ...task, ...patch } : task,
    );

    this._setTasks(nextTasks);
  };

  _onToggleCheck = (e) => {
    const { taskId, itemId } = e.detail;

    const nextTasks = this.tasks.map((task) => {
      if (task.id !== taskId) return task;

      const items = task.content?.items?.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item,
      );

      return {
        ...task,
        content: { ...task.content, items },
      };
    });

    this._setTasks(nextTasks);
  };

  attach() {
    window.addEventListener('delete-task', this._onDeleteTask);

    window.addEventListener('update-task', this._onUpdateTask);

    window.addEventListener('toggle-check', this._onToggleCheck);
  }
}
