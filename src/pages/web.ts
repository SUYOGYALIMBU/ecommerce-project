// import axios from 'axios'
// import type {AxiosResponse} from 'axios'

// interface Todo{
//     userId: number;
//     id: number;
//     title: string;
//     completed:boolean
// }

// // axios.get('https://example.com')
// // .then((response)=> console.log(response.data);
// // )

// const fetchData = async () => {
//     try {
//         const response: AxiosResponse<Todo> = await axios.get("https://jsonplaceholder.typicode.com/todo/1")
//         console.log("Todo",response.data);
        
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             console.log("Axios Error", error.message);
//             if (error.message) {
//                 console.log(error.response.status);
//             }
//         }
        
//     }
// }