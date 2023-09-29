


import { create } from 'zustand'

const useDeleteTodo = create((set) => ({
    
    deleteTodo: (task) => set((state) => ({ todo: [...state.todo, task] })),
}))

export default useDeleteTodo;