

import { useState } from "react";
import useTodo from "../../store/todo";
import { ToastContainer, toast } from 'react-toastify';
import Modal from "../../components/UI/Modal/Modal";
import "./style.scss"

const index = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [telegram, setTelegram] = useState("");
    const {todo, addTodo, deleteTodo} = useTodo();

    const [task, setTask] = useState([]);

    const [openModal, setOpenModal] = useState(false);
    const addTask = () => {
        const newTodo = {
            id: Date.now(),
            name,
            phone,
            email,
            telegram
        }

        if(newTodo.name.trim().length && newTodo.phone.trim().length && newTodo.email.trim().length && newTodo.telegram.trim().length){
            addTodo(newTodo);
            setName("");
            setPhone("");
            setEmail("");
            setTelegram("");
            toast.success("Contact successfully added!", {autoClose: 1000})
        }else{
            toast.warning("Fill all inputs!", {autoClose: 1000})
        }
    }

    const deleteTask = (id) => {
        const res = todo.filter((item) => item.id !== id);
        deleteTodo(res)
        toast.success("Deleted successfully!", {autoClose: 1000})
    }
    const sentTask = (id) => {
        const res = todo.filter((item) => item.id === id);
        setTask(res[0])
        setOpenModal(true)
    }
    return (
        <section className="main-section">
            <ToastContainer/>
          
            <div className="container">
                {openModal && <Modal setOpenModal={setOpenModal} task={task}/>}
                <div className="py-10">
                    
                    <div className="flex items-center justify-center flex-col gap-y-2 mb-4 w-[350px] mx-auto">
                        <input value={name} onChange={(e) => setName(e.target.value)} className="outline-none rounded-md w-full" type="text" placeholder="Enter name" />
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="outline-none rounded-md w-full" type="number" placeholder="Enter phone" />
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="outline-none rounded-md w-full" type="email" placeholder="Enter email" />
                        <input value={telegram} onChange={(e) => setTelegram(e.target.value)} className="outline-none rounded-md w-full" type="text" placeholder="Enter telegram" />
                        <button onClick={addTask} className="hover:bg-indigo-400 w-full rounded-md px-5 py-2 bg-indigo-600 text-white">Add</button>
                    </div>

                    <ul className="flex flex-col gap-y-2">
                        {
                            todo?.length ? todo.map((item) => {
                                return (
                                    <li key={item.id} className="border p-2 rounded-md flex justify-between items-center">
                                        <div><span className="font-semibold text-md">Name:</span> <span>{item?.name}</span></div>
                                        <div><span className="font-semibold text-md">Phone:</span> <span>{item?.phone}</span></div>
                                        <div><span className="font-semibold text-md">Email:</span> <span>{item?.email}</span></div>
                                        <div><span className="font-semibold text-md">Telegram:</span> <span>{item?.telegram}</span></div>
                                        <div>
                                            <button onClick={() => sentTask(item?.id)} className="hover:bg-indigo-400 bg-indigo-600 text-white p-2 mr-2 rounded-lg">Edit</button>
                                            <button onClick={() => deleteTask(item.id)} className=" hover:bg-red-400 bg-red-600 text-white p-2 rounded-lg">Delete</button>
                                        </div>
                                    </li>
                                )
                            }): <h2 className="border border-rose-300 p-4 font-bold text-lg">The contact list is empty</h2>
                        }
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default index;