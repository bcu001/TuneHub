import { uploadSong } from "@/services/music/song.services";
import { mutationOptions } from "@tanstack/react-query";

export default function createSongMutationOptions(formData:FormData){
    return mutationOptions({
        mutationFn: ()=>uploadSong(formData)
    })
}