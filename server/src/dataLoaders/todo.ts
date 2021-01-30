import DataLoader from 'dataloader';
import Todo, { ITodo } from '../models/todo';

const dataloader = new DataLoader(async (uids: readonly ITodo['uid'][]) => {
    const todos = await Todo.find({ uid: { $in: [...uids] } });
    return uids.map((uid) => todos.filter((todo) => todo.uid === uid));
});

export default dataloader;
