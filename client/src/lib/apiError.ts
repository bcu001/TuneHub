import axios from "axios";
import {toast} from 'sonner'

export const apiError = (error:unknown)=>{
    if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Login failed");
      } else {
        toast.error("Something went wrong");
      }
}