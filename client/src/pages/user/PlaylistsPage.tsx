import BackButton from '@/components/common/BackButton';
import PrivatePlaylistSection from '@/components/PrivatePlaylistSection';
import PublicPlaylistSection from '@/components/PublicPlaylistSection';
import useAuth from '@/hooks/useAuth';
import useDocumentTitle from '@/hooks/useDocumentTitle';

function PlaylistPage() {
  useDocumentTitle('Playlists | TuneHub');
  const { isAuthenticated } = useAuth();

  return (
    <div className="container mx-auto space-y-6">
      <BackButton link="/" text="Home" />
      {isAuthenticated && <PrivatePlaylistSection />}
      <PublicPlaylistSection />
    </div>
  );
}

export default PlaylistPage;
