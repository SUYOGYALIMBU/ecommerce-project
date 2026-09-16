import axios from 'axios'

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean
}


const fetchData = async () => {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todo/1")
        console.log("Todo", response.data);
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`)
        }

        const data:Todo = await response.json()
    } catch (error: any) {

    }

}
