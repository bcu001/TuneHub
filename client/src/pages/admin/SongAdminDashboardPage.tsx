import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCategory } from "@/hooks/useCategory";
import { useUploadSong } from "@/hooks/useSong";
import type { SongForm } from "@/types/song";
import axios from "axios";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

const SongAdminDashboardPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<SongForm>();

  // Hook must be called at component level
  const { mutateAsync: uploadSong, isPending } = useUploadSong();
  const { data: categoryData } = useCategory(1);

  const onSubmit: SubmitHandler<SongForm> = async (songform) => {
    console.log(songform);
    try {
      const formData = new FormData();

      formData.append("title", songform.title);
      formData.append("artist", songform.artist);
      formData.append("description", songform.description);
      formData.append("categoryId", songform.categoryId);

      // FileList -> File
      formData.append("audio", songform.audio[0]);
      formData.append("image", songform.image[0]);

      await uploadSong(formData);

      reset();

      alert("Song uploaded successfully");
    } catch (error) {
      console.error("UPLOAD ERROR:", error);

      if (axios.isAxiosError(error)) {
        console.error("STATUS:", error.response?.status);
        console.error("DATA:", error.response?.data);
      }

      alert("Failed to upload song");
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Upload Song</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>

          <Input
            id="title"
            {...register("title", {
              required: "Title is required",
            })}
            placeholder="Song title"
          />

          <FieldError>{errors.title?.message}</FieldError>
        </Field>

        {/* Artist */}
        <Field>
          <FieldLabel htmlFor="artist">Artist</FieldLabel>

          <Input
            id="artist"
            {...register("artist", {
              required: "Artist is required",
            })}
            placeholder="Artist name"
          />

          <FieldError>{errors.artist?.message}</FieldError>
        </Field>

        {/* Description */}
        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>

          <Textarea
            id="description"
            {...register("description")}
            placeholder="Song description"
          />
        </Field>

        {/* Category */}
        <Field>
          <FieldLabel htmlFor="categoryId">Category</FieldLabel>

          <Controller
            name="categoryId"
            control={control}
            rules={{
              required: "Category is required",
            }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="categoryId" className="w-45">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {categoryData?.categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          <FieldError>{errors.categoryId?.message}</FieldError>
        </Field>

        {/* Audio */}
        <Field>
          <FieldLabel htmlFor="audio">Audio</FieldLabel>

          <Input
            id="audio"
            type="file"
            accept="audio/*"
            {...register("audio", {
              required: "Audio file is required",
            })}
          />

          <FieldError>{errors.audio?.message}</FieldError>
        </Field>

        {/* Cover Image */}
        <Field>
          <FieldLabel htmlFor="image">Cover Image</FieldLabel>

          <Input
            id="image"
            type="file"
            accept="image/*"
            {...register("image", {
              required: "Cover image is required",
            })}
          />

          <FieldError>{errors.image?.message}</FieldError>
        </Field>

        {/* Submit */}
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Uploading..." : "Upload Song"}
        </Button>
      </form>
    </div>
  );
};

export default SongAdminDashboardPage;
