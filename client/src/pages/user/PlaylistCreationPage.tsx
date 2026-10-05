import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { ArrowLeft, ListMusic, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import usePlaylists from "@/hooks/usePlaylists";
import useDocumentTitle from "@/hooks/useDocumentTitle";

interface PlaylistFormValues {
  name: string;
  description: string;
}

export default function PlaylistCreationPage() {
  useDocumentTitle("Create Playlist | TuneHub")
  const navigate = useNavigate();

  const { createPlaylistMutation } = usePlaylists();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlaylistFormValues>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (data: PlaylistFormValues) => {
    alert(data.description)
    createPlaylistMutation.mutate(
      {
        name: data.name.trim(),
        description: data.description.trim(),
      },
      {
        onSuccess: () => {
          navigate("/playlists");
        },
      },
    );
  };

  return (
    <main className="container mx-auto flex mt-16 items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="-ml-2 mb-3 w-fit"
            onClick={() => navigate("/playlists")}
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to playlists
          </Button>

          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10">
              <ListMusic className="size-5 text-primary" />
            </div>

            <div>
              <CardTitle className="text-xl">Create playlist</CardTitle>

              <CardDescription>
                Give your playlist a name and description.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="playlist-name">Name</Label>

              <Input
                id="playlist-name"
                placeholder="My favorite songs"
                disabled={createPlaylistMutation.isPending}
                {...register("name", {
                  required: "Playlist name is required",
                  maxLength: {
                    value: 100,
                    message: "Playlist name cannot exceed 100 characters",
                  },
                  validate: (value) =>
                    value.trim().length > 0 || "Playlist name is required",
                })}
              />

              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="playlist-description">Description</Label>

              <Textarea
                id="playlist-description"
                placeholder="Songs I listen to on repeat..."
                rows={4}
                disabled={createPlaylistMutation.isPending}
                {...register("description", {
                  maxLength: {
                    value: 500,
                    message: "Description cannot exceed 500 characters",
                  },
                  required:{
                    value:true,
                    message:"Description is requried"
                  }
                })}
              />

              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/playlists")}
                disabled={createPlaylistMutation.isPending}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={createPlaylistMutation.isPending}>
                {createPlaylistMutation.isPending && (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                )}
                Create playlist
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
