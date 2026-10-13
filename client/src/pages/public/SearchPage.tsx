import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useSearchParams } from 'react-router';

import { BlurFade } from '@/components/ui/blur-fade';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import SongHorizontalCard from '@/components/cards/SongHorizontalCard';
import { UnifiedSongCard } from '@/components/cards/UnifiedSongCard';

import ApiErrorUI from '@/components/common/ApiError';
import NoSearchResultUI from '@/components/NoSearchResultUI';
import SongHorizontalCardSkeleton from '@/components/skeletons/SongHorizontalCardSkeleton';

import { useSong } from '@/hooks/useSong';
import { useUnifiedSongSearch } from '@/hooks/useUnifiedSongSearch';

import { getApiErrorMessage } from '@/lib/utils';
import type { SongSort } from '@/types/song';

import useDocumentTitle from '@/hooks/useDocumentTitle';
import BackButton from '@/components/common/BackButton';

interface Inputs {
  q: string;
}

const SearchPage = () => {
  useDocumentTitle('Search | TuneHub');

  const [searchParams] = useSearchParams();

  const { register, control, reset } = useForm<Inputs>({
    defaultValues: {
      q: searchParams.get('q') ?? '',
    },
  });

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') ?? '');
  const [sort, setSort] = useState<SongSort>('newest');

  const categoryId = searchParams.get('categoryId') || undefined;
  const search = useWatch({ control, name: 'q' });

  // Debounce the search input.
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(search?.trim() ?? '');
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const isUnifiedMode = searchQuery.trim().length >= 2;

  // Existing native database search.
  const nativeSearch = useSong(page, searchQuery, sort, categoryId);

  // Combined native + iTunes search.
  const unifiedSearch = useUnifiedSongSearch(searchQuery);

  const isPending = isUnifiedMode
    ? unifiedSearch.isPending
    : nativeSearch.isPending;

  const isError = isUnifiedMode ? unifiedSearch.isError : nativeSearch.isError;

  const error = isUnifiedMode ? unifiedSearch.error : nativeSearch.error;

  const isSuccess = isUnifiedMode
    ? unifiedSearch.isSuccess
    : nativeSearch.isSuccess;

  const handleSortChange = (newSort: SongSort) => {
    setSort(newSort);
    setPage(1);
  };

  const handleReset = () => {
    reset({ q: '' });
    setSearchQuery('');
    setPage(1);
  };

  const unifiedSongs = unifiedSearch.data?.songs ?? [];
  const nativeSongs = nativeSearch.data?.songs ?? [];

  const hasNoResults =
    isSuccess &&
    (isUnifiedMode ? unifiedSongs.length === 0 : nativeSongs.length === 0);

  return (
    <div className="w-full space-y-6">
      <BackButton link="/" text="Home" />

      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Search
        </h1>
        <p className="text-sm text-muted-foreground">
          Discover music from TuneHub and iTunes.
        </p>
      </div>

      <form onSubmit={(event) => event.preventDefault()} className="w-full">
        <Input
          type="search"
          placeholder="Search songs or artists..."
          autoComplete="off"
          {...register('q')}
        />
        <Button type="submit" disabled className="hidden">
          Submit
        </Button>
      </form>

      {!isUnifiedMode && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>

          {(
            [
              ['newest', 'Newest'],
              ['popular', 'Popular'],
              ['mostLiked', 'Most Liked'],
              ['alphabetical', 'A–Z'],
              ['oldest', 'Oldest'],
            ] as [SongSort, string][]
          ).map(([value, label]) => (
            <Button
              key={value}
              type="button"
              size="sm"
              variant={sort === value ? 'default' : 'outline'}
              onClick={() => handleSortChange(value)}
            >
              {label}
            </Button>
          ))}
        </div>
      )}

      {isUnifiedMode && (
        <p className="text-sm text-muted-foreground">
          Search results for{' '}
          <span className="font-medium text-foreground">“{searchQuery}”</span>
        </p>
      )}

      {isError && (
        <ApiErrorUI
          message={getApiErrorMessage(error)}
          onRetry={() =>
            isUnifiedMode ? unifiedSearch.refetch() : nativeSearch.refetch()
          }
        />
      )}

      {isPending && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <SongHorizontalCardSkeleton key={index} />
          ))}
        </div>
      )}

      {!isPending && !isError && hasNoResults && (
        <NoSearchResultUI reset={handleReset} />
      )}

      {!isPending && !isError && isUnifiedMode && (
        <div className="space-y-3">
          {unifiedSongs.map((song, index) => (
            <BlurFade
              key={`${song.source}:${song.id}`}
              delay={0.05 * index}
              inView
            >
              <UnifiedSongCard song={song} />
            </BlurFade>
          ))}
        </div>
      )}

      {!isPending && !isError && !isUnifiedMode && (
        <>
          <div className="space-y-3">
            {nativeSongs.map((song, index) => (
              <BlurFade key={song._id} delay={0.05 * index} inView>
                <SongHorizontalCard song={song} />
              </BlurFade>
            ))}
          </div>

          {nativeSearch.data && nativeSearch.data.totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button
                variant="outline"
                disabled={page <= 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
              >
                Previous
              </Button>

              <span className="text-sm text-muted-foreground">
                Page {page} of {nativeSearch.data.totalPages}
              </span>

              <Button
                variant="outline"
                disabled={page >= nativeSearch.data.totalPages}
                onClick={() =>
                  setPage((current) =>
                    Math.min(nativeSearch.data!.totalPages, current + 1)
                  )
                }
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
