

import { create } from 'zustand'

const useTodo = create((set) => ({
    todo: [],
    addTodo: (task) => set((state) => ({ todo: [...state.todo, task] })),
    deleteTodo: (task) => set((state) =>  ({todo: [...task]}) ),
    editTodo: (updateContact) => set((state) => ({ todo: updateContact })),
}))

export default useTodo;